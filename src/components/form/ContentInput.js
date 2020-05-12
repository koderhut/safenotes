import React from 'react'

const ContentInput = (props) => {
    return (
        <div className="flex flex-col p-2">
            <label className="text-xl text-gray-500 font-bold mt-2">Sensitive Content</label>
            <textarea
                id="content"
                name={props.name}
                className="my-2 p-2 border-t-2 border-b-2 border-blue-500 rounded shadow-sm min-h-10"
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
