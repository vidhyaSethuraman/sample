import React, { useState } from 'react';
import Cookies from 'universal-cookie';
import { useSelector,useDispatch } from 'react-redux';
import {CURRENT_USER_GET } from '../actions/objActions';
import { HashRouter, Route, Link } from "react-router-dom";
const cookies = new Cookies();



function UserAccessHandler(WrappedComponent) {


    const [useraccess,setuseraccess] = useState(false);
    const dispatch = useDispatch();
    var userinfo = useSelector(state => state.currentUser);

    useEffect(() => {
        dispatch({type:CURRENT_USER_GET})
    }, [])

    useEffect(()=>{
        setuseraccess(userinfo.access)
    },[userinfo])

   return function (props) {
        
        var authenticate = cookies.get('jwt',{ path: '/' })
        console.log("authenticate" + authenticate)
        if(authenticate!=undefined)
        {
            console.log("here");
            return <WrappedComponent {...props} />;
        }
        else
        {
            return (
                <div class="container center-align">
                    <br/>
                    <h5 class="amber-text">Please Login to Continue</h5>
                    <Link to="/login" class="btn amber darken-1">Login</Link>
                </div>
            );
           
        }
   }
}

export default UserAccessHandler;