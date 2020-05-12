import React from 'react'

import EncryptedForm from '../components/form/EncryptedForm'
import PinnedMessage from '../components/shared/PinnedMessage'

const Home = () => {

    return (
        <div id="wrapper" className="homepage flex flex-col mx-2 ">
            <div className="w-full md:w-10/12 lg:w-8/12 mx-auto shadow-lg">
                <EncryptedForm storageUrl="http://localhost:44666/api/notes" />
            </div>

            <PinnedMessage>
                <div className="flex flex-col ">
                    <p className="text-sm sm:text-lg md:text-lg lg:text-lg font-bold">NOTHING is 100% secure.</p>
                    <p className="text-xs sm:text-sm md:text-base lg:text-base">We strive to take care of your data by only storing it memory and deleting it after it has been viewed once!</p>
                </div>
            </PinnedMessage>

        </div>
    )
}

export default Home
