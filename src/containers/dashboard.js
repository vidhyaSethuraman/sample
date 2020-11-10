import React, { useEffect, useState,useContext } from 'react';
import M from 'materialize-css';
import { useHistory } from "react-router-dom";
import { useSelector,useDispatch } from 'react-redux';
import axios from 'axios';
import { Link } from "react-router-dom";
import {CURRENT_USER_GET } from '../actions/objActions';
import ReactColorPicker from '@super-effective/react-color-picker';
import Cookies from 'universal-cookie';
import {BgThemeContext} from '../context/bgtheme'
import 'materialize-css/dist/css/materialize.min.css';
import '../styles/dashboard.css';



const cookies = new Cookies();





function DashBoard() 
{
    const history = useHistory();
    const dispatch = useDispatch();
    var color="orange";

    const[notinumber,setnotinumber] =useState(null);
    const[noti,setnoti] =useState(false);
    const[user,setuser]=useState(null);
    const [useraccess,setuseraccess] = useState(false);
    var appthemecolor;
    const [abc,setabc]=useState(null);
    var useracc = cookies.get('user',{ path: '/' })
    var notinum= useSelector(state => state.noti);
    var userinfo = useSelector(state => state.currentUser);

   /*const {lightcolor,light,darkcolor,changeAppTheme} = useContext(BgThemeContext)
   color = light==true? lightcolor : darkcolor;
   console.log("light " +light);*/

   const {appcolor,changeAppTheme} = useContext(BgThemeContext);
   color= appcolor || "orange";
   
    

    useEffect(()=>{
        M.AutoInit();
        console.log("color is " +  color);
        dispatch({type:CURRENT_USER_GET})
    },[])

    useEffect(()=>{
        setuser(userinfo)
        if(useracc=="true")
        {
            setuseraccess(true)
        }
        else{
            setuseraccess(false)
        }
        
        
    },[userinfo])

    useEffect(()=>{
        console.log("noti number : "  +  notinum);
        setnotinumber(notinum)
        if(notinum==0)
        {
            setnoti(false);
        }
        else{
            setnoti(true);
        }
        
    },[notinum])
   
    
    const changee = async () =>{
        console.log("in changeee");
        
        let em = await axios.get("https://workflow-app-01.herokuapp.com/clear/notification?eoid=" + user);
        //dispatch({type:CURRENT_USER,payload:{user,noti:0}})
        dispatch({type:CURRENT_USER_GET})
        history.push('/dashboard/employee')
    }

    const logout = () =>{
      console.log("loggin out user")
      cookies.remove('jwt')
      cookies.remove('user')
      history.push('/login')
    }

    const onColorChange = (updatedColor) => {
        //console.log(updatedColor);
        appthemecolor=updatedColor;
        setabc(updatedColor)
    };

    return (

       <>
       <div>
           <div class="navbar-fixed">
                <nav className="nav wrapper" style={{backgroundColor: "rgb(14, 1, 59)"}} >
                    <a href="#" data-target="slide-out" class="sidenav-trigger hide-on-large-only"><i class="material-icons">menu</i></a>
                    <a href="#" class="brand-logo"><i class="material-icons dashboard-logo" style={{color:color}}>polymer</i>&nbsp;Work Hive</a>
                    <ul id="nav-mobile" class="right hide-on-med-and-down">
                        <li><a class="btn amber-1 waves-effect waves-orange" style={{backgroundColor:color}} onClick={()=>{logout()}}>Logout</a></li> 
                        <li><a class="btn-floating waves-effect waves-light darken-1" onClick={()=>{changee();}} style={{backgroundColor:color}}><i class="black-text material-icons"  >notifications</i></a></li> 
                        {noti && <li><span class=" white-text pink notification-badge">{notinumber}</span></li>}
                        <li><a class="btn-floating waves-effect waves-light modal-trigger" href="#modalcolorpicker" style={{backgroundColor:color}} ><i class="black-text material-icons"  >color_lens</i></a></li> 
                        
                    </ul>
                </nav>
            </div>


 
            <ul class="sidenav sidenav-fixed hide-on-small side-nav-db" >
                <li><a ><i class=" darken-1 material-icons dashboard-icon" style={{color:color}}>dashboard</i>DashBoard</a></li>

                {useraccess &&   <li><a ><i class="darken-1 material-icons dashboard-icon" style={{color:color}}>web_asset</i>Admin</a></li> }
    {useraccess && <li><a onClick={()=>{history.push('/dashboard/adminemployee')}}  class="dashboard-sub-heading"><span style={{marginLeft:"25px"}}>Employee</span></a></li> }
    {useraccess && <li><a onClick={()=>{history.push('/dashboard/admindepartment')}} class="dashboard-sub-heading"><span style={{marginLeft:"25px"}}>Department</span></a></li> }
              
     
                <li><a ><i class="darken-1 material-icons dashboard-icon" style={{color:color}}>insert_chart</i>Objectives</a></li>
    {useraccess &&      <li><a  onClick={()=>{history.push('/dashboard/company')}} class="dashboard-sub-heading"><span style={{marginLeft:"25px"}}>Company</span></a></li> }
    {useraccess &&    <li><a  onClick={()=>{history.push('/dashboard/department')}} class="dashboard-sub-heading"><span style={{marginLeft:"25px"}}>Department</span></a></li> }
                <li><a  onClick={()=>{history.push('/dashboard/employee')}} class="dashboard-sub-heading"><span style={{marginLeft:"25px"}}>Employee</span></a></li>

            </ul>



            <ul id="slide-out" class="sidenav side-nav-db">
                <li><a ><i class=" darken-1 material-icons dashboard-icon" style={{color:color}}>dashboard</i>DashBoard</a></li>

    {useraccess &&   <li><a ><i class="darken-1 material-icons dashboard-icon" style={{color:color}}>web_asset</i>Admin</a></li> }
    {useraccess &&   <li><a onClick={()=>{history.push('/dashboard/adminemployee')}}  class="dashboard-sub-heading">Employee</a></li> }
    {useraccess &&    <li><a onClick={()=>{history.push('/dashboard/admindepartment')}} class="dashboard-sub-heading">Department</a></li> }
              
                <li><a ><i class="darken-1 material-icons dashboard-icon" style={{color:color}}>insert_chart</i>Objectives</a></li>
                {useraccess &&    <li><a  onClick={()=>{history.push('/dashboard/company')}} class="dashboard-sub-heading">Company</a></li>}
                {useraccess &&    <li><a  onClick={()=>{history.push('/dashboard/department')}} class="dashboard-sub-heading">Department</a></li> }
                <li><a  onClick={()=>{history.push('/dashboard/employee')}} class="dashboard-sub-heading">Employee</a></li>
                <li><a  onClick={()=>{logout()}} class="dashboard-sub-heading" style={{color:color}}>Logout</a></li>
            </ul>
            </div>

            <div id="modalcolorpicker" class="modal">
                <div class="modal-content">
                    <h6>Choose App Theme Color</h6>
                    <br/>
                    <ReactColorPicker color={appthemecolor} onChange={onColorChange}/>
                </div>
                <div class="modal-footer">
                    <button class="modal-close waves-effect waves-green btn-flat"  style={{backgroundColor:color}}  onClick={()=>{console.log("hey" + abc);changeAppTheme(abc)}}>Change Theme</button>
                </div>
            </div>
          </>  
       
        
        
        

       /* <>
        <nav className="nav wrapper black">
            
            <a href="#" class="brand-logo"><img src={logo} height="34px" width="35px" style={{marginBottom:"-4px",marginLeft:"10px"}} />&nbsp;Work Hive</a>
            <ul id="nav-mobile" class="right hide-on-med-and-down">
                <li><a class="btn amber darken-1">Logout</a></li> 
            </ul>
        
        </nav>

            <div class="row">
                
                <div class="col s3">
                    <ul id="slide-out" class="sidenav sidenav-fixed">
                        <li><a ><i class="amber-text darken-1 material-icons" style={{marginRight:"4px" ,fontSize:"20px"}}>dashboard</i>DashBoard</a></li>
                        <li><a ><i class="amber-text darken-1 material-icons">web_asset</i>Admin</a></li>
                        <li><a>Company</a></li>
                        <li><a>Department</a></li>
                        <li><a ><i class=" amber-text darken-1 material-icons">insert_chart</i>Objectives</a></li>
                        <li><a><i class=" amber-text darken-1 material-icons">chrome_reader_mode </i>PMS</a></li>
                    </ul>
                </div>

                <div class="col s9">
                  
                </div>

            </div>
            
        </>

        
        <>
        <nav className="nav wrapper black">
            
                <a href="#" class="brand-logo"><img src={logo} height="34px" width="35px" style={{marginBottom:"-4px",marginLeft:"10px"}} />&nbsp;Work Hive</a>
                <ul id="nav-mobile" class="right hide-on-med-and-down">
                    <li><a class="btn amber darken-1">Logout</a></li> 
                </ul>
            
        </nav>
        
        <div className="row">
            <div className="col l2 side-bar-nav"> 
                <ul>
                    <h5 className="sidebar-heading"><i class="amber-text darken-1 material-icons">dashboard</i>&nbsp;Dash Board</h5>

                    <h5 className="sidebar-heading"><i class="amber-text darken-1 material-icons">web_asset</i>&nbsp;Admin</h5>
                    

                    <h5 className="sidebar-heading"><i class=" amber-text darken-1 material-icons">insert_chart</i>&nbsp;Objectives</h5>
                    <button class="sidebar-nav-btn" onClick={()=>{setInfoPanel(<Company/>)}} > Company</button>
                    <button class="sidebar-nav-btn" onClick={()=>{setInfoPanel(<Department/>)}} > Department</button>

                    <h5 className="sidebar-heading"><i class=" amber-text darken-1 material-icons">chrome_reader_mode </i>&nbsp;PMS</h5>
                    

                    
                </ul>
            </div>
            <div class="col l1"></div>
            <div className="col l8" style={{height:"1400px"}}>
                {infoPanel}
            </div>
        </div>
        </>*/
    );
}

