import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {Input, Button} from 'reactstrap';
import "../../styles/EmployeeModal.css";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

export default function EmployeeEditForm({editEmployee, oldEmployee}) {
    const [employee, setEmployee] = useState({...oldEmployee,firstName: oldEmployee.firstName.trim(), lastName: oldEmployee.lastName.trim(), position: {value:oldEmployee.positionID, label: oldEmployee.position.trim()}})
    const [positions, setPositions] = useState();
    const sitePath = "https://localhost:44322";

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

    const editCurrentEmployee = (e) => {
        e.preventDefault()
        const editedEmployee = {
            ID: employee.id,
            FirstName: employee.firstName,
            LastName: employee.lastName,
            PositionID: employee.position.value
        }
        editEmployee(editedEmployee)
    }

    useEffect(()=> {
        fetchPositions();
        console.log(oldEmployee);
        console.log(employee);
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
                value={employee.position}
                onChange={e => setEmployee({...employee, position: e})}
            />
            <Button onClick={editCurrentEmployee}>Изменить работника</Button>
        </form>
    );
}