import React                                      from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import './assets/css/app.scss'

import Header from './components/shared/Header'
import Home     from './views/Home'
import ViewNote from './views/ViewNote'

function SafeNotes () {
    return (
        <Router basename="/app">
            <div className="SafeNotes container mx-auto flex flex-col px-2">
                <Header />

                <Switch>
                    <Route exact={true} path="/" component={Home} />
                    <Route exact={true} path="/view-note/:noteId" component={ViewNote} />
                </Switch>
            </div>
        </Router>
    )
}

export default SafeNotes
