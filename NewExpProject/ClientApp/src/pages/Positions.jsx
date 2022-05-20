import axios from 'axios';
import React, { useEffect, useMemo, useState, useRef } from 'react';
import { Button } from 'reactstrap';
import DataTable from '../components/DataTable';
import ModalWin from '../components/ModalWin';
import PositionCreateForm from '../components/position/PositionCreateForm';
import PositionEditForm from '../components/position/PositionEditForm';

function Positions() {
    const [positions, setPositions] = useState([]);
    const [editedPosition, setEditedPosition] = useState();
    const sitePath = process.env.REACT_APP_URL;

    const fetchPositions = async () => {
        const responce = await axios.get(sitePath + "/api/positions").catch(err => console.log(err));
    
        if (responce) {
            const positions = responce.data;
    
            console.log("Positions: ", positions);
            setPositions(positions);
        }
    }

    const addPosition = async (position) => {
        const responce = await axios.post(sitePath + "/api/positions", position).catch(err => console.log(err));

        if (responce) {
            const result = responce.data;
    
            console.log(result);
        }

        setCreateModal(false);
        fetchPositions();
    }

    const deletePosition = async (position) => {
        const responce = await axios.delete(sitePath + "/api/positions/" + position.id).catch(err => console.log(err));

        if (responce) {
            const result = responce.data;
    
            console.log(result);
        }
        fetchPositions();
    }

    const updatePosition = async (position) => {
        const responce = await axios.put(sitePath + "/api/positions", position).catch(err => console.log(err));

        console.log(position)

        if (responce) {
            const result = responce.data;
    
            console.log(result);
        }
        setEditModal(false);
        fetchPositions();
    }

    const editRef = useRef();

    const [createModal, setCreateModal] = useState(false);
    const [editModal, setEditModal] = useState(false);

    useEffect(()=> {
        fetchPositions();
    }, []);

    const columns = useMemo(() => ([
        {
            Header: "ID",
            accessor: "id"
        },
        {
            Header: "Name",
            accessor: "name"
        },
        {
            Header: '',
            Cell: ({row}) => (
                <div>
                    <Button className='datagrid-buttons' onClick={() => {setEditedPosition(row.original);
                        setEditModal(true)}}>Edit</Button>
                    <Button className='datagrid-buttons' onClick={() => deletePosition(row.original)}>Delete</Button>
                </div>
            ),
            id: "action"
         }
    ]))

    return(
        <div>
            <ModalWin visible={createModal} setVisible={setCreateModal}><PositionCreateForm createPosition={addPosition}/></ModalWin>
            {editedPosition && <ModalWin visible={editModal} setVisible={setEditModal}><PositionEditForm editPosition={updatePosition} parentPosition={editedPosition}/></ModalWin>}
            <div className="datagrid"><DataTable columns={columns} data={positions}></DataTable></div>
            <div className="buttons-container  d-flex justify-content-end">
                <Button onClick={() => setCreateModal(true)}>Создать</Button>
            </div>
        </div>
    );
}

export default Positions;
