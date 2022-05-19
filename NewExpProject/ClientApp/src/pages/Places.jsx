import axios from 'axios';
import React, { useEffect, useMemo, useState, useRef } from 'react';
import { Button } from 'reactstrap';
import DataTable from '../components/DataTable';
import ModalWin from '../components/ModalWin';
import PlaceCreateForm from '../components/place/PlaceCreateForm';
import PlaceEditForm from '../components/place/PlaceEditForm';
import PlaceViewForm from '../components/place/PlaceViewForm';

function Places() {
    const [places, setPlaces] = useState([]);
    const [selectedPlace, setSelectedPlace] = useState();
    const sitePath = "https://localhost:44322";

    const fetchPlaces = async () => {
        const responce = await axios.get(sitePath + "/api/places").catch(err => console.log(err));
    
        if (responce) {
            const places = responce.data;
            setPlaces(places);
        }
    }

    const addPlace = async (place) => {
        const responce = await axios.post(sitePath + "/api/places", place).catch(err => console.log(err));

        if (responce) {
            const result = responce.data;
        }

        setCreateModal(false);
        fetchPlaces();
    }

    const deletePlace = async (place) => {
        const responce = await axios.delete(sitePath + "/api/places/" + place.id).catch(err => console.log(err));

        if (responce) {
            const result = responce.data;
        }

        fetchPlaces();
    }

    const updatePlace = async (place) => {
        const responce = await axios.put(sitePath + "/api/places", place).catch(err => console.log(err));

        console.log(place)

        if (responce) {
            const result = responce.data;
    
            console.log(result);
        }
        setEditModal(false);
        fetchPlaces();
    }

    const editRef = useRef();

    const [createModal, setCreateModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [viewModal, setViewModal] = useState(false);

    useEffect(()=> {
        fetchPlaces();
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
            Header: "Latitude",
            accessor: "latitude"
        },
        {
            Header: "Longitude",
            accessor: "longitude"
        },
        {
            Header: '',
            Cell: ({row}) => (
                <div>
                    <Button className='datagrid-buttons' onClick={() => {setSelectedPlace(row.original);
                        setViewModal(true)}}>View</Button>
                    <Button className='datagrid-buttons' onClick={() => {setSelectedPlace(row.original);
                        setEditModal(true)}}>Edit</Button>
                    <Button className='datagrid-buttons' onClick={() => deletePlace(row.original)}>Delete</Button>
                </div>
            ),
            id: "action"
         }
    ]))
    
    return(
        <div>
            <ModalWin visible={createModal} setVisible={setCreateModal}><PlaceCreateForm createPlace={addPlace}/></ModalWin>
            {selectedPlace && <ModalWin visible={editModal} setVisible={setEditModal}><PlaceEditForm editPlace={updatePlace} oldPlace={selectedPlace}/></ModalWin>}
            {selectedPlace && <ModalWin visible={viewModal} setVisible={setViewModal}><PlaceViewForm oldPlace={selectedPlace}/></ModalWin>}
            <div class="datagrid"><DataTable columns={columns} data={places}></DataTable></div>
            <div class="buttons-container  d-flex justify-content-end">
                <Button onClick={() => setCreateModal(true)}>Создать</Button>
            </div>
        </div>
    )
}

export default Places;