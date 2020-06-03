import React from "react";
import CopyToClipboard from "react-copy-to-clipboard";

import ModalMessage from "../../components/shared/ModalMessage";

const SendSuccess = (props) => {
    const {closeHandler, link} = props;

    return (
        <ModalMessage reset={closeHandler}>
            <h3 className="text-xl text-gray-500 font-bold">Success!</h3>
            <hr className="bg-gray-700 mb-4"/>
            <div className={"content flex flex-wrap"}>
                <span className={"icon w-2/12 md:w-1/12"}>
                <svg version="1.1" id="" xmlns="http://www.w3.org/2000/svg"
                     x="0px" y="0px"
                     viewBox="0 0 455.431 455.431" style={{enableBackground: "new 0 0 455.431 455.431"}}
                     className={"w-full"}
                >
                    <path style={{fill: "rgb(43, 108, 176, 0.8)"}} d="M405.493,412.764c-69.689,56.889-287.289,56.889-355.556,0c-69.689-56.889-62.578-300.089,0-364.089 s292.978-64,355.556,0S475.182,355.876,405.493,412.764z"/>
                    <g style={{opacity: "0.2"}}>
                        <path style={{fill: "#FFFFFF"}} d="M229.138,313.209c-62.578,49.778-132.267,75.378-197.689,76.8 c-48.356-82.489-38.4-283.022,18.489-341.333c51.2-52.622,211.911-62.578,304.356-29.867 C377.049,112.676,330.116,232.142,229.138,313.209z"/>
                    </g>
                    <path style={{fill: "#FFFFFF"}} d="M195.004,354.453c-9.956,0-19.911-4.267-25.6-12.8l-79.644-102.4 c-11.378-14.222-8.533-34.133,5.689-45.511s34.133-8.533,45.511,5.689l54.044,69.689l119.467-155.022 c11.378-14.222,31.289-17.067,45.511-5.689s17.067,31.289,5.689,45.511L220.604,341.653 C213.493,348.764,204.96,354.453,195.004,354.453z"/>
                    </svg>
                </span>
                <div className={"message w-10/12 p-3"}>
                    <p className="text-sm sm:text-base lg:text-lg text-gray-600">We've generated a link to your note:</p>
                    <p className="text-sm sm:text-base text-blue-500 underline">{link}</p>
                </div>
            </div>
            <div className={"flex flex-col sm:flex-row w-full"}>
                <CopyToClipboard text={link}>
                    <button className={"my-4 mx-auto sm: w-1/2 sm:w-1/3 p-2 bg-gray-200 hover:bg-blue-700 hover:text-white text-gray-600 border-gray-500 rounded border-2 font-extrabold w-3/4 capitalize"}
                    >Copy to clipboard
                    </button>
                </CopyToClipboard>
                <button className={"my-4 mx-auto w-1/2 sm:w-1/3 p-2 bg-gray-200 hover:bg-blue-700 hover:text-white text-gray-600 border-gray-500 rounded border-2 font-extrabold w-3/4 capitalize"}
                        onClick={closeHandler}
                >Prepare a new note
                </button>
            </div>
        </ModalMessage>
    );
};

SendSuccess.defaultProps = {
    closeHandler: () => {
    },
    link:         ""
};

export default SendSuccess;
