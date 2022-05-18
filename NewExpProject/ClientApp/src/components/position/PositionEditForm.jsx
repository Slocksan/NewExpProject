import React, {useState} from 'react';
import {Input, Button} from 'reactstrap';
import "../../styles/PositionsModal.css"

export default function PositionEditForm({editPosition, parentPosition}) {
    console.log(parentPosition);
    const [position, setPosition] = useState(parentPosition.name.trim());
    console.log(position);

    const editExistingPosition = (e) => {
        e.preventDefault()
        const newPosition = {
            ...parentPosition,
            name:position
        }
        editPosition(newPosition)
    }

    return (
        <form>
            <Input
                value={position}
                onChange={e => setPosition(e.target.value)}
                type="text"
                placeholder="Название должности"
            />
            <Button onClick={editExistingPosition}>Изменить должность</Button>
        </form>
    );
}