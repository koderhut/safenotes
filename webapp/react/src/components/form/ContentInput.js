import React from 'react'

const ContentInput = (props) => {
    return (
        <div className="flex flex-col pt-2">
            <textarea
                id="content"
                name={props.name}
                className="shadow-sm rounded-xs bg-gray-100 text-gray-700 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                rows="10"
                placeholder="Sensitive Content"
                required
                onChange={(e) => props.onChange(e.target)}
                value={props.form.content}
            />
        </div>
    )
}

export default ContentInput
