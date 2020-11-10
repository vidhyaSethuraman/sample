import React, { useState,useEffect,useContext,useRef } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import {REFRESH_EMP} from '../actions/objActions';
import axios from 'axios';
import EmployeeInfo from './EmployeeInfo';
import {BgThemeContext} from '../context/bgtheme';
import UserAccessHandler from '../HOC/UserAccess';
import M from 'materialize-css';
import { useHistory } from "react-router-dom";

function AdminEmployee() {
    
    const [empList,setEmpList] = useState(null);  
    const [EmpListDisp,setEmpListDisp] = useState(null);
    const[name,setname]=useState(null);
    const[designation,setdesignation]=useState(null);
    const[band,setband]=useState(null);
    const[eemployee_code,setcode]=useState(null);
    const [empdept,setempdept]=useState(null);
    const[empid,setempid]=useState(null);
    var color="orange";


    /*const {lightcolor,light,darkcolor} = useContext(BgThemeContext)
    color = light==true? lightcolor : darkcolor;*/

   const {appcolor} = useContext(BgThemeContext);
   color= appcolor;

    const deptarmentList =['', 'HR'  ,'Developement','QA','Networks'];
    let history = useHistory();

    var cdept_id =useRef(null);
    var cname =useRef(null);
    var cdesignation =useRef(null);
    var cband =useRef(null);
    var cemployee_code=useRef(null);


    var adept_id =useRef(null);
    var aname =useRef(null);
    var adesignation =useRef(null);
    var aband =useRef(null);
    var aemployee_code=useRef(null);
    var alocation=useRef(null);
    var areportingm=useRef(null);
    var aemail=useRef(null);
    
   

    var emp_store = useSelector(state => state.employeeDetails);

    const dispatch = useDispatch();

    useEffect(()=>{
        M.AutoInit();  
        console.log("heyyy therererererere")
        dispatch({type:REFRESH_EMP})
    },[])

    useEffect(()=>{
        setEmpList(emp_store);
        console.log("emp storeee");
        console.log(emp_store);
    },[emp_store]);

    const empListGenerator = () =>{
        var emp = empList;
        console.log("in emp list generator");
        console.log(emp);
        var empdetails=[]
        if(emp!=null)
        {
            for(let i=0;i<emp.length;i++)
            {
                let dept_id_integer = parseInt(emp[i].dept_id);
                let x= <EmployeeInfo emp= {emp[i] } dept_id_integer={dept_id_integer} handler={handler} toggleEmpState={toggleEmpState}/>
               empdetails.push(x);
            }
        }
        
        //setEmpListDisp(empdetails);
        return empdetails;
    }

    const handler = (emp,deptid) =>{
         console.log("handlerrrrrrrrr");
         console.log(emp.name);
         setname(emp.name);
         setdesignation(emp.designation);
         setcode(emp.employee_code);
         setband(emp.band);
         setempdept(deptid);
         setempid(emp._id);
    }


    const handlEditBtn = async() =>{
        console.log("handle edit button")
        //console.log(empdept,name,designation,band,eemployee_code);
        //console.log(cname,cdesignation,cband,cdept_id,cemployee_code);
        cname.current = cname.current==null ? name:cname.current;
        cdesignation.current =cdesignation.current===null ? designation : cdesignation.current;
        cband.current = cband.current==null? band : cband.current;
        cdept_id.current = cdept_id.current==null? empdept:cdept_id.current;
        cemployee_code.current = cemployee_code.current==null? eemployee_code : cemployee_code.current;

        //console.log(cname,cdesignation,cband,cdept_id,cemployee_code);

        
     var results = await axios.post('https://workflow-app-01.herokuapp.com/objectives/employee/edit',{
            dept_id:cdept_id.current,name:cname.current,designation:cdesignation.current,band:cband.current,employee_code:cemployee_code.current,id:empid
      })
      .then(function (response) {
        dispatch({type:REFRESH_EMP})
        //history.push('/dashboard/adminemployee')
        history.goBack();
      })
      .catch((err) => {
          //let error =err.response.data.errors;
          console.log(err);
      });

    } 


    const AddEmpBtn =async  () =>{

     var results = await axios.post('https://workflow-app-01.herokuapp.com/objectives/employee/add',{
        name:aname.current ,designation :adesignation.current ,dept_id : adept_id.current ,mobileno:null,email :aemail.current,location: alocation.current,reporting_manager:areportingm.current,band:aband.current,employee_code:aemployee_code.current
      })
      .then(function (response) {
        dispatch({type:REFRESH_EMP})
        history.goBack();
      })
      .catch((err) => {
          //let error =err.response.data.errors;
          console.log(err);
      });
      aname.current=null;
      adesignation.current=null;
      adept_id.current=null;
      aemail.current=null;
      alocation.current=null;
      areportingm.current=null;
      aband.current=null;
      aemployee_code.current=null;

    } 
    
    const toggleEmpState = async (emp) =>{
        var state=""
        if(emp.user_status=="Activate")
        {
            state="Deactivate"
        }
        else
        {
            state="Activate"
        }

    var results = await axios.post('https://workflow-app-01.herokuapp.com/admin/user/toggle',{
        id:emp._id,state
      })
      .then(function (response) {
        dispatch({type:REFRESH_EMP})
        
      })
      .catch((err) => {
          //let error =err.response.data.errors;
          console.log(err);
      });
    }


    return (
        <div class="container-info">
            <br/>
            <div class="row ">
                <h5 class="col">Employee Information</h5>
                <button data-target="modal3" class="modal-trigger btn right col" style={{backgroundColor:color,marginTop:"10px"}}>Add New Employee</button>
            </div>
            <br/>
            <div class="row" class="row admin-table-header">
                <div class="col l1 m1 s1" style={{fontSize:"0.7rem"}}>CODE</div>
                <div class="col l2 m2 s2" style={{fontSize:"0.7rem"}}>NAME</div>
                <div class="col l2 m2 s2" style={{fontSize:"0.7rem"}}>DEPARTMENT</div>
                <div class="col l2 m2 s3" style={{fontSize:"0.7rem"}}>DESIGNATION</div>
                <div class="col l2 m2 s3" style={{fontSize:"0.7rem"}}>REPORTING MANAGER</div>
                <div class="col l1 m1 hide-on-med-and-down" style={{fontSize:"0.7rem"}}>BAND</div>
                <div class="col l1 m1 hide-on-small-only" style={{fontSize:"0.7rem"}}>LOCATION</div>
                <div class="col l1 m1 s1" style={{fontSize:"0.7rem"}}></div>
            </div>
            {empListGenerator()}


            <div id="modal3" class="modal" >
              <div class="modal-content emp-modal" >
                <h6>Add Employee</h6>
                <div class="input-field col s9">
                    <select onChange={(e)=>{adept_id.current=e.target.value}}>
                        <option value="" disabled selected>DEPARTMENT</option>
                        <option value="1">HR</option>
                        <option value="2">DEVELOPMENT</option>
                        <option value="3">NETWORKING</option>
                        <option value="4">QA</option>
                    </select>
                </div>

                <input type="text" placeholder="EMPLOYEE NAME" onChange={(e)=>{aname.current=e.target.value}}></input>
                <input type="text" placeholder="EMPLOYEE CODE" onChange={(e)=>{aemployee_code.current=e.target.value}}></input>
                <input type="text" placeholder="EMAIL" onChange={(e)=>{aemail.current=e.target.value}}></input>

                <div class="input-field col s9">
                    <select onChange={(e)=>{adesignation.current=e.target.value}}>
                        <option value="" disabled selected>DESIGNATION</option>
                        <option value="HR Intern">HR Intern</option>
                        <option value="HR Assistant">HR Assistant</option>
                        <option value="Developer Intern">Developer Intern</option>
                        <option value="Senior Devoloper">Senior Devoloper</option>
                        <option value="Junior Devoloper">Junior Devoloper</option>
                    </select>
                </div>

                <div class="input-field col s9">
                    <select onChange={(e)=>{aband.current=e.target.value}}>
                        <option value="" disabled selected>BAND</option>
                        <option value="G2A">G2A</option>
                        <option value="G1B">G1B</option>
                        <option value="G3C">G3C</option>
                    </select>
                </div>

                <div class="input-field col s9">
                    <select >
                        <option value="" disabled selected>ROLE</option>
                        <option value="1">Employee</option>
                        <option value="2">Intern</option>
                    </select>
                </div>

                <div class="input-field col s9">
                    <select onChange={(e)=>{alocation.current=e.target.value}}>
                        <option value="" disabled selected>LOCATION</option>
                        <option value="Bangalore">Bangalore</option>
                        <option value="Coimbatore">Coimbatore</option>
                    </select>
                </div>

                <div class="input-field col s9">
                    <select onChange={(e)=>{areportingm.current=e.target.value}}>
                        <option value="" disabled selected>REPORTING MANAGER</option>
                        <option value="Shelly Stone">Shelly Stone</option>
                        <option value="Katy Holmes">Katy Holmes</option>
                    </select>
                </div>

              </div>

              <div class="modal-footer">
                <a href="#!" className="modal-close amber darken-1 btn" onClick={()=>{AddEmpBtn()}}>Add Employee</a>
              </div>
            </div>



            
            <div id="modal4" class="modal">
                <div class="modal-content emp-modal" >
                    <h6>Edit Employee Details</h6>
                    <div class="input-field col s9">
                        <select onChange={(e)=>{cdept_id.current=e.target.value}}>
                            <option value="" disabled selected>{deptarmentList[empdept]}</option>
                            <option value="1">HR</option>
                            <option value="2">DEVELOPMENT</option>
                            <option value="3">NETWORKING</option>
                            <option value="4">QA</option>
                        </select>
                    </div>

                    <input type="text"  class="modal-edit-inp" placeholder={name} onChange={(e)=>{cname.current=e.target.value}}></input>

                    <div class="input-field col s9">
                        <select onChange={(e)=>{cdesignation.current=e.target.value}}>
                            <option value="" disabled selected  >{designation}</option>
                            <option value="HR Intern">HR Intern</option>
                            <option value="HR Assistant">HR Assistant</option>
                            <option value="Developer Intern">Developer Intern</option>
                            <option value="Senior Devoloper">Senior Devoloper</option>
                            <option value="Junior Devoloper">Junior Devoloper</option>
                        </select>
                    </div>

                    <div class="input-field col s9">
                        <select onChange={(e)=>{cband.current=e.target.value}}>
                            <option value="" disabled selected>{band}</option>
                            <option value="G2A">G2A</option>
                            <option value="G1B">G1B</option>
                            <option value="G3C">G3C</option>
                        </select>
                    </div>

                    <div class="input-field col s9">
                        <select>
                            <option value="" disabled selected>ROLE</option>
                            <option value="1">Employee</option>
                            <option value="2">Intern</option>
                        </select>
                    </div>

                    <input type="text" placeholder={eemployee_code} class="modal-edit-inp" onChange={(e)=>{cemployee_code.current=e.target.value}}></input>


                </div>

                <div class="modal-footer">
                    <a href="#!" className="modal-close amber darken-1 btn" onClick={()=>{handlEditBtn()}}>Save</a>
                </div>
            </div>


        </div>

        

    )
}

export default UserAccessHandler(AdminEmployee)
