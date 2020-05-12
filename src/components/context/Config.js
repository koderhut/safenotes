import React from 'react';

export const config = {
    web: {
        storage_path: process.env.REACT_APP_SAFENOTE_STORAGE_PATH,
        domain: process.env.REACT_APP_SAFENOTE_DOMAIN,
    }
};

export const ConfigContext = React.createContext(config);
