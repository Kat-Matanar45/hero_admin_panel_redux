
// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

import { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Spinner from '../spinner/Spinner';

import { fetchFilters, filterFetched } from '../../reducers/filtersSlice';

const HeroesFilters = () => {
    const {filters, filtersLoadingStatus} = useSelector(state => state.filters);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchFilters())
    }, [])

    if (filtersLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (filtersLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const onActiveFilter = (filter) => {
        dispatch(filterFetched(filter))
    }

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    <ViewBTN 
                        filters={filters} 
                        onActiveFilter={(filter) => onActiveFilter(filter)} 
                    />
                </div>
            </div>
        </div>
    )
}

const ViewBTN = ({filters, onActiveFilter}) => {
    const {activFilter} = useSelector(state => state);

    const elements = filters.map(item => {
        let btnClassName;

        switch (item.filter) {
            case 'all':
                btnClassName = `btn btn-outline-dark`;
                break;
            case 'fire':
                btnClassName = `btn btn-danger`;
                break;
            case 'water':
                btnClassName = `btn btn-primary`;
                break;
            case 'wind':
                btnClassName = `btn btn-success`;
                break;
            case 'earth':
                btnClassName = `btn btn-secondary`;
                break;
            default:
                btnClassName = `btn btn-outline-dark`;
                break;
        }

        const active = item.filter === activFilter ? 'active' : '';

        return (
            <Fragment key={item.filter}>
                <button 
                    className={`${btnClassName} ${active}`}
                    onClick={() => onActiveFilter(item.filter)}
                    >
                        {item.label}
                </button>
            </Fragment>
        )
    })

    return elements
}

// const ViewBTN = () => {
//     return (
//         <div className="card shadow-lg mt-4">
//             <div className="card-body">
//                 <p className="card-text">Отфильтруйте героев по элементам</p>
//                 <div className="btn-group">
//                     <button className="btn btn-outline-dark active">Все</button>
//                     <button className="btn btn-danger">Огонь</button>
//                     <button className="btn btn-primary">Вода</button>
//                     <button className="btn btn-success">Ветер</button>
//                     <button className="btn btn-secondary">Земля</button>
//                 </div>
//             </div>
//         </div>
//     )
// }

export default HeroesFilters;