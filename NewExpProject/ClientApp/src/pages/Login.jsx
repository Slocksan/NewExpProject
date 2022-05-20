import axios from 'axios'
import React, { useState }  from 'react';
import Cookies from 'js-cookie'
import { Input, Button } from 'reactstrap';

const Login = () => {
    const [user, setUser] = useState({Login: '', Password: ''});
    const sitePath = process.env.REACT_APP_URL;

    const tryLogin = async () => {
        console.log(user);
        const responce = await axios.post(sitePath + "/token", user).catch(err => console.log(err));

        if(responce) {
            Cookies.set('Token', responce.data.access_token, {path: '/'});
            Cookies.set('Username', responce.data.username, { path: '/' });
        }
        else {
            alert(responce);
        }
     };

     const unLogin = async () => {
        Cookies.set('Token', '', {path: '/'});
        Cookies.set('Username', '', { path: '/' });
     };

    return (
         <form>
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
            <Button onClick={unLogin}>Разлогиниться</Button>
        </form>
    );
}
export default Login;