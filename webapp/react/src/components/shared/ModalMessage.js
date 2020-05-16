import React from "react";
import ReactDOM from "react-dom";

const ModalMessage = (props) => {
    const {rootEl, reset, children} = props;

    const modalRoot = rootEl || document.getElementById("modal-message-root");

    return ReactDOM.createPortal(
        <div className="fixed pin flex items-center justify-center bg-semi-75">
            <div className="bg-white mx-auto w-11/12 lg:w-6/12 border shadow-sm relative p-3 rounded-sm">
                <span className="absolute top-0 right-0 p-2">
                    <svg className="h-6 w-6 fill-current text-grey hover:text-grey-darkest" role="button" onClick={reset} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <title>Close</title>
                        <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/>
                    </svg>
                </span>

                {children}
            </div>
        </div>,
        modalRoot,
    );
};

export default ModalMessage;
