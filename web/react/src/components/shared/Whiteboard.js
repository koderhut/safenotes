import React from 'react'

const Whiteboard = (props) => {
    let content = ''
    if (props.hasChildNodes) {
        content = props.children
    } else {
        content = props.content
    }

    return (
        <div className="bg-white w-full md:w-5/6 lg:w-4/6 mt-10 mb-5 mx-auto flex flex-col shadow-sm text-gray-700 border border-sm p-2 min-h-10">
            <p className="container bg-white-100 mx-auto">{content}</p>
        </div>
    )
}

export default Whiteboard
