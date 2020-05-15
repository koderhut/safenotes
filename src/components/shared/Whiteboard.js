import React, {Fragment} from "react";

const Whiteboard = (props) => {
    let {content} = props;

    if (props.children !== undefined) {
        content = props.children;
    }

    if (typeof content === "string") {
        content = content.split("\n").map((item, key) => {
            return <Fragment key={key}>{item}<br/></Fragment>;
        });

        content = (<p className="container bg-white-100 mx-auto">{content}</p>);
    }

    return (
        <div className="bg-white w-full xmd:w-5/6 xlg:w-4/6 mx-auto flex flex-col text-gray-700 min-h-10">
            {content}
        </div>
    );
};

Whiteboard.defaultProps = {
    content: "",
};

export default Whiteboard;
