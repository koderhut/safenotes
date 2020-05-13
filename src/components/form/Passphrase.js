import React, { useState } from 'react'

const Passphrase = (props) => {
    const [passphrase, setPassword] = useState('')
    const [confirmPassphrase, setConfirmPassword] = useState('')

    const clearDirtyState = (e) => {
        document.getElementById('passphrase').classList.remove('wrong-value')
        document.getElementById('confirmPassphrase').classList.remove('wrong-value')
    }

    const validatePassphrase = (e) => {
        if (0 === passphrase.length || 0 === confirmPassphrase.length) {
            return
        }

        if (passphrase !== confirmPassphrase) {
            document.getElementById('passphrase').classList.add('wrong-value')
            document.getElementById('confirmPassphrase').classList.add('wrong-value')
            return
        }

        props.onChange({ name: props.name, value: passphrase })
    }

    return (
        <div className="flex flex-col sm:flex-row">
            <div className="w-full sm:w-1/2 sm:mr-1">
                <label className="w-full block uppercase tracking-wide text-gray-500 text-xs font-bold mb-1 mt-2">Passphrase:</label>
                <input id="passphrase"
                       placeholder="Passphrase"
                       type="password"
                       className="my-1 shadow-sm rounded-md bg-gray-100 text-gray-700 border border-gray-300 rounded py-2 px-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 w-full"
                       required
                       value={passphrase}
                       onChange={(e) => setPassword(e.target.value)}
                       onBlur={validatePassphrase}
                       onFocus={clearDirtyState}
                />
            </div>

            <div className="w-full sm:w-1/2 sm:ml-1">
            <label className="w-full block uppercase tracking-wide text-gray-500 text-xs font-bold mb-1 mt-2">Confirm Passphrase:</label>
            <input id="confirmPassphrase"
                   placeholder="Confirm Passphrase"
                   type="password"
                   className="xmx-auto my-1 shadow-sm rounded-md bg-gray-100 text-gray-700 border border-gray-300 rounded py-2 px-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 w-full"
                   required
                   value={confirmPassphrase}
                   onChange={(e) => setConfirmPassword(e.target.value)}
                   onBlur={validatePassphrase}
                   onFocus={clearDirtyState}
            />
            </div>
        </div>
    )
}

export default Passphrase
