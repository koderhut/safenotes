import CryptoJS                        from 'crypto-js'
import React, { useContext, useState } from 'react'
import { ConfigContext }               from '../context/Config'
import ModalMessage                    from '../shared/ModalMessage'
import ContentInput                    from './ContentInput'
import Passphrase                      from './Passphrase'

const EncryptedForm = () => {
    const notesForm = {
        content:    '',
        passphrase: '',
    }
    const [noteId, setNoteId] = useState('')
    const [encryptedForm, updateEncryptedForm] = useState(notesForm)
    const appCfg = useContext(ConfigContext)
    const storage = appCfg.storage

    const updateForm = (data) => {
        updateEncryptedForm({
            ...encryptedForm,
            [data.name]: data.value,
        })
    }

    const resetForm = () => {
        updateEncryptedForm(notesForm)
        setNoteId('')
    }

    const submitForm = (e) => {
        e.preventDefault()
        if ('' === encryptedForm.content || encryptedForm.content.length === 0) {
            console.log('no content')
            return
        }

        if ('' === encryptedForm.passphrase) {
            console.log('no passphrase')
            return
        }

        storage.store({
            'content': CryptoJS.AES.encrypt(encryptedForm.content, encryptedForm.passphrase).toString(),
        }).then(function (response) {
            setNoteId(response.data['note-id'])
        }).catch(function (err) {
            console.log(err)
        })
    }

    const generateLink = () => {
        return appCfg.web.domain + '/view-note/' + noteId
    }

    return (
        <div className="flex flex-col items-center w-full bg-white mt-5 shadow-sm">
            <form className="flex flex-col w-full" onSubmit={submitForm} action="#">
                <div className="flex flex-col p-2">
                    <ContentInput name="content" form={encryptedForm} onChange={updateForm} />

                    <Passphrase name="passphrase" form={encryptedForm} onChange={updateForm} />
                </div>

                <div className="bottom flex bg-gray-200 justify-end px-4">
                    <input type="submit"
                           className="my-2 p-2 bg-gray-200 hover:bg-blue-700 hover:text-white text-gray-600 border-gray-500 rounded border-2 font-extrabold w-8/12 lg:w-4/12"
                           value="Send"
                    />
                </div>
                {noteId !== '' ? (
                    <ModalMessage reset={resetForm}>
                        <h3 className="text-3xl text-gray-500 font-bold">Success!</h3>
                        <hr className="bg-gray-700 mb-4" />
                        <p className="text-lg lg:text-xl text-gray-600 pb-4">You can copy the link below and send it to the recipient:</p>
                        <p className="text-lg text-blue-500 underline">{generateLink()}</p>
                    </ModalMessage>
                ) : null}
            </form>
        </div>
    )
}

export default EncryptedForm
