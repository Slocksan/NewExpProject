import axios from 'axios';
import React, {useState} from 'react';
import {Button, Input} from 'reactstrap';
import "../../styles/ExpeditionModal.css";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default function ExpeditionEndForm({endExpedition, currentExpedition}) {
    const [expedition, setExpedition] = useState({...currentExpedition, endDate: new Date()});

    const endEditedExpedition = (e) => {
        e.preventDefault()
        const expeditionToEnd = {
            ...expedition
        }
        endExpedition(expeditionToEnd);
    }

    return (
        <form className='expedition-form'>
            <div className="expedition-rows">
                <div className="expedition-column">
                    <span>Дата конца</span>
                    <span>Добыча(кг)</span>
                </div>   
                <div className="expedition-column">
                    <DatePicker
                        selected={expedition.endDate}
                        onChange={(date) => setExpedition({...expedition, endDate: date})}
                    />
                    <Input
                    value={expedition.production}
                    onChange={e => setExpedition({...expedition, production: e.target.value})}
                    type="text"
                />
                </div>
            </div>
            <span>Описание</span>
            <Input
                value={expedition.Description}
                onChange={e => setExpedition({...expedition, Description: e.target.value})}
                type="textarea"
            />
            <Button onClick={endEditedExpedition}>Закончить экспедицию</Button>
        </form>
    );
}