import React from 'react';
import { Button } from 'reactstrap';

function Reports() {
    return(
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
    );
}

export default Reports;