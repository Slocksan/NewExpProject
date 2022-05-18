import React, {useState} from 'react';
import {Input, Button} from 'reactstrap';
import "../../styles/PositionsModal.css"

export default function PositionCreateForm({createPosition}) {
    const [position, setPosition] = useState({Name: ''})


    const addNewPosition = (e) => {
        e.preventDefault()
        const newPosition = {
            ...position
        }
        createPosition(newPosition)
        setPosition({Name: ''})
    }

    return (
        <form>
            <Input
                value={position.Name}
                onChange={e => setPosition({...position, Name: e.target.value})}
                type="text"
                placeholder="Название должности"
            />
            <Button onClick={addNewPosition}>Добавить должность</Button>
        </form>
    );
}
