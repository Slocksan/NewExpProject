import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { Button } from 'reactstrap';
import * as XLSX from 'xlsx';
import Cookies from 'js-cookie';
import { Bar, Chart } from 'react-chartjs-2';
import ModalWin from '../components/ModalWin';
import linq from 'linq';
import Enumerable from 'linq'; 
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

const Reports = () => {
    const sitePath = process.env.REACT_APP_MY_API_URL;
    const [positionsCountLabels, setPositionsCountLabels] = useState([]);
    const [positionsCountValues, setPositionsCountValues] = useState([]);

    const handleOnExportLocations = async () => {
        const responce = await axios.get(sitePath + "/api/places").catch(err => console.log(err));

        if(responce)    
        {
            const wb = XLSX.utils.book_new();
            console.log(responce.data);
            const ws = XLSX.utils.json_to_sheet(responce.data);
            
            XLSX.utils.book_append_sheet(wb, ws, "Locations");

            XLSX.writeFile(wb, "Locations.xlsx");
        }  
    };

    const fetchPositionsCount = async () => {
        const responce = await axios.get(sitePath + "/api/employees", {
            headers: {
                'Authorization': `Bearer ${Cookies.get('Token')}` 
            }
          }).catch(err => console.log(err));

          if(responce) {
            const sourceCollection = responce.data;
            const positionsWithCounts = Enumerable.from(sourceCollection).groupBy(e => e.positionID).select(function(e) { return {"posID": e.key(), "posCount": e.count()}}).toArray();
            console.log(positionsWithCounts);

            setPositionsCountValues([]);
            setPositionsCountLabels([]);
            for (let index = 0; index < positionsWithCounts.length; index++) {
                const element = positionsWithCounts[index];
                
                const responce = await axios.get(sitePath + "/api/positions/"+element.posID, {
                    headers: {
                        'Authorization': `Bearer ${Cookies.get('Token')}` 
                    }
                  }).catch(err => console.log(err));

                setPositionsCountLabels([...positionsCountLabels, responce.data.name.trim()]);
                setPositionsCountValues([...positionsCountValues, element.posCount]);
            }
            console.log(positionsCountLabels);
            console.log(positionsCountValues);
            setPositionsCountModal(true);
        }
    };

    const [positionsCountModal, setPositionsCountModal] = useState(false);

    useEffect(()=> {
        fetchPositionsCount();
    }, []);

    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top' ,
          },
          title: {
            display: true,
            text: 'Chart.js Bar Chart',
          },
        },
      };
      
    
    const data = {
        positionsCountLabels,
        datasets: [          {
            label: '# рабочих на должностях',
            data: positionsCountValues,
            backgrondColor: 'rgba(53, 162, 235, 0.5)',
          },        ],
      };
    return(
        <div>
            <ModalWin className="chart" visible={positionsCountModal} setVisible={setPositionsCountModal}><Bar options={options} data={data}></Bar></ModalWin>
            <div className="main-container">
                <div className='reports-container'>
                    <div className="buttons-container d-flex justify-content-around">
                        <Button id="">Добыча</Button>
                        <Button id="">Локации</Button>
                    </div>
                    <div className="buttons-container d-flex justify-content-around">
                        <Button id="">Сотрудники</Button>
                        <Button id="">Затраты</Button>
                    </div>
                </div>
                <div className='exports-container'>
                    <div className="buttons-container d-flex justify-content-around">
                        <Button onClick={handleOnExportLocations}>Экспорт локаций</Button>
                    </div>
                </div>
                <div className='charts-container'>
                    <div className="buttons-container d-flex justify-content-around">
                        <Button onClick={fetchPositionsCount}>Количество людей на должностях</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Reports;