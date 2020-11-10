import React, { useState,useEffect,useContext } from 'react';
import axios from 'axios';
import M from 'materialize-css';
import '../styles/company.css';
import { useSelector,useDispatch } from 'react-redux';
import Card from './ObjCard';
import {REFRESH ,REFRESH_DEPT ,REFRESH_EMP } from '../actions/objActions';
import {BgThemeContext} from '../context/bgtheme';
import UserAccessHandler from '../HOC/UserAccess';
import { useHistory } from "react-router-dom";


function DeptTab(props) {

    const [objective,setObjective] = useState(null);            // new objective
    const [CoObjective, setCoObjective] = useState(null);       // list of C Objectives
    const [DoObjective, setDoObjective] = useState(null);       // list of D objectives
    const [empList,setEmpList] = useState(null);                //list of employees
    const [selectedDept,setSelectedDept] =useState(null);
    const [depatmentObjectives,setDO]=useState(null);            //particular dept objectives jsx
    const [Link_CID, setLinkcid] = useState(null);
    const [Link_DID, setLinkdid] = useState(null);
    const [Link_EID, setLinkeid] = useState(null);
    const [EmpListDisp,setEmpListDisp] = useState(null);
    const [COListDisp,setCOListDisp] = useState(null);

    var color="orange";

    let history = useHistory();

    var cobj_store = useSelector(state => state.companyObjectives);
    var dobj_store = useSelector(state => state.deptObjectives);
    var emp_store = useSelector(state => state.employeeDetails);

    const dispatch = useDispatch();
    /*const {lightcolor,light,darkcolor,toggleTheme} = useContext(BgThemeContext)
    color = light==true? lightcolor : darkcolor;
    console.log("theme color" + light);*/
    
    const {appcolor} = useContext(BgThemeContext);
   color= appcolor;

    useEffect(()=>{
        M.AutoInit();  
        console.log("dept tab rerendering");
        dispatch({type:REFRESH_DEPT})
        dispatch({type:REFRESH_EMP})
        dispatch({type:REFRESH});
        
    },[])

    useEffect(()=>{
       
        setCoObjective(cobj_store);
    },[cobj_store]);

    
    
    useEffect(()=>{
        setDoObjective(dobj_store);
    },[dobj_store]);


    useEffect(()=>{
        setEmpList(emp_store);
    },[emp_store]);

    
    const HandleAddObj = async () => 
    {
        if(objective!=null && objective != "")
        {
            var results = await axios.post('https://workflow-app-01.herokuapp.com/objectives/department/add',{
                objective,selectedDept:props.match.params.deptid
             })
             .then((response) => {
                 setObjective('');
                 dispatch({type:REFRESH_DEPT})
             })
             .catch((err) => {
                 console.log(err);
             });
        }
       
    }

    const setLD= (id) =>{
        setLinkdid(id);
    }


    const DeleteObj = async(id) =>{
        console.log("id to be deleted is " + id);
        var results = await axios.post('https://workflow-app-01.herokuapp.com/objectives/dept/delete',{
            id
            })
            .then((response) => {
                dispatch({type:REFRESH_DEPT})
                dispatch({type:REFRESH_EMP})
                dispatch({type:REFRESH});
            })
            .catch((err) => {
                console.log(err);
            });
    }


    // used to display the Dept Objectives 
    useEffect(()=>{
        
        let objdata= DoObjective;
        var isobj =false;
        //console.log(DoObjective);
        var dept_id = props.match.params.deptid ;
       try{
            if(objdata!=null)
            {
                setSelectedDept(dept_id);
                var objlistArray =[];

                for( let i =0 ;i< objdata.length ;i++)
                {
                    let objd= objdata[i];
                    
                    if(dept_id==objd.dept_id)
                    {
                        isobj=true;
                        var assigne =[];
                        if(objd.key_results.length!=0)
                        {
                            var assigneeemp;
                            for(let k=0;k<objd.key_results.length;k++)
                            {
                                assigneeemp = <li>Assignee : {objd.key_results[k].employee_name}</li>
                                assigne.push(assigneeemp);
                            }
                            
                        }
                        let objlist = <div><Card  title={objd.description}  id={objd._id} assigne ={assigne} handler={setLD} DeleteObj={DeleteObj}/></div>;
                        objlistArray.push(objlist);
                    }
                }  
                if(isobj==false)
                {
                    console.log("hiii");
                    objlistArray= <></>;
                }
                setDO(objlistArray);
        }   
       }
       catch(err)
       {
           console.log("useeffect error");
           console.log(err);
       }
       
    },[DoObjective,props.match.params.deptid])

    


    //sets the company objective list for modal
    useEffect(()=>{
        var x = CoObjective;
        var objc=[]
        if(x!=null)
        {
        for(let i=0 ;i<x.length;i++)
        {
          let co = x[i];
          //console.log(co);
          let cod = <p>
          <label>
            <input name="group1" type="radio" value={co._id}/>
              <span>{co.description}</span>
          </label>
        </p>
        objc.push(cod);
        }
      }
        //console.log(objc);
        setCOListDisp(objc);
    },[CoObjective]);

    // sets the employee list for modal
    useEffect(()=>{
        console.log("emp ");
        console.log(props.match.params.deptid)
        var deptidh = props.match.params.deptid;
        var x = empList;
        var objc=[]
        console.log(x);
        if(x!=null)
        {
            for(let i=0 ;i<x.length;i++)
            {
                let co = x[i];
                if(co.dept_id==deptidh)
                {
                    //console.log(co);
                    console.log(co);
                    let cod = 
                    <p>
                        <label>
                            <input name="group1" type="radio" value={co._id}/>
                            <span>{co.name} - {co.designation}</span>
                        </label>
                    </p>
                    objc.push(cod);
                }
            }
        }
        console.log(objc);
        //console.log(objc);
        setEmpListDisp(objc);
    },[empList,props.match.params.deptid]);


    // handles Link button (linking CO and DO)
    const handleLinkBtn = async () =>{
       var results = await axios.post('https://workflow-app-01.herokuapp.com/objectives/department/link',{
          coid:Link_CID,doid:Link_DID,dept_id:selectedDept
       })
       .then(function (response) {
           dispatch({type:REFRESH});
           //history.push('/dashboard/department/'+ props.match.params.deptid)
           history.goBack();
          
       })
       .catch((err) => {
           let error =err.response.data.errors;
           console.log(error);
       });
    }

    //Handles ADD Assignee Button
    const handleAABtn =async  () =>{
       var results = await axios.post('https://workflow-app-01.herokuapp.com/objectives/employee/link',{
          eoid:Link_EID,doid:Link_DID
       })
       .then(function (response) {
           console.log("hey");
           dispatch({type:REFRESH_DEPT});
           //history.push('/dashboard/department/'+ props.match.params.deptid)
           history.goBack();
       })
       .catch((err) => {
           let error =err.response.data.errors;
           console.log(error);
       });
    }

    return (
        <>
            
            <div class="row">
                <div class="col l9 "><input type="text" value={objective}  onChange={(e)=>{setObjective(e.target.value)}}  /></div>
                <div class="col l3 "> <button className="btn add-obj-btn" style={{backgroundColor:color}} onClick={()=>{HandleAddObj()}}>Add Objective</button></div>
            </div>

            {depatmentObjectives }
           
            <div id="modal1" class="modal">
              <div class="modal-content" onChange={(e)=>{setLinkcid(e.target.value)}}>
              {COListDisp}
              </div>
              <div class="modal-footer">
                <a href="#!" className="modal-close amber darken-1 btn" onClick={()=>{handleLinkBtn()}}>Okay</a>
              </div>
            </div>

            <div id="modal2" class="modal">
              <div class="modal-content" onChange={(e)=>{setLinkeid(e.target.value)}}>
              {EmpListDisp}
              </div>
              <div class="modal-footer">
                <a href="#!" className="modal-close amber darken-1 btn" onClick={()=>{handleAABtn()}} >Okay</a>
              </div>
            </div>

        </>
    );

}

export default UserAccessHandler(DeptTab);


  /*let objlist = 
    <div className="card" onClick={()=>{console.log("hi");setLinkdid(objd._id)} }>
        <div class="card-content">
            <div class="card-title">
                {objd.description}
                <span className="badge">
                    <a data-target='dd3' class='dropdown-trigger'  >Drop Me!</a>
                </span>
            </div>
            {assigne}
        </div>
    </div> ;*/
    
    /*useEffect(()=>{
        var dept_id = props.match.params.deptid ;
        
        let objdata= DoObjective;
        console.log(objdata);
        var title= ["","mary","pon","jar"]
        var num = ["","1","2","3"]
        var abcd=[];
        for(let i=0;i<title.length;i++)
        {
            if(num[i]== dept_id)
            {
            let abc =  <>
            <h2>{dept_id}</h2>
            <Cardeg title={title[i]}  name="byee" /> 
            </>

            abcd.push(abc)
            }
        }
        
        
        
        setDO(abcd);
    },[DoObjective,props.match.params.deptid])*/