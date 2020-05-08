import React, { useContext, useEffect, useState } from 'react'
import { ConfigContext } from '../components/context/Config'
import DecryptionForm    from '../components/form/DecryptionForm'
import Loader            from '../components/shared/Loader'
import ModalMessage      from '../components/shared/ModalMessage'
import PinnedMessage     from '../components/shared/PinnedMessage'
import Whiteboard        from '../components/shared/Whiteboard'

const ViewNote = (props) => {
    const appCfg = useContext(ConfigContext)
    const [view, updateDisplay] = useState(<Loader message="Fetching note..." />)

    useEffect(() => {
        appCfg.storage
        .fetch(props.match.params.noteId)
        .then(function (res) {
            updateDisplay(<DecryptionForm encrypted={res.data['content']} onDecryptionSuccess={onDecryptedNote} />)
        })
        .catch(function (err) {
            console.log(err)
            updateDisplay(
                <ModalMessage>
                    <p className="text-sm">We were unable to fetch our note. Either it has been opened already or the ID is incorrect.</p>
                    <a href="/"><button className="my-2 p-2 bg-gray-200 hover:bg-blue-700 hover:text-white text-gray-600 border-gray-500 rounded border-2 font-extrabold w-8/12 lg:w-4/12">Create A Note</button></a>
                </ModalMessage>
            )
        })
    }, [props.match.params.noteId, appCfg.storage])

    function onDecryptedNote (content) {
        updateDisplay(<Whiteboard content={content} />)
    }

    return (
        <div id="wrapper" className="homepage flex flex-col mx-2 ">
            {view}

            <PinnedMessage>
                <div className="flex flex-col">
                    <p className="font-bold">WARNING!</p>
                    <p className="text-sm">Please make sure you save this info somewhere safe before leaving or reloading the page.
                        <br /> Your secret has been <strong>DELETED</strong> from our storage and cannot be recovered!
                    </p>
                </div>
            </PinnedMessage>

        </div>
    )
}

export default ViewNote
