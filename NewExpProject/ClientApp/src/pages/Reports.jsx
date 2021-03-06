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
    const [positionsCountLabels, setPositionsCountLabels] = useState();
    const [positionsCountValues, setPositionsCountValues] = useState();

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


            const labelsArray = new Array();
            const valuesArray = new Array();
            for (let index = 0; index < positionsWithCounts.length; index++) {
                const element = positionsWithCounts[index];
                
                const responce = await axios.get(sitePath + "/api/positions/"+element.posID, {
                    headers: {
                        'Authorization': `Bearer ${Cookies.get('Token')}` 
                    }
                  }).catch(err => console.log(err));

                  console.log(responce.data.name.trim());
                labelsArray.push([responce.data.name.trim()]);
                valuesArray.push([element.posCount]);
            }
            setPositionsCountLabels(labelsArray);
            setPositionsCountValues(valuesArray);


            setPositionsCountModal(true);
        }
    };

    const [positionsCountModal, setPositionsCountModal] = useState(false);

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
        labels: positionsCountLabels,
        datasets: [          {
            label: '# ?????????????? ???? ????????????????????',
            data: positionsCountValues,
            backgrondColor: 'rgba(53, 162, 235, 0.5)',
          },        ],
      };

    return(
        <div>
            {positionsCountLabels && positionsCountValues && <ModalWin className="chart" visible={positionsCountModal} setVisible={setPositionsCountModal}><Bar options={options} data={data}></Bar></ModalWin>}
            <div className="main-container">
                <div className='reports-container'>
                    <div className="buttons-container d-flex justify-content-around">
                        <Button id="">????????????</Button>
                        <Button id="">??????????????</Button>
                    </div>
                    <div className="buttons-container d-flex justify-content-around">
                        <Button id="">????????????????????</Button>
                        <Button id="">??????????????</Button>
                    </div>
                </div>
                <div className='exports-container'>
                    <div className="buttons-container d-flex justify-content-around">
                        <Button onClick={handleOnExportLocations}>?????????????? ??????????????</Button>
                    </div>
                </div>
                <div className='charts-container'>
                    <div className="buttons-container d-flex justify-content-around">
                        <Button onClick={fetchPositionsCount}>???????????????????? ?????????? ???? ????????????????????</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Reports;