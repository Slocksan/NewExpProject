import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react';
import { Button } from 'reactstrap';
import DataTable from '../components/DataTable';
import ModalWin from '../components/ModalWin';
import Cookies from 'js-cookie';
import EmployeeCreateForm from '../components/employee/EmployeeCreateForm';
import EmployeeEditForm from '../components/employee/EmployeeEditForm';
import PlaceViewForm from '../components/place/PlaceViewForm';

function Employees() {
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState();
    const sitePath = "https://localhost:44322";

    const fetchEmployees = async () => {
        const responce = await axios.get(sitePath + "/api/employees", {
            headers: {
                'Authorization': `Bearer ${Cookies.get('Token')}` 
            }
          }).catch(err => console.log(err));
        

        if (responce) {
            const employeesWithPosition = new Array;
            for (let index = 0; index < responce.data.length; index++) {
                const element = responce.data[index];
                const secondResponce = await axios.get(sitePath + "/api/positions/" + element.positionID, {
                    headers: {
                        'Authorization': `Bearer ${Cookies.get('Token')}` 
                    }
                  }).catch(err => console.log(err));
                if(secondResponce) {
                    const employee = {...element, position: secondResponce.data.name}
                    employeesWithPosition.push(employee);
                }
            }

            setEmployees(employeesWithPosition);
        }
    }

    const addEmployee = async (employee) => {
        const responce = await axios.post(sitePath + "/api/employees", employee, {
            headers: {
                'Authorization': `Bearer ${Cookies.get('Token')}` 
            }
          }).catch(err => console.log(err));

        if (responce) {
            const result = responce.data;
        }
        console.log(responce);

        setCreateModal(false);
        fetchEmployees();
    }

    const deleteEmployee = async (employee) => {
        const responce = await axios.delete(sitePath + "/api/employees" + employee.id, {
            headers: {
                'Authorization': `Bearer ${Cookies.get('Token')}` 
            }
          }).catch(err => console.log(err));

        if (responce) {
            const result = responce.data;
        }

        fetchEmployees();
    }

    const updateEmployee = async (employee) => {
        console.log(employee);
        const responce = await axios.put(sitePath + "/api/employees", employee, {
            headers: {
                'Authorization': `Bearer ${Cookies.get('Token')}` 
            }
          }).catch(err => console.log(err));

        if (responce) {
            const result = responce.data;
        }
        setEditModal(false);
        fetchEmployees();
    }

    const [createModal, setCreateModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [viewModal, setViewModal] = useState(false);

    useEffect(()=> {
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
            accessor: "position"
        },
        {
            Header: '',
            Cell: ({row}) => (
                <div>
                    <Button className='datagrid-buttons' onClick={() => {setSelectedEmployee(row.original);
                        setViewModal(true)}}>View</Button>
                    <Button className='datagrid-buttons' onClick={() => {setSelectedEmployee(row.original);
                        setEditModal(true)}}>Edit</Button>
                    <Button className='datagrid-buttons' onClick={() => deleteEmployee(row.original)}>Delete</Button>
                </div>
            ),
            id: "action"
         }
    ]));
    //{selectedEmployee && <ModalWin visible={editModal} setVisible={setEditModal}><EmployeeEditForm editPlace={updateEmployee} oldPlace={selectedEmployee}/></ModalWin>}
    //        {selectedEmployee && <ModalWin visible={viewModal} setVisible={setViewModal}><EmployeeViewForm oldPlace={selectedEmployee}/></ModalWin>}
    return(
        <div>
            <ModalWin visible={createModal} setVisible={setCreateModal}><EmployeeCreateForm createEmployee={addEmployee}/></ModalWin>
            {selectedEmployee && <ModalWin visible={editModal} setVisible={setEditModal}><EmployeeEditForm editEmployee={updateEmployee} oldEmployee={selectedEmployee}/></ModalWin>}
            
            <div class="datagrid"><DataTable columns={columns} data={employees}/></div>
            <div class="buttons-container  d-flex justify-content-end">
                <Button onClick={() => setCreateModal(true)}>Создать</Button>
            </div>
        </div>
    )
}

export default Employees;