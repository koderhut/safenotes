import React from "react";
import PropTypes from "prop-types";

const Label = ({classNames, text, labelFor}) => {
    return (
        <label htmlFor={labelFor} className={classNames.join(' ')}>{text}</label>
    );
};

Label.propTypes = {
    classNames: PropTypes.array,
    text: PropTypes.string.isRequired,
    labelFor: PropTypes.string,
}

Label.defaultProps = {
    classNames: [],
    text: "",
    labelFor: "",
}

export default Label;
