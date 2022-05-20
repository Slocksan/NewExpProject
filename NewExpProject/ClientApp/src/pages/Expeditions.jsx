import React, { useMemo, useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from 'reactstrap';
import DataTable from '../components/DataTable';
import Cookies from 'js-cookie';
import ModalWin from '../components/ModalWin';
import ExpeditionsCreateForm from '../components/expedition/ExpeditionsCreateForm';

export default function Expeditions() {
    const [expeditions, setExpeditions] = useState([]);
    const sitePath = process.env.REACT_APP_MY_API_URL;

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
          accessor: "position.name"
      },
      {
          Header: "Дата начала",
          accessor: "start_date"
      },
      {
          Header: "Дата конца",
          accessor: "end_date"
      },
      {
          Header: '',
          Cell: ({row}) => (
              <div>
                  <Button className='datagrid-buttons' onClick={() => {}}>Подробнее</Button>
                  <Button className='datagrid-buttons' onClick={() => {}}>Закончить</Button>
              </div>
          ),
          id: "action"
       }
  ]));

  const addExpedition = async (expedition) => {
    const responce = await axios.post(sitePath + "/api/expeditions", expedition, {
        headers: {
            'Authorization': `Bearer ${Cookies.get('Token')}` 
        }
      }).catch(err => console.log(err));

    setCreateModal(false);
    fetchExpeditions();
    };

  const [createModal, setCreateModal] = useState(false);

  useEffect(()=> {
    fetchExpeditions();
    }, []);

    return(
        <div>
            <ModalWin visible={createModal} setVisible={setCreateModal}><ExpeditionsCreateForm createExpedition={addExpedition}/></ModalWin>
            <div class="datagrid"><DataTable columns={columns} data={expeditions}/></div>
            <div class="buttons-container  d-flex justify-content-end">
                <Button onClick={() => setCreateModal(true)}>Создать экспедицию</Button>
            </div>
        </div>
    )
}