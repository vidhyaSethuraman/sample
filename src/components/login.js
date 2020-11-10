import React ,{useState} from 'react';
import axios from 'axios';
import '../styles/login.css';
import 'materialize-css/dist/css/materialize.min.css';
import { useHistory } from "react-router-dom";
import {CURRENT_USER } from '../actions/objActions';
import { useSelector,useDispatch } from 'react-redux';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

function Login(){

    const dispatch = useDispatch();
    const [email , SetEmail ] = useState('');
    const [password , SetPassword ] = useState('');
    const [emailError , SetEmailError ] = useState('');
    const [passwordError , SetPasswordError ] = useState('');
    let history = useHistory();

    const LoginHandler =async () => {
       
        var results = await axios.post('https://workflow-app-01.herokuapp.com/login',{
            email,
            password
        })
        .then(function (response) {
            console.log(response);
           let jwt = response.data.jwt;
           let user = response.data.user;
            cookies.set('jwt', jwt );
            cookies.set('user',user.access);
            //window.location.href="/dashboard";
           history.push('/dashboard')
            
        })
        .catch((err) => {
            let error =err.response.data.errors;
            console.log(error);
            let emailE = <div className="error-feild"><span className="red-text">{error.email}</span></div>;
            let passwordE = <div className="error-feild"><span className="red-text">{error.password}</span></div>;
            SetEmailError(emailE);
            SetPasswordError(passwordE);
        });
    }

    return(
        
        <div class="container center-align">

            <div className="login-form-wfa">
                <h4 class="white-text">Login</h4>
                <div className="input-field">
                    <input className="white-text validate" type="email" value={email} onChange={(e)=>SetEmail(e.target.value)} />
                    <label className="amber-text darken-1" for="email">Email</label>
                    <span class="helper-text" data-error="wrong" data-success="right">{emailError}</span>
                </div>
                <div className="input-field">
                    <input className="white-text" type="password" value={password} onChange={(e)=>SetPassword(e.target.value)} />
                    <label className="amber-text darken-1" for="password">Password</label>
                    <span class="helper-text" data-error="wrong" data-success="right">{passwordError}</span>
                </div>
                <br/>
                <button className="btn btn-wfa amber darken-1" onClick={() => LoginHandler()}>Log In</button>
                <br/><br/>
                
            </div>
            
        </div>
        
    )
}
export default Login;