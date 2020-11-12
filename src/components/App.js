import React, { PureComponent } from "react";

// import '../styles/App.css';

import Navbar from "./main_navbar";
import Main  from './main';

export default class App extends PureComponent {
    render() {
        return (
            <div>
                <Navbar/>
                <Main/>
            </div>
        );
    }
}

