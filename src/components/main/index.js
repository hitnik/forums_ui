import React, { PureComponent } from "react";
import { Switch, Route} from 'react-router-dom';
import ForumsComponent from '../forums';


export default class Main extends PureComponent{
    render(){
        return (
                <div>
                    <Switch>
                        <Route exact path='/' component={ForumsComponent} />
                    </Switch>
                </div>
        )
    }
}