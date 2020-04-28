import React from "react";
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import routes from './RouterPaths';
import MainPage from "./MainPage";
import Registration from './Registration';
import Authorization from './Authorization';

class App extends React.Component {
    render(){
        return(
            <BrowserRouter>
                <Switch>
                    <Route exact path={routes.authorization} children={<Authorization onAuthorization={(data)=>console.log('1')}/>}/>
                    <Route exact path={routes.registration} component={Registration}/>
                    <Route path={routes.home} component={MainPage}/>
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;