import React, {useContext, useEffect, useState} from "react";
import {useHistory, useParams} from "react-router-dom";

import {ConfigContext} from "../components/context/Config";
import DecryptionForm from "../components/form/DecryptionForm";
import Loader from "../components/shared/Loader";
import PinnedMessage from "../components/shared/PinnedMessage";
import Whiteboard from '../components/Whiteboard/Whiteboard';

import FetchFailed from "../modals/Note/FetchFailed";
import ContentInput from "../components/form/ContentInput";
import Quote from '../SafeNotes/ui/Quote/Quote';


const ViewNote = () => {
    const {noteId}                         = useParams();
    const router                           = useHistory();
    const {storage}                        = useContext(ConfigContext);
    const [errFetch, setFetchedError]      = useState(false);
    const [lockedNote, setLockedNote]      = useState("");
    const [unlockedNote, setUnlockedNote]  = useState("");

    useEffect(() => {
        storage
            .fetch(noteId)
            .then(function (res) {
                setLockedNote(res.data['content']);
            })
            .catch(function (err) {
                console.log(err);
                setFetchedError(err);
            });
    }, [noteId, storage]);

    const onNoteUnlocked = (content) => {
        if (content === "") {
            setUnlockedNote("Empty Note Contents Or The Passphrase Was Wrong!");
            return;
        }

        setUnlockedNote(content);
    };

    const updateDisplay = () => {
        if (unlockedNote !== "") {
            return (
                <Whiteboard wrapCss={['bg-white w-full xmd:w-5/6 xlg:w-4/6 mx-auto flex flex-col text-gray-700 min-h-10']}>
                    <ContentInput content={unlockedNote} readonly={true} />
                </Whiteboard>
            );
        }

        if (lockedNote !== "" && !errFetch) {
            return (<DecryptionForm encrypted={lockedNote} onDecryptionSuccess={onNoteUnlocked}/>);

        }
        if (errFetch !== false) {
            return (<FetchFailed closeHandler={() => router.push("/")}/>);
        }

        return null;
    };

    const loader = () => {
        return lockedNote === "" && !errFetch ? <Loader message="Fetching note..."/> : null;
    };

    return (
        <div id="wrapper" className="viewnote flex flex-col mx-2">
            <Quote />
            {loader()}
            <div className="flex flex-col w-full md:w-4/6 mx-auto border border-gray-200 shadow-sm px-2 my-4">
                <p className="text-xl text-gray-500 capitalize tracking-wide py-1 font-bold">Note contents</p>
                <hr className="pb-2" />
                <div className="flex flex-col min-h-10">
                    {updateDisplay()}
                </div>
            </div>

            <PinnedMessage>
                <div className="flex flex-col">
                    <p className="font-bold">WARNING!</p>
                    <p className="text-sm">Please make sure you save this note in a safe place before leaving or reloading the page.
                        <br/> Your secret has been <strong>DELETED</strong> from the storage and cannot be recovered!
                    </p>
                </div>
            </PinnedMessage>
        </div>
    );
};

export default ViewNote;
