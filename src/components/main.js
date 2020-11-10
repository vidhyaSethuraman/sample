import React, { useContext } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import logo from '../images/logo.jpeg';
import banner1 from '../images/banner1.jpeg';
//import { useDispatch } from 'react-redux';
import { HashRouter, Route, Link } from "react-router-dom";

import {BgThemeContext} from '../context/bgtheme'


function Main() {

    /*const dispatch = useDispatch();

    useEffect(()=>{
        dispatch({type:'REFRESH'});
        dispatch({type:'REFRESH_DEPT'})
        dispatch({type:'REFRESH_EMP'})
    },[])*/
    var color="orange";
    const {appcolor,changeAppTheme} = useContext(BgThemeContext);
   color= appcolor;

  return (
    <>
    <nav className="nav wrapper black">
        <div className="container">
            <a href="#" class="brand-logo "><i class="material-icons dashboard-logo amber-text darken-1" style={{marginBottom:"-4px"}}>polymer</i>&nbsp;Work Hive</a>
            <ul id="nav-mobile" class="right hide-on-med-and-down">
                <li><a >OverView</a></li>
                <li><a >Pricing</a></li>
                <li><a >Features</a></li>
                <li><a >Customer</a></li>
                <li><Link to="/login" class="btn amber darken-1">Login</Link></li> 
            </ul>
           <Link to='/login'><a class="sidenav-trigger hide-on-large-only right"><i class="material-icons amber-text darken-1" >account_circle</i></a></Link> 
        </div>
    </nav>
    <br/>
    <br/>
    <div class="container">
        <div class="row">
          
            <div class="col l5">
                <br/><br/>
                <h3>Work Hive</h3>
                <h6 class="flow-text">Work Hive is a business workflow software that helps innovative companies to reduce chaos by using our cloud workflow software. </h6>
                <h6 class="flow-text">If you are looking to create workflow app to automate your business process, look no further than Work Hive.</h6>
                <br/>
                <a class="btn amber darken-1">Get Started</a>
                <br/>
                <br/>
                <img class="hide-on-large-only center-align" src={banner1} height="300rem" width="400rem"  />
            </div>
            <div class="col l6">
                <img class="hide-on-med-and-down" src={banner1} />
            </div>
        </div>
    </div>

    </>
  );
}

export default React.memo(Main);