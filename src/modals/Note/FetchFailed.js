import React from "react";
import ModalMessage from "../../components/shared/ModalMessage";

const FetchFailed = (props) => {
    const {closeHandler} = props;

    return (
        <ModalMessage reset={closeHandler}>
            <h3 className="text-xl text-gray-500 font-bold">Failure!</h3>
            <hr className="bg-gray-700 mb-4"/>
            <div className={"content flex flex-wrap"}>
                <span className={"icon w-2/12 md:w-1/12"}>
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                         viewBox="0 0 455.431 455.431" style={{enableBackground: "new 0 0 455.431 455.431"}}>
                        <path style={{fill: "#ff0000"}} d="M405.493,412.764c-69.689,56.889-287.289,56.889-355.556,0c-69.689-56.889-62.578-300.089,0-364.089
                            s292.978-64,355.556,0S475.182,355.876,405.493,412.764z"/>
                        <g style={{opacity: "0.2"}}>
                            <path style={{fill: "#FFFFFF"}} d="M229.138,313.209c-62.578,49.778-132.267,75.378-197.689,76.8
                                c-48.356-82.489-38.4-283.022,18.489-341.333c51.2-52.622,211.911-62.578,304.356-29.867
                                C377.049,112.676,330.116,232.142,229.138,313.209z"/>
                        </g>
                        <path style={{fill: "#FFFFFF"}} d="M335.804,335.964c-8.533,8.533-22.756,8.533-32.711,0l-75.378-75.378l-75.378,75.378
                            c-8.533,8.533-24.178,8.533-32.711,0c-8.533-8.533-8.533-24.178,0-32.711l76.8-75.378l-76.8-75.378
                            c-8.533-8.533-8.533-22.756,0-32.711c8.533-8.533,24.178-8.533,32.711,0l75.378,76.8l75.378-76.8c8.533-8.533,22.756-8.533,32.711,0
                            c8.533,8.533,8.533,24.178,0,32.711l-75.378,75.378l75.378,75.378C345.76,313.209,345.76,327.431,335.804,335.964z"/>
                    </svg>
                </span>
                <div className={"message w-10/12 p-3"}>
                    <p className="text-sm sm:text-base lg:text-lg text-gray-600">We were unable to fetch our note. Either it has been opened already or the ID is incorrect.</p>
                </div>
            </div>
            <div className={"flex flex-col w-full"}>
                <button className={"my-4 mx-auto w-full sm:w-1/2 p-2 bg-gray-200 hover:bg-blue-700 hover:text-white text-gray-600 border-gray-500 rounded border-2 font-extrabold w-3/4 capitalize"}
                        onClick={closeHandler}
                >Prepare a new note
                </button>
            </div>
        </ModalMessage>
    );
};

FetchFailed.defaultProps = {
    closeHandler: () => {
    },
    link:         ""
};
export default FetchFailed;
