// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from 'react-redux';

import { heroesFetching, heroesFetched } from '../../actions';
import { useHttp } from "../../hooks/http.hook";

const HeroesAddForm = () => {
    const { register, handleSubmit, control, reset } = useForm();
    const [newItem, setNewItem] = useState({});
    const {request} = useHttp();
    const dispatch = useDispatch();

    const onSubmit = (data) => {
        const newHero = {
            id: uuidv4(),
            name: data.name,
            description: data.text,
            element: data.element.value 
        };

        setNewItem(newHero);

        dispatch(heroesFetching());
        request("http://localhost:3001/heroes", "POST", JSON.stringify(newHero));
        request("http://localhost:3001/heroes")
            .then(data => dispatch(heroesFetched(data)))

        reset();
    };

    return (
        <form className="border p-4 shadow-lg rounded" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input 
                    className="form-control"
                    type="text"
                    placeholder="Как меня зовут?"
                    {...register("name", { required: true })}
                />  
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <textarea 
                    className="form-control"
                    type="text" 
                    placeholder="Что я умею?"
                    style={{"height": '130px'}}
                    {...register("text", { required: true })}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <Controller 
                    label="element"
                    name="element"
                    control={control}
                    defaultValue={null}
                    render={({ field }) => (
                    <Select
                        required
                        {...field}
                        placeholder="Я владею элементом..."
                        options={[
                            { value: "fire", label: "Огонь" },
                            { value: "water", label: "Вода" },
                            { value: "wind", label: "Ветер" },
                            { value: "earth", label: "Земля" },
                        ]}
                    />
                    )}
                />
            </div>
            <button type="submit" className="btn btn-primary">Создать</button>
        </form>
    )
}

export default HeroesAddForm;