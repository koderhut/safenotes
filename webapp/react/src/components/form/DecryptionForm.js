import CryptoJS            from 'crypto-js'
import React, { useState } from 'react'

const DecryptionForm = (props) => {
    const [passphrase, setPassphrase] = useState('')

    function decrypt () {
        if (passphrase === '') {
            return
        }

        props.onDecryptionSuccess(
            CryptoJS.AES.decrypt(props.encrypted, passphrase).toString(CryptoJS.enc.Utf8),
        )
    }

    return (
        <div className="mx-auto flex flex-col text-gray-700 w-full py-2 pt-8">
            <p className="bg-white-200 mx-auto text-xl lg:text-2xl text-center font-extrabold text-gray-400">Please enter your passphrase to decrypt the note</p>
            <div className="flex flex-col sm:flex-row w-full sm:w-5/6 lg:w-4/6 xs:border-0 border border-sm mx-auto my-4">
               <input
                   className="p-2 w-12/12 sm:w-9/12"
                   type="password"
                   placeholder="Encryption Passphrase"
                   name="passphrase"
                   onChange={(e) => setPassphrase(e.target.value)}
                   value={passphrase}
               />
               <input
                   className="p-2 w-12/12 sm:w-3/12 sm:mt-0 mt-2 bg-blue-500 hover:bg-blue-700 text-white font-extrabold"
                   type="button"
                   onClick={decrypt}
                   value="Unlock Note"
               />
            </div>
        </div>
    )
}

export default DecryptionForm
