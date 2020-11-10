import React, { useState ,useEffect} from 'react';
import Cookies from 'universal-cookie';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import { Redirect } from 'react-router';
import { HashRouter, Route, Link } from "react-router-dom";
const cookies = new Cookies();





function UserAccessHandler(WrappedComponent,x) {
    
   return function (props) {
        
        var authenticate = cookies.get('jwt',{ path: '/' })
        //console.log("authenticate" + authenticate);
        var user = cookies.get('user',{ path: '/' })
        
            if(authenticate!=undefined)
            {
                
                if(user=="true")
                {
                    console.log("every allow")
                    return <WrappedComponent {...props} />
                }
                else 
                {
                    if(props.user)
                    {
                        console.log("xuser redirecttt")
                        return <Redirect to='/' />
                    }
                    else
                    {
                        console.log("xuser display")
                        return <WrappedComponent {...props} />
                    }
                }
            }
            else
            {
                if(x.check)
                {
                    return (
                        <div class="container center-align">
                            <br/>
                            <h5 class="amber-text">Please Login to Continue</h5>
                            <Link to="/login" class="btn amber darken-1">Login</Link>
                        </div>
                    );
                }
                else{
                    return null;
                }   
            }
        
    
   }
}

export default UserAccessHandler;