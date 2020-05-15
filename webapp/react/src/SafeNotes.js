import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import "./assets/css/app.scss";

import Header from "./components/shared/Header";
import Home from "./views/Home";
import ViewNote from "./views/ViewNote";

const SafeNotes = () => {
    return (
        <Router basename="/app">
            <div className="safe-notes container mx-auto flex flex-col px-2">
                <Header/>

                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/view-note/:noteId" component={ViewNote}/>
                </Switch>
            </div>
        </Router>
    );
};

export default SafeNotes;
