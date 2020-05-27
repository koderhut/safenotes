import React, {useState} from "react";

const ExpireTimeframe = ({options, selected, onChange}) => {
    // const [selected, setSelected] = useState();

    const opts = options.map((opt, index) => {
        return <option key={index} value={opt.value}>{opt.label}</option>;
    });

    return (
        <>
            <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-1 mt-2"><span className="hidden sm:inline">Automatically</span> expire after:</label>
            <div className="relative">
                <select
                    className="w-full block appearance-none text-gray-600 bg-gray-100 border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded hover:shadow leading-tight focus:outline-none focus:shadow-outline"
                    onChange={(e) => onChange(e.target)}
                    value={selected}
                    name="autoExpire"
                >
                    {opts}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                    </svg>
                </div>
            </div>
        </>
    );
};

ExpireTimeframe.defaultProps = {
    options: [],
}

export default ExpireTimeframe;
