import React, { useState,useEffect,useContext ,useReducer} from 'react';
import axios from 'axios';
import M from 'materialize-css';
import '../styles/company.css';
import { useSelector,useDispatch } from 'react-redux';
import {REFRESH ,REFRESH_DEPT ,REFRESH_EMP } from '../actions/objActions';
import {BgThemeContext} from '../context/bgtheme';


import UserAccessHandler from '../HOC/UserAccess';

function Company() {

  const dispatch = useDispatch()
  
  const [objective,setObjective] = useState('');
  const [objectiveList,setObjectiveList] = useState(null);
  const [ob,setob] =useState([]);
  var color="orange";


  var storeCO = useSelector(state => state.companyObjectives);


  /*const {lightcolor,light,darkcolor,toggleTheme} = useContext(BgThemeContext)
   color = light==true? lightcolor : darkcolor;
   console.log("theme color" + light);*/

   const {appcolor} = useContext(BgThemeContext);
   color= appcolor;

  useEffect(()=>{
    M.AutoInit();  
    //console.log("company initi");
    dispatch({type:REFRESH});
  },[])

  useEffect(()=>{
   
   console.log(storeCO);
   setob(storeCO);
  },[storeCO]);
 
  const HandleAddObj = async e =>
  {
    if(objective!=null && objective != "")
    {
      var results = await axios.post('https://workflow-app-01.herokuapp.com/objectives/company/add',{
        objective
     })
     .then(function (response) {
         setObjective('');
         dispatch({type:REFRESH});
     })
     .catch((err) => {
         //let error =err.response.data.errors;
         console.log(err);
     });
    }
  }

  const DeleteObj =  async(id) =>{
    var results = await axios.post('https://workflow-app-01.herokuapp.com/objectives/company/delete',{
      id
   })
   .then(function (response) {
    dispatch({type:REFRESH});
    dispatch({type:REFRESH_DEPT})
    dispatch({type:REFRESH_EMP})
    
   })
   .catch((err) => {
       //let error =err.response.data.errors;
       console.log(err);
   });
   
  }
  

useEffect(() => {
 
    var objdata= ob;
    var objlistArray =[];
    if(objdata!=null)
    {
        for( let i =0 ;i< objdata.length ;i++)
        {
            let objd= objdata[i];
            let dolist = objd.key_results;
            console.log(dolist);
            var krlist=[]
            if(dolist!=null)
            {
              for(let j=0;j<dolist.length;j++)
              {
                if(dolist[j]!=null)
                {
                  let kr = 
                  <li style={{paddingTop:"2px"}}>
                    {dolist[j].kr_description}
                    <span class="badge amber dept-tag-co black-text">{dolist[j].dept_name}</span>
                  </li> ;
                  krlist.push(kr);
                }
                  
              }
            }
            
            let objlist = 
            <div class="card">
              <div class="card-content ">
                <div class="card-title">
                  {objd. description}
                  <span className="badge ">
                    <a class="waves-effect waves-light btn-small red darken-1 dlt-btn" onClick={()=>{DeleteObj(objd)}}>delete</a>
                  </span>
                </div>
              </div>
              <div class="card-action  grey lighten-5">
                <ol>{krlist}</ol>
              </div>
            </div>

            objlistArray.push(objlist);
        }
    }
    setObjectiveList(objlistArray);
},[ob]);
  


  return (
    <>
     
       <div class="container-info">
          <h4 >Company Objectives</h4>
          <div className="row">
            <div className="col l9"><input value={objective} onChange={(e)=>setObjective(e.target.value)} /></div>
            <div className="col l3 "><button class="btn add-obj-btn"  style={{backgroundColor:color}} onClick={()=>{HandleAddObj()}}>Add Objective</button></div>
          </div>
          {objectiveList}
      </div> 
     
    </>
  );
}

export default Company;


