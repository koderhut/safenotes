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
        <>
            <input id="passphrase"
                   placeholder="Passphrase"
                   type="password"
                   className="mx-auto my-2 p-2 border-b-2 rounded shadow-sm w-11/12 lg:w-6/12"
                   required
                   value={passphrase}
                   onChange={(e) => setPassword(e.target.value)}
                   onBlur={validatePassphrase}
                   onFocus={clearDirtyState}
            />
            <input id="confirmPassphrase"
                   placeholder="Confirm Passphrase"
                   type="password"
                   className="mx-auto my-2 p-2 border-b-2 rounded shadow-sm w-11/12 lg:w-6/12"
                   required
                   value={confirmPassphrase}
                   onChange={(e) => setConfirmPassword(e.target.value)}
                   onBlur={validatePassphrase}
                   onFocus={clearDirtyState}
            />
        </>
    )
}

export default Passphrase
