import React from "react";
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import MainPage from "./MainPage";

class App extends React.Component {
    render(){
        return(
            <BrowserRouter>
                <Switch>
                    <Route exact path='/register'>
                        <div>Hello world</div>
                    </Route>
                    <Route path='/'>
                        <MainPage/>
                    </Route>
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;