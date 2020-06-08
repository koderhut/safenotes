import React from "react";

const ContentInput = ({name, placeHolder, readonly, disabled, onChange, content, styles}) => {
    const style = "w-full text-gray-700 leading-tight focus:outline-none " + styles;

    return (
        <>
            <textarea
                id="content"
                name={name}
                className={style}
                rows="10"
                placeholder={placeHolder}
                required
                readOnly={readonly}
                disabled={disabled}
                onChange={(e) => onChange(e.target)}
                value={content}
            />
        </>
    );
};

ContentInput.defaultProps = {
    name:        "content-input",
    placeHolder: "",
    readonly:    false,
    disabled:    false,
    onChange:    () => {
    },
    content:     "",
    styles: "",
};

export default ContentInput;
