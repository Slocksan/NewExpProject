import React, {useState} from 'react';
import "../../styles/PlaceModal.css"

export default function PlaceViewForm({oldPlace}) {
    const [place, setPlace] = useState({...oldPlace, name: oldPlace.name.trim(), description: oldPlace.description.trim()});

    return (
        <div className='places-columns-container'>
            <div className='columns-container-item'>
                <span>Наименование: </span>
                <span>{place.name}</span>
            </div>
            <div className='columns-container-item'>
                <span>Широта: </span>
                <span>{place.latitude}</span>
            </div>
            <div className='columns-container-item'>
                <span>Долгота: </span>
                <span>{place.longitude}</span>
            </div>
            <div className='columns-container-item place-discription'>
                <span>Описание: </span>
                <span>{place.description}</span>
            </div>
        </div>
    );
}