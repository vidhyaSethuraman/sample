import React, { useState,useEffect } from 'react';
import M from 'materialize-css';
import '../styles/company.css';
import DeptTab from '../components/deptTab';
import { useHistory } from "react-router-dom";
import { Route} from 'react-router-dom';
import UserAccessHandler from '../HOC/UserAccess';
import { useSelector,useDispatch } from 'react-redux';

function Department({match}) {
    let history = useHistory();
    const [deptTab,setdeptTab]= useState(null);
    const[deptlist,setdeptlist]=useState([]);
    const[dept,setdept]=useState(null);
    const[deptid,setdeptid]=useState(null);
    const deptarmentList =['', 'HR'  ,'Developement','QA','Networks'];

    var dept_info_store = useSelector(state => state.departmentInfo);

    useEffect(()=>{
    M.AutoInit();  
    },[])

    useEffect(()=>{
        var dept_store= dept_info_store;
        var list=[]
        for(let i=0;i<dept_store.length;i++)
        {
            let options= <option value={dept_store[i].id} >{dept_store[i].name}</option>; 
            list.push(options)
        }
        setdeptlist(list);
    },[dept_info_store])

    useEffect(()=>{
        if(deptid!=null)
        {
            let dept_id_integer = parseInt(deptid);
            setdept(<span>- {deptarmentList[dept_id_integer]}</span>);
            history.push('/dashboard/department/' + deptid);
        }

      
    },[deptid])

    return (
        <>
        <div class="container-info">
            <div class="row">
                <div class="col l9 s6 m8"><h4 class="flow-text">  Department Objectives <span class="hide-on-med-and-down">{dept}</span> </h4></div>
                <div class="col l3 s6 m4">
                    <div class="input-field col s12">
                        <select onChange={(e)=>{setdeptid(e.target.value)}} >
                            <option value="" disabled selected>Department</option>
                            <option value="1" >HR</option>
                            <option value="2" >Development</option>
                            <option value="3" >QA</option>
                            <option value="4" >Networks</option>
                        </select>
                    </div>
                </div>
            </div>
           
            <Route path={`${match.path}/:deptid`} component={DeptTab}></Route>
               
            
            </div>

        </>
    );

}

export default UserAccessHandler(Department);

{/*
<option value="1" >HR</option>
                            <option value="2" >Development</option>
                            <option value="3" >QA</option>
                            <option value="4" >Networks</option>
*/}