import React, {useEffect,useContext } from 'react';
import M from 'materialize-css';
import '../styles/company.css';
import {BgThemeContext} from '../context/bgtheme'

function Card({id,title,assigne,handler,DeleteObj}) {
  
  var color="orange";

  /*const {lightcolor,light,darkcolor,toggleTheme} = useContext(BgThemeContext)
  color = light==true? lightcolor : darkcolor;*/

  const {appcolor,changeAppTheme} = useContext(BgThemeContext);
  color= appcolor;
    


  useEffect(()=>{
    M.AutoInit();  
  },[])


  return (
    <>
     
          <div className="card" onClick ={()=>{handler(id)}}>
            <div class="card-content">
              <div class="card-title">
                {title}
                <span className="badge">
                    <a data-target='dd3' class='dropdown-trigger'  ><i class=" material-icons" style={{color:color,width:"30px" ,height:"30px"}}>more_vert</i></a>
                </span>
              </div>
              <ul>
                {assigne}
              </ul>
            </div>
          </div>
      

     

    <ul class="dropdown-content utility-dd" id='dd3'>
        <li ><a data-target="modal2" class=" modal-trigger amber-text"><i class="material-icons">add_circle</i>Add Assigne</a></li>
        <li ><a data-target="modal1" class=" modal-trigger"><i class="material-icons">link</i>Link to CO</a></li>
        <li ><a class="red-text darken-1"  onClick={()=>{DeleteObj(id)}}><i class="material-icons">remove_circle</i>Delete Objective</a></li>
    </ul>
     
    </>
  );
}

export default Card;


