import React, { useMemo, useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from 'reactstrap';
import DataTable from '../components/DataTable';
import Cookies from 'js-cookie';
import ModalWin from '../components/ModalWin';
import ExpeditionsCreateForm from '../components/expedition/ExpeditionsCreateForm';
import ExpeditionEndForm from '../components/expedition/ExpeditionEndForm';
import ExpeditionViewForm from '../components/expedition/ExpeditionViewForm';
import '../styles/ExpeditionModal.css'

export default function Expeditions() {
    const [expeditions, setExpeditions] = useState([]);
    const sitePath = process.env.REACT_APP_MY_API_URL;
    const [selectedExpedition, setSelectedExpedition] = useState();

    const fetchExpeditions = async () => {
        const responce = await axios.get(sitePath + "/api/expeditions", {
            headers: {
                'Authorization': `Bearer ${Cookies.get('Token')}` 
            }
          }).catch(err => console.log(err));

        if (responce) {
            console.log(responce.data);
            setExpeditions(responce.data);
        }
    }

    const columns = useMemo(() => ([
      {
          Header: "ID",
          accessor: "id"
      },
      {
          Header: "Локация",
          accessor: "place.name"
      },
      {
          Header: "Дата начала",
          accessor: "startDate"
      },
      {
          Header: "Дата конца",
          accessor: "endDate"
      },
      {
        Header: "Состояние",
        Cell: ({row}) => {
            console.log(row.original);
            if(row.original.isDone) {
                return(<span>Закончена</span>);
            }
            else {
                return(<span>В процессе</span>)
            }
        }
    },
      {
          Header: '',
          Cell: ({row}) => (
              <div>
                  <Button className='datagrid-buttons' onClick={() => {setSelectedExpedition(row.original); setViewModal(true);}}>Подробнее</Button>
                  <Button className='datagrid-buttons' onClick={() => {setSelectedExpedition(row.original); setEndModal(true);}}>Закончить</Button>
              </div>
          ),
          id: "action"
       }
  ]));

  const addExpedition = async (expedition) => {
      console.log(expedition);

      var newExp = {
            StartDate: expedition.StartDate,
            PlaceID: expedition.PlaceID,
            ISDONE: false
      }

    const responce = await axios.post(sitePath + "/api/expeditions", newExp, {
        headers: {
            'Authorization': `Bearer ${Cookies.get('Token')}` 
        }
      }).catch(err => console.log(err));

      if(responce) {
          for (let i = 0; i < expedition.SelectedEmployees.length; i++) {
              const element = expedition.SelectedEmployees[i];
              
              var newTrip = {
                ExpeditionId: responce.data.id,
                EmployeeId: element.id
              }
            
              console.log(newTrip);
              
              const secondResponce = await axios.post(sitePath + "/api/trip", newTrip, {
                headers: {
                    'Authorization': `Bearer ${Cookies.get('Token')}` 
                }
              }).catch(err => console.log(err));

              const thirdResponce = await axios.put(sitePath + "/api/employees", {...element, isready: false}, {
                headers: {
                    'Authorization': `Bearer ${Cookies.get('Token')}` 
                }
              }).catch(err => console.log(err));
          }
      }

    setCreateModal(false);
    fetchExpeditions();
    };

    const endExpedition = async (expedition) => {
        console.log(expedition);
        const responce = await axios.put(sitePath + "/api/expeditions", {...expedition, isdone: true}, {
            headers: {
                'Authorization': `Bearer ${Cookies.get('Token')}` 
            }
          }).catch(err => console.log(err));
          
        if(responce) {
            const secondResponce = await axios.get(sitePath + "/get-trips-by-expedition-id/" + expedition.id, {
                headers: {
                    'Authorization': `Bearer ${Cookies.get('Token')}` 
                }
              }).catch(err => console.log(err));
        
            if (secondResponce) {
                const fetchedEmployees = secondResponce.data.map(o => o.employee);
                for (let index = 0; index < fetchedEmployees.length; index++) {
                    const element = fetchedEmployees[index];
                    console.log({...element, ISREADY: true});
                    const thirdResponce = await axios.put(sitePath + "/api/employees", {...element, ISREADY: true}, {
                        headers: {
                            'Authorization': `Bearer ${Cookies.get('Token')}` 
                        }
                      }).catch(err => console.log(err));
                }
            }
        }

        setEndModal(false);
        fetchExpeditions();
    };

  const [createModal, setCreateModal] = useState(false);
  const [endModal, setEndModal] = useState(false);
  const [viewModal, setViewModal] = useState(false);

  useEffect(()=> {
    fetchExpeditions();
    }, []);

    return(
        <div>
            <ModalWin visible={createModal} setVisible={setCreateModal}><ExpeditionsCreateForm createExpedition={addExpedition}/></ModalWin>
            {selectedExpedition && <ModalWin visible={endModal} setVisible={setEndModal}><ExpeditionEndForm currentExpedition={selectedExpedition} endExpedition={endExpedition}/></ModalWin>}
            {selectedExpedition && <ModalWin visible={viewModal} setVisible={setViewModal}><ExpeditionViewForm currentExpedition={selectedExpedition}/></ModalWin>}
            <div class="datagrid"><DataTable columns={columns} data={expeditions}/></div>
            <div class="buttons-container  d-flex justify-content-end">
                <Button onClick={() => setCreateModal(true)}>Создать экспедицию</Button>
            </div>
        </div>
    )
}