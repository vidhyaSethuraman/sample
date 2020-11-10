import React, { useState,useEffect ,useContext} from 'react';
import M from 'materialize-css';
import axios from 'axios';
import { useSelector,useDispatch } from 'react-redux';
import {REFRESH_EMP} from '../actions/objActions';
import {BgThemeContext} from '../context/bgtheme';




function EmployeeInfo({emp, dept_id_integer,refresh,handler,toggleEmpState}) {

    const[dept_id,setdept]=useState(dept_id_integer);
    const[name,setname]=useState("hello");
    const[designation,setdesignation]=useState(emp.designation);
    const[band,setband]=useState(emp.band);
    const[employee_code,setcode]=useState(emp.employee_code);
    const [empstate,setempstate]= useState(emp.user_status);
    var color;


   /* const {lightcolor,light,darkcolor} = useContext(BgThemeContext)
    color = light==true? lightcolor : darkcolor;*/

    const {appcolor,changeAppTheme} = useContext(BgThemeContext);
   color= appcolor;
    

   /* var dept_id = dept_id_integer;
    var name= emp.name;
    var designation= emp.designation;
    var band= emp.band;
    var employee_code= emp.employee_code;
    console.log(dept_id,name,designation,band,employee_code);*/

    const deptarmentList =['', 'HR'  ,'Developement','QA','Networks'];

    useEffect(()=>{
        M.AutoInit();
       
    })

    

  /*  const handlEditBtn = async() =>{
        console.log("handle edit button")
        console.log(dept_id,name,designation,band,employee_code);

        
     var results = await axios.post('http://localhost:8000/objectives/employee/edit',{
            dept_id,name,designation,band,employee_code,id:emp._id
      })
      .then(function (response) {
          refresh();
      })
      .catch((err) => {
          //let error =err.response.data.errors;
          console.log(err);
      });

    } */

   /* const handler = (empd) =>{
        console.log("handlerrrrrrrrr");
        console.log(emp.name);
         /*dept_id = dept_id_integer;
         name= emp.name;
         designation= emp.designation;
         band= emp.band;
         employee_code= emp.employee_code;
         //setname(emp.name);
    } */

    return (
        <>
            <div className="card" onClick ={()=>{handler(emp,dept_id_integer)}}>
                <div class="card-content">
                    <div class="row">
                        <div class="col l1 m1 s1" style={{fontSize:"0.9rem"}}>{emp.employee_code}</div>
                        <div class="col l2 m2 s2" style={{fontSize:"0.9rem"}}>{emp.name}</div>
                        <div class="col l2 m2 s3" style={{fontSize:"0.9rem"}}>{deptarmentList[dept_id_integer]}</div>
                        <div class="col l2 m2 s2" style={{fontSize:"0.9rem"}}>{emp.designation}</div>
                        <div class="col l2 m2 s3" style={{fontSize:"0.9rem"}}>{emp.reporting_manager}</div>
                        <div class="col l1 m1  hide-on-med-and-down" style={{fontSize:"0.9rem"}} >{emp.band}</div>
                        <div class="col l1 m1 hide-on-small-only" style={{fontSize:"0.9rem"}}>{emp.location}</div>
                        <div class="col l1 m1 s1" style={{fontSize:"0.9rem"}}>
                            <span class="badge">
                                <a data-target="dde" class='dropdown-trigger'  ><i class=" material-icons" style={{color:color,width:"30px" ,height:"30px"}}>more_vert</i></a>
                            </span>
                            
                        </div>
                    </div>
                </div>
            </div>


            <ul class="dropdown-content utility-dd" id="dde">
                <li ><a data-target="modal4" class=" modal-trigger amber-text"><i class="material-icons">create</i>Edit</a></li>
                <li  onClick={()=>{toggleEmpState(emp)}} ><a ><i class="material-icons">person</i>{emp.user_status}</a></li>
                <li ><a class="red-text darken-1"><i class="material-icons">remove_circle</i>Delete</a></li>
            </ul>

          
           
       
        
        </>
    )
}

export default EmployeeInfo
