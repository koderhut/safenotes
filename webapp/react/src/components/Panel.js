import React, {useEffect, useState} from 'react';

const Panel = (props) => {
    const openButton = <div
        className={"open pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"}>
        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
        </svg>
    </div>;
    const closeButton = <div
        className={"closed pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"}>
        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path
                d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/>
        </svg>
    </div>;
    const styles = "flex flex-col my-2 " + props.stylesClass;

    const [openPanel, updatePanelView] = useState(props.closable ? props.openPanel : true);
    const [activeButton, updateActiveButton] = useState(<></>);
    const [panelViewClass, updatePanelViewClass] = useState(openPanel === true ? "open-panel" : "closed-panel");

    const updatePanel = () => {
        if (!props.closable) return;

        updatePanelView(!openPanel);
    }

    useEffect(() => {
        if (true === props.closable) {
            updateActiveButton(openPanel ? closeButton : openButton);
            updatePanelViewClass(openPanel ? "open-panel" : "closed-panel");
        }
    }, [openPanel, closeButton, openButton, props.closable])

    // we don't display the panel if there are no children
    if (props.children === undefined) {
        return null;
    }

    return (
        <>
            <div className={styles}>
                <div
                    className={"text-base text-blue-400 font-bold pl-2 border border-gray-200 shadow-sm rounded-sm relative"}
                    onClick={() => updatePanel()}>
                    <span>{props.title}</span>
                    {activeButton}
                </div>
                <div id={"panel-view"} className={panelViewClass}>
                    {props.children}
                </div>
            </div>
        </>
    );
};

Panel.defaultProps = {
    openPanel: true,
    closable: false,
    stylesClass: '',
}

export default Panel;