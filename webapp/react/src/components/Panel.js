import React, {useState} from "react";

import CloseIcon from "./ui/fragments/CloseIcon";
import OpenIcon from "./ui/fragments/OpenIcon";

const Panel = (props) => {
    const {closable, openPanel, title, stylesClass} = props;
    const [isOpen, updateIsOpen] = useState(closable ? openPanel : true);
    const styles = "flex flex-col my-2 " + stylesClass;
    const panelViewClass = (isOpen ? "open-panel" : "closed-panel");

    // we don't display the panel if there are no children
    if (props.children === undefined) {
        return null;
    }

    const updatePanel = () => {
        if (!closable) {
            return;
        }

        updateIsOpen(!isOpen);
    };

    const activeButton = () => {
        if (!closable) {
            return <></>;
        }

        if (isOpen) {
            return <CloseIcon />;
        }

        return <OpenIcon />;
    }

    return (
        <>
            <div className={styles}>
                <div
                    className="text-base text-blue-400 font-bold pl-2 border border-gray-200 shadow-sm rounded-sm relative p-2"
                    onClick={updatePanel}
                >
                    <span>{title}</span>

                    {activeButton()}

                </div>
                <div id="panel-view" className={panelViewClass}>
                    {props.children}
                </div>
            </div>
        </>
    );
};

Panel.defaultProps = {
    openPanel:   true,
    closable:    false,
    stylesClass: "",
};

export default Panel;