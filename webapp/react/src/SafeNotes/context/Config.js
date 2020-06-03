import React from "react";

// here we store default values that do not change across envs
// IMPORTANT: first level vars will be overridden and NOT merged
export const config = {};

export const ConfigContext = React.createContext(config);
