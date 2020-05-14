import CryptoJS                      from 'crypto-js'
import React, {useContext, useState} from 'react'
import {ConfigContext}               from '../context/Config'
import ContentInput                  from './ContentInput'
import Passphrase                    from './Passphrase'
import ExpireTimeframe               from "./ExpireTimeframe";
import Panel                         from "../Panel";
import SendSuccess                   from "../../modals/Note/SendSuccess";

const EncryptedForm = (props) => {
    const notesForm                            = {
        content:    '',
        passphrase: '',
    }
    const [noteId, setNoteId]                  = useState('')
    const [encryptedForm, updateEncryptedForm] = useState(notesForm)
    const appCfg                               = useContext(ConfigContext)
    const storage                              = appCfg.storage

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
        <div className="flex flex-col items-center w-full bg-white mt-5">
            <form className="flex flex-col w-full" onSubmit={submitForm} action="#">
                <div className="flex flex-col">
                    <Panel title={"Add Your Sensitive Content"}>
                        <ContentInput name="content" form={encryptedForm} onChange={updateForm}/>
                    </Panel>

                    <Panel title={"Privacy"} stylesClass={"my-6"}>
                        <Passphrase name="passphrase" form={encryptedForm} onChange={updateForm}/>

                        {/*<ExpireTimeframe options={appCfg.app.timeframe} />*/}
                    </Panel>
                </div>

                <div className="bottom flex bg-gray-200 justify-end px-3 rounded">
                    <input type="submit"
                           className="my-2 p-2 bg-gray-200 hover:bg-blue-700 hover:text-white hover:border-gray-400 text-gray-600 border-gray-500 rounded border-2 font-bold w-8/12 lg:w-4/12"
                           value="Send"
                    />
                </div>

                {noteId !== '' ? <SendSuccess closeHandler={resetForm} link={generateLink()}/> : null}
            </form>
        </div>
    )
}

export default EncryptedForm
