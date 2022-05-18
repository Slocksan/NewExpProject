import React from 'react';
import { Button } from 'reactstrap';
import { useNavigate } from "react-router-dom"

function Directories() {
    const navigate = useNavigate();

    return(
        <div>
            <div className='d-flex justify-content-around buttons-container'>
                <Button onClick={() => navigate('/directories/places')} id="">Локации</Button>
                <Button onClick={() => navigate('/directories/positions')} id="">Должности</Button>
            </div>
        </div>
    );
}

export default Directories;