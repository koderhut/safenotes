import React, {useContext, useEffect, useState} from 'react'
import {useHistory}                             from "react-router-dom";
import {ConfigContext}                          from '../components/context/Config'
import DecryptionForm                           from '../components/form/DecryptionForm'
import Loader                                   from '../components/shared/Loader'
import PinnedMessage                            from '../components/shared/PinnedMessage'
import Whiteboard                               from '../components/shared/Whiteboard'
import FetchFailed                              from "../modals/Note/FetchFailed";

const ViewNote = (props) => {
    const appCfg                = useContext(ConfigContext)
    const [view, updateDisplay] = useState(<Loader message="Fetching note..."/>)
    const router                = useHistory();

    useEffect(() => {
        appCfg.storage
            .fetch(props.match.params.noteId)
            .then(function (res) {
                updateDisplay(<DecryptionForm encrypted={res.data['content']} onDecryptionSuccess={onDecryptedNote}/>)
            })
            .catch(function (err) {
                console.log(err)
                updateDisplay(<FetchFailed closeHandler={() => router.push("/")}/>)
            })
    }, [props.match.params.noteId, appCfg.storage, router])

    function onDecryptedNote(content) {
        updateDisplay(<Whiteboard content={content}/>)
    }

    return (
        <div id="wrapper" className="homepage flex flex-col mx-2 ">
            {view}

            <PinnedMessage>
                <div className="flex flex-col">
                    <p className="font-bold">WARNING!</p>
                    <p className="text-sm">Please make sure you save this info somewhere safe before leaving or
                        reloading the page.
                        <br/> Your secret has been <strong>DELETED</strong> from our storage and cannot be recovered!
                    </p>
                </div>
            </PinnedMessage>

        </div>
    )
}

export default ViewNote
