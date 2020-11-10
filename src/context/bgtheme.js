import React, { createContext } from 'react';
import {reactLocalStorage} from 'reactjs-localstorage';


export const BgThemeContext = createContext();

var b = reactLocalStorage.get('color',{ path: '/' })
if(b==null)
{
    b="orange";
}

class Bgtheme extends React.Component {

    constructor()
    {
        super()
        this.state={
            //light:b,
            //lightcolor: "#1CA7EC",
           // darkcolor: "orange",
            appcolor:b 
        } ;

       // this.toggleTheme= this.toggleTheme.bind(this)
       this.changeAppTheme=this.changeAppTheme.bind(this);
    }
   
    changeAppTheme(x) {
        console.log("bg theme :" + x);
        reactLocalStorage.remove('color');
        reactLocalStorage.set('color', x);
        this.setState({appcolor:x});
    }

    render() {
        return (
            <div>
                <BgThemeContext.Provider value={{...this.state, changeAppTheme:this.changeAppTheme}} >
                    {this.props.children}
                </BgThemeContext.Provider>
            </div>
        )
    }
}

export default React.memo(Bgtheme);

/*import React, { useState, createContext } from "react";

// Create Context Object
export const CounterContext = createContext();

// Create a provider for components to consume and subscribe to changes
export const CounterContextProvider = props => {
  const [count, setCount] = useState(0);

  return (
    <CounterContext.Provider value={[count, setCount]}>
      {props.children}
    </CounterContext.Provider>
  );
};*/

/* toggleTheme() {
        console.log("toggle running");
        var a = reactLocalStorage.get('light',{ path: '/' })
        var c;
        console.log("bgtheme a before " + a);
        if(a=="true")
        {
            a="false";
            c=false
        }
        else{
            a="true";
            c=true;
        }
        console.log("bgtheme a  after" + a);
        reactLocalStorage.remove('light');
        reactLocalStorage.set('light', a);
        this.setState({ light: c });
    }*/