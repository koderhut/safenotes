import React    from 'react'
import ReactDOM from 'react-dom'

import { config, ConfigContext } from './components/context/Config'
import StorageEngine             from './lib/StorageEngine'

import SafeNotes from './SafeNotes'

import * as serviceWorker from './serviceWorker'

let AppConfig = {
    ...config,
    ...window.snenv,
    storage: new StorageEngine(window.snenv.web.storage_path),
}

ReactDOM.render(
    <React.StrictMode>
        <ConfigContext.Provider value={AppConfig}>
            <SafeNotes />
        </ConfigContext.Provider>
    </React.StrictMode>,
    document.getElementById('root'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
