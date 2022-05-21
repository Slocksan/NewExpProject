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
    const sitePath = process.env.REACT_APP_MY_API_URL;
    const [employees, setEmployees] = useState([]);
    const [selectedEmployees, setSelectedEmployees] = useState([]);

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
        const responce = await axios.get(sitePath + "/api/get-all-free-employees", {
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
            SelectedEmployees: selectedEmployees
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
            <div className="expedition-rows">
                <div className="expedition-column">
                    <span>Локация</span>
                    <span>Дата начала</span>
                </div>
                <div className="expedition-column">
                    <Dropdown 
                            options={places} 
                            value = {expedition.place}
                            onChange={e => setExpedition({...expedition, place: e})}
                        />
                    <DatePicker
                        className='expedition-datepicker'
                        selected={expedition.startDate}
                        onChange={(date) => setExpedition({...expedition, startDate: date})}
                    />
                </div>
            </div>      
            <span className='empl-des'>Сотрудники:</span>    
            <div className='table-responsive expedition-table'><SelectableDataTable columns={columns} data={employees} setSelectedValuesIds={setSelectedEmployees}/></div> 
            <Button onClick={addNewExpedition}>Создать экспедицию</Button>
        </form>
    );
}