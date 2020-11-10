import axios from 'axios'
import React, { useState,useEffect ,useContext} from 'react'
import M from 'materialize-css';
import {BgThemeContext} from '../context/bgtheme';
import { useSelector,useDispatch } from 'react-redux';
import {REFRESH_AD } from '../actions/objActions';
import { useHistory } from "react-router-dom";

function AdminDepartment() {

    const[deptinfo,setdeptinfo]=useState([]);
    const[infocards,setinfocards]=useState([]);

    const[current_name,setcn]=useState(null);
    const[current_dcode,setdc]=useState(null);
    const[current_function,setcf]=useState(null);
    const[current_location,setl]=useState(null);
    const[current_deptinfo_id,setdii]=useState(null);

    const[acurrent_name,setacn]=useState(null);
    const[acurrent_dcode,setadc]=useState(null);
    const[acurrent_function,setacf]=useState(null);
    const[acurrent_location,setal]=useState(null);

    const dispatch = useDispatch();
    let history = useHistory();
    const {appcolor} = useContext(BgThemeContext);
    var color= appcolor;

    var dept_info_store = useSelector(state => state.departmentInfo);


    useEffect(()=>{
        M.AutoInit(); 
        dispatch({type:REFRESH_AD});

    },[])

    useEffect(() => {
       setdeptinfo(dept_info_store);
    }, [dept_info_store])


    const setCurrentValues = (obj) =>{
        console.log(obj);
        setdii(obj._id);
        setcn(obj.name)
        setdc(obj.id)
        setcf(obj.function_name)
        setl(obj.location);
    }

    useEffect(() => {
        console.log("admin dept res")
        var card_array=[]
        if(deptinfo.length!=0)
        {
            for(let i=0;i<deptinfo.length;i++)
            {
                let obj = deptinfo[i];
                let card = 
                <div className="card" onClick={()=>{setCurrentValues(obj)}}>
                    <div class="card-content">
                        <div class="row">
                            <div class="col l1 s1 m1" style={{fontSize:"0.9rem"}}>{obj.id}</div>
                            <div class="col l2 s3 m3" style={{fontSize:"0.9rem"}}>{obj.name}</div>
                            <div class="col l3 s3 m3" style={{fontSize:"0.9rem"}}>{obj.function_name}</div>
                            <div class="col l3 s3 m3" style={{fontSize:"0.9rem"}}>{obj.location}</div>
                            <div class="col l2 hide-on-med-and-down" style={{fontSize:"0.9rem"}}>{obj.employee_count}</div>
                            <div class="col l1 s2 m2" style={{fontSize:"0.9rem"}}>
                                <span class="badge">
                                    <a data-target="modal-ad-edit" class='modal-trigger'  ><i class=" material-icons" style={{color:color,width:"30px" ,height:"30px" ,cursor: "pointer"}}>create</i></a>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

               card_array.push(card);
            }
        }
        setinfocards(card_array)
    }, [deptinfo])


    const saveChanges = async() =>{

        console.log("axios req send before valess");
        console.log(current_location,current_name,current_function,current_dcode);
           
     var results = await axios.post('https://workflow-app-01.herokuapp.com/admin/department/edit',{
        name:current_name,id:current_dcode,function_name:current_function,location:current_location,info_id:current_deptinfo_id
    })
    .then(function (response) {
        dispatch({type:REFRESH_AD});
        //history.push('/dashboard/adminemployee')
        history.goBack();
    })
    .catch((err) => {
        //let error =err.response.data.errors;
        console.log(err);
    });

    }


    const addDept =  async() =>{
        console.log(acurrent_location,acurrent_name,acurrent_function,acurrent_dcode);
        var results = await axios.post('https://workflow-app-01.herokuapp.com/admin/department/add',{
        name:acurrent_name,id:acurrent_dcode,function_name:acurrent_function,location:acurrent_location
        })
        .then(function (response) {
            dispatch({type:REFRESH_AD});
            //history.push('/dashboard/adminemployee')
            history.goBack();
        })
        .catch((err) => {
            //let error =err.response.data.errors;
            console.log(err);
        });
    }
   

    return (
        <>
        <div class="container-info" >
            <br/><br/>
            <div class="row ">
                <h5 class="col" style={{display:"inline",fontSize:"1.3rem"}}>Department Information</h5>
                <button data-target="modal-dept-add" class="modal-trigger btn right col" style={{backgroundColor:color,marginTop:"10px"}} >Add New Department</button>
            </div>
            <br/>
            <br/>
            <div class="row" class="row admin-table-header hide-on-small-only">
                <div class="col l1 m1" style={{fontSize:"0.7rem"}}>CODE</div>
                <div class="col l2 m3" style={{fontSize:"0.7rem"}}>DEPARTMENT NAME</div>
                <div class="col l3 m3" style={{fontSize:"0.7rem"}}>FUNCTION</div>
                <div class="col l2 m2" style={{fontSize:"0.7rem"}}>LOCATION</div>
                <div class="col l2  hide-on-med-only" style={{fontSize:"0.7rem"}}>EMPLOYEE COUNT</div>
                <div class="col l1 m2" style={{fontSize:"0.7rem"}}></div>
            </div> 
            <div class="row" class="row admin-table-header hide-on-med-and-up">
                <div class="col s2" style={{fontSize:"10px"}}>CODE</div>
                <div class="col s2" style={{fontSize:"10px"}}>NAME</div>
                <div class="col s3" style={{fontSize:"10px"}}>FUNCTION</div>
                <div class="col s2" style={{fontSize:"10px"}}>LOCATION</div>
                
                <div class="col s1" style={{fontSize:"10px"}}></div>
            </div>

            {infocards}
        </div>


        <div id="modal-ad-edit" class="modal" >
              <div class="modal-content emp-modal" >
                    <h6>Edit Department Information</h6>
                    <label>Name</label>
                    <input type="text" value={current_name}  onChange={(e)=>{setcn(e.target.value)}}></input>
                    <label>Function</label>
                    <input type="text" value={current_function} onChange={(e)=>{setcf(e.target.value)}}></input>
                    <label>Code</label>
                    <input type="text" value={current_dcode} onChange={(e)=>{setdc(e.target.value)}}></input>

                    <div class="input-field col s9">
                        <select onChange={(e)=>{setl(e.target.value)}}>
                            <option value="" disabled selected>Location</option>
                            <option value="Bangalore">Bangalore</option>
                            <option value="Coimbatore">Coimbatore</option>
                        </select>
                    </div>

                    <br/>
                    <br/>

              </div>

              <div class="modal-footer">
                <a href="#!" className="modal-close amber darken-1 btn" onClick={saveChanges} >Save Changes</a>
              </div>
        </div>


        <div id="modal-dept-add" class="modal" >
              <div class="modal-content emp-modal" >
                    <h6>Add Department</h6>
               
                    <input type="text" value={acurrent_name} placeholder="Department Name" onChange={(e)=>{setacn(e.target.value)}}></input>
                    <input type="text" value={acurrent_function} placeholder="Department Function" onChange={(e)=>{setacf(e.target.value)}}></input>
                    <input type="text" value={acurrent_dcode} placeholder="Department Code" onChange={(e)=>{setadc(e.target.value)}}></input>

                    <div class="input-field col s9">
                        <select onChange={(e)=>{setal(e.target.value)}}>
                            <option value="" disabled selected>Location</option>
                            <option value="Bangalore">Bangalore</option>
                            <option value="Coimbatore">Coimbatore</option>
                        </select>
                    </div>

                    <br/>
                    <br/>

              </div>

              <div class="modal-footer">
                <a href="#!" className="modal-close amber darken-1 btn" onClick={addDept} >Add Department</a>
              </div>
        </div>
        
        </>
    )
}

export default AdminDepartment
