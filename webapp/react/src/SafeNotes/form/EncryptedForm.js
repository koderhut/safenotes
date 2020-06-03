import CryptoJS from "crypto-js";
import React, {useContext, useState} from "react";

import {ConfigContext} from "../context/Config";
import Panel from '../Panel/Panel';
import ContentInput from "./ContentInput";
import Passphrase from "./Passphrase";
import ExpireTimeframe from "./ExpireTimeframe";

import SendSuccess from "../../modals/Note/SendSuccess";

const EncryptedForm = () => {
    const notesForm = {
        content:    "",
        passphrase: "",
        autoExpire: "on-read",
    };

    const [noteId, setNoteId]                  = useState("");
    const [encryptedForm, updateEncryptedForm] = useState(notesForm);
    const {web: webCfg, storage}               = useContext(ConfigContext);

    const updateForm = (data) => {
        console.log(data.name, data.value, data);
        updateEncryptedForm({
            ...encryptedForm,
            [data.name]: data.value,
        });
    };

    const resetForm = () => {
        updateEncryptedForm(notesForm);
        setNoteId("");
    };

    const submitForm = (e) => {
        e.preventDefault();
        if (("" === encryptedForm.content || encryptedForm.content.length === 0) || "" === encryptedForm.passphrase) {
            return;
        }

        storage.store({
            "content": CryptoJS.AES.encrypt(encryptedForm.content, encryptedForm.passphrase).toString(),
            "auto-expire": encryptedForm.autoExpire,
        }).then(function (response) {
            setNoteId(response.data["note-id"]);
        }).catch(function (err) {
            console.log(err);
        });
    };

    const generateLink = () => {
        return webCfg.domain + "/view-note/" + noteId;
    };

    return (
        <div className="w-full bg-white mt-5">
            <form className="w-full" onSubmit={submitForm} action="#">
                <div className="flex flex-col">
                    <Panel title={"Add Your Sensitive Content"} closable={true} wrapCss={['my-2']} titleBarCss={['text-base text-blue-400 font-bold pl-2 border border-gray-200 shadow-sm rounded-sm relative p-2']}>
                        <ContentInput
                            name="content"
                            content={encryptedForm.content}
                            onChange={updateForm}
                            styles="shadow-sm border border-gray-300 focus:border-gray-500 rounded rounded-xs py-3 px-4 mt-2 bg-gray-100 focus:bg-white"
                        />
                    </Panel>

                    <Panel title={"Privacy"} stylesClass={"my-6"} wrapCss={['my-2']} titleBarCss={['text-base text-blue-400 font-bold pl-2 border border-gray-200 shadow-sm rounded-sm relative p-2']}>
                        <Passphrase name="passphrase" form={encryptedForm} onChange={updateForm}/>

                        <ExpireTimeframe options={webCfg.expirationOptions} selected={encryptedForm.autoExpire} onChange={updateForm}/>
                    </Panel>
                </div>

                <div className="bottom flex bg-gray-200 justify-end px-3 rounded">
                    <input type="submit"
                           className="my-2 p-2 bg-gray-200 hover:bg-blue-700 hover:text-white hover:border-gray-400 text-gray-600 border-gray-500 rounded border-2 font-bold w-8/12 lg:w-4/12"
                           value="Send"
                    />
                </div>

                {noteId !== "" ? <SendSuccess closeHandler={resetForm} link={generateLink()}/> : null}
            </form>
        </div>
    );
};

export default EncryptedForm;
