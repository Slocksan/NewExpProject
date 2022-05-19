import React, {useState} from 'react';
import {Input, Button} from 'reactstrap';
import "../../styles/PlaceModal.css"

export default function PlaceCreateForm({createPlace}) {
    const [place, setPlace] = useState({Name: '', Latitude: '', Longitude: '', Description: ''})


    const addNewPlace = (e) => {
        e.preventDefault()
        const newPlace = {
            ...place
        }
        createPlace(newPlace)
        setPlace({Name: ''})
    }

    return (
        <form className='place-form'>
            <Input
                value={place.Name}
                onChange={e => setPlace({...place, Name: e.target.value})}
                type="text"
                placeholder="Наименование локации"
            />
            <Input
                value={place.Latitude}
                onChange={e => setPlace({...place, Latitude: e.target.value})}
                type="text"
                placeholder="Широта"
            />
            <Input
                value={place.Longitude}
                onChange={e => setPlace({...place, Longitude: e.target.value})}
                type="text"
                placeholder="Долгота"
            />
            <Input
                value={place.Description}
                onChange={e => setPlace({...place, Description: e.target.value})}
                type="textarea"
                placeholder="Описание"
            />
            <Button onClick={addNewPlace}>Добавить локацию</Button>
        </form>
    );
}