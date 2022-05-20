import axios from 'axios';
import React, {useState, useEffect, useMemo} from 'react';
import {Button} from 'reactstrap';
import Dropdown from 'react-dropdown';
import Cookies from 'js-cookie';
import 'react-dropdown/style.css';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import SelectableDataTable from '../SelectableDataTable';
import "../../styles/ExpeditionModal.css";

export default function ExpeditionsCreateForm({createExpedition}) {
    const [expedition, setExpedition] = useState({startDate: new Date(), place: {value: 0, label: ''}})
    const [places, setPlaces] = useState();
    const sitePath = process.env.REACT_APP_URL;
    const [employees, setEmployees] = useState([]);

    const fetchPlaces = async () => {
        const responce = await axios.get(sitePath + "/api/places", {
            headers: {
                'Authorization': `Bearer ${Cookies.get('Token')}` 
            }
          }).catch(err => console.log(err));
    
        if (responce) {
            const places = responce.data.map(function(row) { return {value: row.id, label: row.name}});
            setPlaces(places);
            if(places.length > 0) {
                setExpedition({...expedition, place: places[0]});
            } 
        }
    }

    const fetchEmployees = async () => {
        const responce = await axios.get(sitePath + "/api/employees", {
            headers: {
                'Authorization': `Bearer ${Cookies.get('Token')}` 
            }
          }).catch(err => console.log(err));
    
        if (responce) {
            const employees = responce.data;
            setEmployees(employees);
        }
    }

    const addNewExpedition = (e) => {
        e.preventDefault()
        const newExpedition = {
            StartDate: expedition.startDate,
            PlaceID: expedition.place.value,
        }
        createExpedition(newExpedition);
    }

    useEffect(()=> {
        fetchPlaces();
        fetchEmployees();
    }, []);

    const columns = useMemo(() => ([
        {
            Header: "ID",
            accessor: "id"
        },
        {
            Header: "FirstName",
            accessor: "firstName"
        },
        {
            Header: "LastName",
            accessor: "lastName"
        },
        {
            Header: "Position",
            accessor: "position.name"
        }
    ]));

    return (
        <form className='expedition-form'>
            <Dropdown 
                options={places} 
                value = {expedition.place}
                onChange={e => setExpedition({...expedition, place: e})}
            />
            <DatePicker
                selected={expedition.startDate}
                onChange={(date) => setExpedition({...expedition, startDate: date})}
            />
            <div className='table-responsive'><SelectableDataTable columns={columns} data={employees}/></div> 
            <Button onClick={addNewExpedition}>Создать экспедицию</Button>
        </form>
    );
}