import React ,{useState,useEffect ,Profiler,Suspense, lazy} from 'react';
import {Route} from 'react-router-dom';
import SignUp from './components/signup';
import Main from './components/main';
import Login from './components/login';
//import DashBoard from './containers/dashboard';
import Company from './components/company';
import Department from './containers/department';
import Employee from './components/employee';
import AdminEmployee from './components/AdminEmployee';
import AdminDepartment from './components/AdminDepartment';
import Loader from './components/Loader';
import { useHistory } from "react-router-dom";
import Cookies from 'universal-cookie';



//import {BgThemeContext} from './context/bgtheme';

import Bgtheme from './context/bgtheme';
//import DeptTab from './components/deptTab';

import UserAccessHandler from './HOC/UserAccess';

const DashBoard = React.lazy(() => import('./containers/dashboard'));

const WithAccessDashboard =  UserAccessHandler(DashBoard,{check:true, user:false});
const WithAccessCompany =  UserAccessHandler(Company,{check:false, user:true});
const WithAccessDept =  UserAccessHandler(Department,{check:false, user:true});
const WithAccessEmp = UserAccessHandler(Employee,{check:false, user:false});
const WithAccessAdminDept = UserAccessHandler(AdminDepartment,{check:false, user:true});
const WithAccessAdminEmployee = UserAccessHandler(AdminEmployee,{check:false, user:true});

const cookies = new Cookies();

const loader = 
<div class="progress amber lighten-4" style={{marginTop:"300px",width:"300px",marginLeft:"500px"}}>
  <div class="indeterminate amber darken-1" ></div>
</div>;

function App() {

  let history = useHistory();
  useEffect(()=>{
    var authenticate = cookies.get('jwt',{ path: '/' })
    console.log("authenticate" + authenticate)
    if(authenticate!=undefined)
    {
        history.push('/dashboard');
    }
  },[])
  

  const onRenderCallback= (id, phase, actualDuration, baseDuration, startTime,  commitTime, interactions )  =>
  {
     console.log( 'The component', id, ', The phase', phase,', Time taken for the update',  actualDuration, baseDuration, startTime, commitTime, interactions);
  }
  return (
    <>
    
      <Bgtheme>
        <Route exact path="/" component={Main}></Route>
        <Route path='/signup' component={SignUp}></Route>
        <Route path='/login' component={Login}></Route>
        <Suspense fallback={loader}>
          <Route  path="/dashboard" render={(props) => (<WithAccessDashboard {...props} user={false} />)}></Route>
       </Suspense>
        <Route path='/dashboard/company' render={(props) => (<WithAccessCompany {...props} user={true} />)}></Route>
        <Route path='/dashboard/department' render={(props) => (<WithAccessDept {...props} user={true} />)}></Route>
        <Route path='/dashboard/employee' render={(props) => (<WithAccessEmp {...props} user={false} />)}></Route>
        <Route path='/dashboard/adminemployee' render={(props) => (<WithAccessAdminEmployee {...props} user={true} />)} ></Route>
        <Route path='/dashboard/admindepartment' render={(props) => (<WithAccessAdminDept {...props} user={true} />)}></Route>
        <Route path="/!" component={Loader} ></Route>
      </Bgtheme>
  </>
  
  );
}

export default React.memo(App);


/* <BgThemeContext.Provider value={{color:"lightblue"}}>
    <Route exact path="/" component={Main}></Route>
    <Route path='/signup' component={SignUp}></Route>
    <Route path='/login' component={Login}></Route>
    <Route  path="/dashboard" component={DashBoard}></Route>
    <Route path='/dashboard/company' component={Company}></Route>
    <Route path='/dashboard/department' component={Department}></Route>
    <Route path='/dashboard/employee' component={Employee}></Route>
    <Route path='/dashboard/admin/employee' component={AdminEmployee} ></Route>
  </BgThemeContext.Provider>*/

