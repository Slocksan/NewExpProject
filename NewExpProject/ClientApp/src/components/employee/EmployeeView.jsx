import React, {useState} from 'react';
import "../../styles/PlaceModal.css"

export default function EmployeeView({selectedEmployee}) {
    const [employee, setEmployee] = useState({firstName: selectedEmployee.firstName.trim(), lastName: selectedEmployee.lastName.trim(), positionName: selectedEmployee.position});

    return (
        <div className='columns-container'>
            <div className='columns-container-item'>
                <span>Имя: </span>
                <span>{employee.firstName}</span>
            </div>
            <div className='columns-container-item'>
                <span>Фамилия: </span>
                <span>{employee.lastName}</span>
            </div>
            <div className='columns-container-item'>
                <span>Должность: </span>
                <span>{employee.positionName}</span>
            </div>
        </div>
    );
}