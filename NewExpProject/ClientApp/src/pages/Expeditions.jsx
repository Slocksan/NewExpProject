import React, { useMemo } from 'react';
import { Button } from 'reactstrap';
import DataTable from '../components/DataTable';

function Expeditions() {
    const columns = useMemo(
        () => [
          {
            Header: "Экспедиции",
            columns: [
              {
                Header: "Название",
                accessor: "Expedition.name"
              },
              {
                Header: "Место",
                accessor: "Expedition.place"
              },
              {
                Header: "Дата начала",
                accessor: "Expedition.startDate"
              },
              {
                Header: "Дата конца",
                accessor: "Expedition.endDate"
              },
              {
                Header: "Описание",
                accessor: "Expedition.disciption"
              },
            ]
          }
        ],
        []
      );

    const data = React.useMemo(() => [
        {
          "score": 17.592657,
          "Expedition": {
            "name": "x-exped",
            "url": "http://www.tvmaze.com/shows/44813/the-snow-spider",
            "tame": "The Snow Spider",
            "place": "Tyumen",
            "startDate": Date("05.03.2019"),
            "endDate": Date("05.03.2019"),
            "disciption": "In Development",
            "runtime": 30,
            "premiered": null,
            "officialSite": null,
            "schedule": {
              "time": "",
              "days": [
              ]
            }
        }
        }
      ], [])

    return(
        <div>
            <div class="datagrid"><DataTable columns={columns} data={data}/></div>
            <div class="buttons-container  d-flex justify-content-end">
                <Button id="">Подробнее</Button>
                <Button id="">Создать</Button>
            </div>
        </div>
    )
}

export default Expeditions;