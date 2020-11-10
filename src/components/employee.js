
import React, { useState,useEffect } from 'react';
import axios from 'axios';
import M from 'materialize-css';
import { useSelector,useDispatch } from 'react-redux';
import {REFRESH_EMP } from '../actions/objActions';
import EmpObjCard from './empObjCard';
import UserAccessHandler from '../HOC/UserAccess';



function Employee() 
{

    const[employeeName,setEmployeeName] = useState(null);
    const[employeeDetails,setEmployeeDetails]= useState(null);
    const[employeeObj,setEmployeeObj]=useState([]);
    const[currentUser,setCurrentUser]=useState(null);
   

    const dispatch = useDispatch();
    var current_user = useSelector(state => state.currentUser);
    var employeelist = useSelector(state => state.employeeDetails);

   
    

    useEffect(()=>{
        M.AutoInit();
        dispatch({type:REFRESH_EMP})
    },[])

    useEffect(()=>{
        setCurrentUser(current_user);
        //console.log("current user is " + current_user);
    },[current_user])

    useEffect(()=>{
        //console.log("current user is " + current_user);
        //console.log(employeelist);
        var userinfo=null;
        if(current_user!=null)
        {
            for(let i=0;i<employeelist.length;i++)
            {
                let user= employeelist[i];
                if(user._id==current_user)
                {
                    userinfo= user;
                    break;
                }
            }
            //console.log(userinfo);
            if(userinfo!=null)
            {
                setEmployeeName(userinfo.name);
                setEmployeeDetails(userinfo);
            }
            
        }
    },[employeelist,current_user])

    useEffect(()=>{
        console.log("employee details:");
        var ejsx=[];
        if(employeeDetails!=null)
        {
            var objectives= employeeDetails.objectives;
            console.log(objectives);
            for(let i=0;i<objectives.length;i++)
            {
                var empkrlist=[];
                if(objectives[i].kr.length!=0)
                {

                    var krlist = objectives[i].kr;
                    for(let j=0;j<krlist.length;j++)
                    {
                        let z= <li>KR - {krlist[j]}</li>
                        empkrlist.push(z);
                    }
                }
                if(objectives[i].description!="" && objectives[i].description!=null)
                {
                    let x = <EmpObjCard title={objectives[i].description} emp={employeeDetails._id} objid={objectives[i].dept_obj_id} empkrlist = {empkrlist}/>
                    ejsx.push(x);
                }
                
            }
        }
       setEmployeeObj(ejsx);
    },[employeeDetails])

    
   
    
    return (
        <div class="container-info">
            <br/>
            <h5>Employee Objectives - {employeeName}</h5>
            <br/>
            {employeeObj}
        </div>
    )
}

export default UserAccessHandler(Employee);
