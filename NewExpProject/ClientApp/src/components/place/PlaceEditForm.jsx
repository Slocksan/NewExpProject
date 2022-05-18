import React, {useState} from 'react';
import {Input, Button} from 'reactstrap';
import "../../styles/PlaceModal.css"

export default function PlaceCreateForm({editPlace, oldPlace}) {
    const [place, setPlace] = useState({...oldPlace, name: oldPlace.name.trim(), description: oldPlace.description.trim()});

    const addNewPlace = (e) => {
        e.preventDefault()
        const newPlace = {
            ...place
        }
        editPlace(newPlace)
    }

    return (
        <form>
            <Input
                value={place.name}
                onChange={e => setPlace({...place, name: e.target.value})}
                type="text"
                placeholder="Наименование локации"
            />
            <Input
                value={place.latitude}
                onChange={e => setPlace({...place, latitude: e.target.value})}
                type="text"
                placeholder="Широта"
            />
            <Input
                value={place.longitude}
                onChange={e => setPlace({...place, longitude: e.target.value})}
                type="text"
                placeholder="Долгота"
            />
            <Input
                value={place.description}
                onChange={e => setPlace({...place, description: e.target.value})}
                type="textarea"
                placeholder="Описание"
            />
            <Button onClick={addNewPlace}>Изменить локацию</Button>
        </form>
    );
}