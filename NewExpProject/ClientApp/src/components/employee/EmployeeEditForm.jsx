import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {Input, Button} from 'reactstrap';
import "../../styles/EmployeeModal.css";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

export default function EmployeeEditForm({editEmployee, oldEmployee}) {
    const [employee, setEmployee] = useState({...oldEmployee,firstName: oldEmployee.firstName.trim(), lastName: oldEmployee.lastName.trim()})
    const [positions, setPositions] = useState();
    const [currentPosition, setCurrentPosition] = useState({value:oldEmployee.positionID, label: oldEmployee.position.trim()});
    const sitePath = process.env.REACT_APP_URL;

    const fetchPositions = async () => {
        const responce = await axios.get(sitePath + "/api/positions").catch(err => console.log(err));
    
        if (responce) {
            const positions = responce.data.map(function(row) { return {value: row.id, label: row.name}});
            setPositions(positions);
        }
    }

    const editCurrentEmployee = (e) => {
        e.preventDefault()
        const editedEmployee = {
            ID: employee.id,
            FirstName: employee.firstName,
            LastName: employee.lastName,
            PositionID: currentPosition.value
        }
        editEmployee(editedEmployee)
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
                value={currentPosition}
                onChange={e => setCurrentPosition(e)}
            />
            <Button onClick={editCurrentEmployee}>Изменить работника</Button>
        </form>
    );
}