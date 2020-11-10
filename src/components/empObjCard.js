import React, { useState,useEffect,useContext } from 'react';
import {REFRESH_EMP } from '../actions/objActions';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import M from 'materialize-css';
import {BgThemeContext} from '../context/bgtheme'

function EmpObjCard({title,emp,objid,empkrlist}) {

    const [kr,setkr]= useState(null);
    var color;

    const dispatch = useDispatch();
   /* const {lightcolor,light,darkcolor} = useContext(BgThemeContext)
    color = light==true? lightcolor : darkcolor;*/

    const {appcolor,changeAppTheme} = useContext(BgThemeContext);
   color= appcolor;
    


    const HandleAddKr = async() =>
    {
        if(kr!=null && kr!= "")
        {
            var results = await axios.post('https://workflow-app-01.herokuapp.com/objectives/employee/add/kr',{
                kr,emp,objid
             })
             .then(function (response) {
                 setkr('');
                 dispatch({type:REFRESH_EMP})
             })
             .catch((err) => {
                 //let error =err.response.data.errors;
                 console.log(err);
             });
        }
        
      
    }

    return (
        <div class="card">
            <div class="card-content ">
                <div class="card-title">
                    <a class="btn-floating btn-small pink lighten-4 pink-text text-darken-1" style={{marginRight:"10px"}}><span style={{marginLeft:"3px" ,fontWeight:"bolder"}}>OB</span></a>{title}
                </div>
            </div>
            <div class="card-action  grey lighten-5">
                <ol>{empkrlist}</ol>
                <hr/>
                <a class="btn-small btn-floating "  style={{marginBottom:"5px",backgroundColor:color}}  onClick={()=>{ HandleAddKr()}}><i class=" material-icons">add</i></a> 
                <div class="input-field inline" style={{marginLeft:"10px"}}>
                    <input  type="text" value={kr} onChange={(e)=>setkr(e.target.value)} />
                    <label style={{color:color}}>Add New KR </label>
                </div>
            </div>
        </div>
    )
}

export default EmpObjCard
