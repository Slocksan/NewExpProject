import axios from 'axios'
import React, { useState }  from 'react';
import Cookies from 'js-cookie'
import { Input, Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [user, setUser] = useState({Login: '', Password: ''});
    const sitePath = process.env.REACT_APP_MY_API_URL;
    const navigate = useNavigate();

    const tryLogin = async () => {
        const responce = await axios.post(sitePath + "/token", user).catch(err => console.log(err));

        if(responce.statusText == 'OK') {
            Cookies.set('Token', responce.data.access_token, {path: '/'});
            Cookies.set('Username', responce.data.username, { path: '/' });
        }
        else {
            alert(responce);
        }

        navigate('/expeditions');
        window.location.reload();
     };

    return (
         <form className='login-form'>
            <Input
                value={user.Login}
                onChange={e => setUser({...user, Login: e.target.value})}
                type="text"
                placeholder="Логин"
            />
            <Input
                value={user.Password}
                onChange={e => setUser({...user, Password: e.target.value})}
                type="password"
                placeholder="Пароль"
            />
            <Button onClick={tryLogin}>Войти</Button>
        </form>
    );
}
export default Login;