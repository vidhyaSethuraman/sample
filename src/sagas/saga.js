import { takeEvery,call,put} from 'redux-saga/effects';
import axios from 'axios';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

function* getCO() {
    try {
      console.log('heyyy')
      // data is obtained after axios call is resolved
      let res = yield call(() =>  axios.get('https://workflow-app-01.herokuapp.com/objectives/company/get'));
      let co = res.data.objectiveList;
      console.log(co);
      let res1 = yield call(() => axios.get('https://workflow-app-01.herokuapp.com/objectives/department/get'));
      let dobj = res1.data.objectiveList;

      // dispatch action to change redux state
      yield put({type:"REFRESH_CO" , payload : {co, dobj}});
     
    } catch (e) {
      // catch error on a bad axios call
      console.log(e);
    }
  }

//watcher function - watches for actions
export  function* watchCO() {
    console.log("watcher function CO")
    yield takeEvery('REFRESH', getCO);
    //yeild takeEvery('REFRESH);
    //call(getCO);
}



function* getDO() {
    try {
      // data is obtained after axios call is resolved
      let { data } = yield call(() => axios.get('https://workflow-app-01.herokuapp.com/objectives/department/get'));
      
      // dispatch action to change redux state
      yield put({type:"REFRESH_DO" , payload : data.objectiveList});
     
    } catch (e) {
      // catch error on a bad axios call
      console.log(e);
    }
  }

//watcher function - watches for actions
export  function* watchDO() {
    console.log("watcher function DO")
    yield takeEvery('REFRESH_DEPT', getDO);
}



function* getED() {
    try {
      // data is obtained after axios call is resolved
      let { data } = yield call(() => axios.get('https://workflow-app-01.herokuapp.com/objectives/employee/get'));
      console.log("getED");
      console.log(data.emp);
      // dispatch action to change redux state
      yield put({type:"REFRESH_ED" , payload : data.emp});
     
    } catch (e) {
      // catch error on a bad axios call
      console.log(e);
    }
  }

//watcher function - watches for actions
export  function* watchED() {
    console.log("watcher function")
    yield takeEvery('REFRESH_EMP', getED);
}

//get current user
function* getCU() {
  try {
    // data is obtained after axios call is resolved
    let jwt = cookies.get('jwt')
    let { data } = yield call(() => axios.get('https://workflow-app-01.herokuapp.com/get/current/employee?jwt='+jwt));
    
    // dispatch action to change redux state
    yield put({type:"CURRENT_USER" , payload : {user:data.user, noti:data.noti}});
   
  } catch (e) {
    // catch error on a bad axios call
    console.log(e);
  }
}


export  function* watchCU() {
  console.log("watcher function user details")
  yield takeEvery('CURRENT_USER_GET', getCU);
}





//get current user
function* getAD() {
  try {
    // data is obtained after axios call is resolved
    let { data } = yield call(() => axios.get('https://workflow-app-01.herokuapp.com/admin/deptartment/get'));
    
    // dispatch action to change redux state
    yield put({type:"REFRESH_ADMIN_DEPT" , payload :data.deptinfo});
   
  } catch (e) {
    // catch error on a bad axios call
    console.log(e);
  }
}


export  function* watchAD() {
  console.log("watcher function user details")
  yield takeEvery('REFRESH_AD', getAD);
}