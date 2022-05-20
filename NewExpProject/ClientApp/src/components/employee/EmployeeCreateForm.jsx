import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {Input, Button} from 'reactstrap';
import "../../styles/EmployeeModal.css";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

export default function EmployeeCreateForm({createEmployee}) {
    const [employee, setEmployee] = useState({firstName: '', lastName: '', position: {value:10, label: "Рудокоп"}})
    const [positions, setPositions] = useState();
    const sitePath = process.env.REACT_APP_URL;

    const fetchPositions = async () => {
        const responce = await axios.get(sitePath + "/api/positions").catch(err => console.log(err));
    
        if (responce) {
            const positions = responce.data.map(function(row) { return {value: row.id, label: row.name}});
            setPositions(positions);
            if(positions.length > 0) {
                setEmployee({...employee, position: {value: positions[0].id, label: positions[0].name }});
            } 
        }
    }

    const addNewEmployee = (e) => {
        e.preventDefault()
        const newEmployee = {
            FirstName: employee.firstName,
            LastName: employee.lastName,
            PositionID: employee.position.value
        }
        createEmployee(newEmployee)
        setEmployee({Name: ''})
    }

    useEffect(()=> {
        fetchPositions();
    }, []);

    return (
        <form>
            <Input
                value={employee.firstName}
                onChange={e => setEmployee({...employee, firstName: e.target.value})}
                type="text"
                placeholder="Имя"
            />
            <Input
                value={employee.lastName}
                onChange={e => setEmployee({...employee, lastName: e.target.value})}
                type="text"
                placeholder="Фамилия"
            />
            <Dropdown 
                options={positions} 
                value = {employee.position}
                onChange={e => setEmployee({...employee, position: e})}
            />
            <Button onClick={addNewEmployee}>Добавить работника</Button>
        </form>
    );
}