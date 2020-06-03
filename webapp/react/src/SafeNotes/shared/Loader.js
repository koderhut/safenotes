import React from "react";

const Loader = ({message}) => {
    return (
        <div
            className="text-xl text-center border py-4 w-full sm:xw-8/12 md:w-10/12 lg:w-8/12 m-10 bg-white font-bold text-gray-500 mx-auto"
        >{message}</div>
    );
};

export default Loader;
