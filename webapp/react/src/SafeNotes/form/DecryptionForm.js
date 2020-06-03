import CryptoJS from "crypto-js";
import React, {useState} from "react";

const DecryptionForm = (props) => {
    const {encrypted, onDecryptionSuccess} = props;
    const [passphrase, setPassphrase]      = useState("");

    function decrypt() {
        if (passphrase === "") {
            return;
        }

        onDecryptionSuccess(CryptoJS.AES.decrypt(encrypted, passphrase).toString(CryptoJS.enc.Utf8));
    }

    return (
        <div className="mx-auto flex flex-col text-gray-700 w-full py-2 pt-8">
            <p className="bg-white-200 mx-auto text-xl lg:text-2xl text-center font-extrabold text-gray-400">The note requires a passphrase to unlock:</p>
            <div className="flex flex-col">
                <input
                    className="p-2 mx-auto mb-4 shadow-sm border w-full md:w-8/12"
                    type="password"
                    placeholder="Unlock Passphrase"
                    name="passphrase"
                    onChange={(e) => setPassphrase(e.target.value)}
                    value={passphrase}
                />
                <input
                    className="p-2 bg-blue-500 hover:bg-blue-700 text-white font-extrabold border mx-auto w-full md:w-1/3"
                    type="button"
                    onClick={decrypt}
                    value="Unlock Note"
                />
            </div>
        </div>
    );
};

export default DecryptionForm;
