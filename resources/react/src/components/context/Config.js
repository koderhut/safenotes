import React from 'react';

export const config = {
    web: {
        storage_path: process.env.REACT_APP_SAFENOTE_STORAGE_PATH,
        domain: process.env.REACT_APP_SAFENOTE_DOMAIN,
    },
    app: {
        timeframe: [
            {label: "1 hour", value: "1h"},
            {label: "2 hour", value: "2h"},
        ]
    }
};

export const ConfigContext = React.createContext(config);
