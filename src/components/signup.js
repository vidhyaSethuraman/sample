import React ,{useState} from 'react';
import axios from 'axios';
import '../styles/login.css';
import 'materialize-css/dist/css/materialize.min.css';
import { useHistory } from "react-router-dom";

function SignUp(){

    const [email , SetEmail ] = useState('');
    const [password , SetPassword ] = useState('');
    const [emailError , SetEmailError ] = useState('');
    const [passwordError , SetPasswordError ] = useState('');
    let history = useHistory();

    const SignupHandler = async () => {
        
        var results = await axios.post('https://workflow-app-01.herokuapp.com/signup',{
            email,
            password
        })
        .then(function (response) {
            console.log("successssss");
            console.log(response);
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
                <h4 class="white-text">Signup</h4>
                <div className="input-field">
                    <input className="white-text" type="email" value={email} onChange={(e)=>SetEmail(e.target.value)} />
                    <label className="amber-text darken-1" for="email">Email</label>
                    {emailError}
                </div>
                
                <div className="input-field">
                    <input className="white-text" type="password" value={password} onChange={(e)=>SetPassword(e.target.value)} />
                    <label className="amber-text darken-1" for="password">Password</label>
                    {passwordError}
                </div>
                
                <br/>
                
                <button className="btn btn-wfa amber darken-1" onClick={() => SignupHandler()}>Sign Up</button>
                <br/><br/>
                <p className="white-text login-ask">Aldready Have an Account? <a className="amber-text darken-1"  onClick={()=> {history.push="/login"}}>Log In</a> </p>
            </div>
            
        </div>
        
    )
}
export default SignUp;
