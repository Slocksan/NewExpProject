import axios from 'axios';
import React, {useState, useEffect, useMemo} from 'react';
import "../../styles/ExpeditionModal.css";
import "react-datepicker/dist/react-datepicker.css";
import DataTableWithoutPagination from '../../components/DataTableWithoutPagination';
import Cookies from 'js-cookie';

export default function ExpeditionViewForm({currentExpedition}) {
    const [expedition, setExpedition] = useState({...currentExpedition, employees: []});
    const sitePath = process.env.REACT_APP_MY_API_URL;

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
            Header: "Должность",
            accessor: "position.name"
        }
    ]));

    const fetchEmployees = async () => {
        const responce = await axios.get(sitePath + "/get-trips-by-expedition-id/" + expedition.id, {
            headers: {
                'Authorization': `Bearer ${Cookies.get('Token')}` 
            }
          }).catch(err => console.log(err));
    
        if (responce) {
            const fetchedEmployees = responce.data.map(o => o.employee);
            const employeesWithPosition = new Array;
            for (let index = 0; index < fetchedEmployees.length; index++) {
                const element = fetchedEmployees[index];
                const secondResponce = await axios.get(sitePath + "/api/positions/" + element.positionID, {
                    headers: {
                        'Authorization': `Bearer ${Cookies.get('Token')}` 
                    }
                  }).catch(err => console.log(err));
                if(secondResponce) {
                    const employee = {...element, position: secondResponce.data}
                    employeesWithPosition.push(employee);
                }
            }
            setExpedition({...expedition, employees: employeesWithPosition});
        }
    }

    useEffect(()=> {
        fetchEmployees();
    }, []);

    return (
        <div className='expeditions-columns-container expedition-form'>
            <div className='columns-container-item'>
                <span>Локация: </span>
                <span>{expedition.place.name}</span>
            </div>
            <div className='columns-container-item'>
                <span>Дата начала: </span>
                <span>{expedition.startDate}</span>
            </div>
            <div className='columns-container-item'>
                <span>Дата конца: </span>
                <span>{expedition.endDate}</span>
            </div>
            <div className='columns-container-item'>
                <span>Добыча (кг): </span>
                <span>{expedition.production}</span>
            </div>
            <div className='columns-container-item expedition-discription'>
                <span>Описание: </span>
                <span>{expedition.description}</span>
            </div>
            <div className='table-responsive datagrid'><DataTableWithoutPagination columns={columns} data={expedition.employees}/></div>
        </div>
    );
}