 
import React  from 'react';
import ReactDOM from 'react-dom';
import {createStore,applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import { Suspense, lazy } from 'react';
import rootReducer from './reducers/rootReducer'
import saga from 'redux-saga';
import rootSaga from './sagas/rootsaga';
import { HashRouter, Route, Link } from "react-router-dom";
import {reactLocalStorage} from 'reactjs-localstorage';
//reactLocalStorage.set('color', "orange");


const App = React.lazy(() => import('./App'));

const sagaMiddleWare = saga();

const store = createStore(rootReducer,applyMiddleware(sagaMiddleWare));
sagaMiddleWare.run(rootSaga);


const loader = 
<div class="progress amber lighten-4" style={{marginTop:"300px",width:"300px",marginLeft:"500px"}}>
  <div class="indeterminate amber darken-1" ></div>
</div>;

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={loader}>
          <HashRouter  basename='/' >
            <Provider store={store}><App /></Provider>
          </HashRouter>
    </Suspense>
  </React.StrictMode>,
  document.getElementById('root')
);