export default React.memo(DashBoard);






{/*

    
                       
<ul class="sidenav sidenav-fixed hide-on-small side-nav-db" >
    <li><a ><i class=" darken-1 material-icons dashboard-icon" style={{color:color}}>dashboard</i>DashBoard</a></li>

    <li><a ><i class="darken-1 material-icons dashboard-icon" style={{color:color}}>web_asset</i>Admin</a></li>
    <li><Link to="/dashboard/adminemployee"><a class="dashboard-sub-heading">Employee</a></Link></li>
    <li><a  class="dashboard-sub-heading">Department</a></li>
    <li><a  class="dashboard-sub-heading">Roles & Permissions</a></li>
    <li><a  class="dashboard-sub-heading">Master Data</a></li>

    <li><a ><i class="darken-1 material-icons dashboard-icon" style={{color:color}}>insert_chart</i>Objectives</a></li>
    <li><Link to="/dashboard/company"><a class="dashboard-sub-heading">Company</a></Link></li>
    <li><Link to="/dashboard/department"><a class="dashboard-sub-heading">Department</a></Link></li>
    <li><Link to="/dashboard/employee"><a class="dashboard-sub-heading">Employee</a></Link></li>

    <li><a><i class="darken-1 material-icons dashboard-icon" style={{color:color}}>chrome_reader_mode </i>PMS</a></li>
</ul>


*/}