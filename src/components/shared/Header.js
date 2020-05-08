import * as React from 'react'

function Header () {
    return (
        <header className="flex flex-col">
        <div className="flex flex-col mx-auto xsm:w-8/12 md:w-10/12 lg:w-8/12">
            <a href="/" className="flex">
                <h1 className="text-3xl text-left font-extrabold pt-2 text-blue-500">safe</h1>
                <h1 className="text-3xl text-left pt-2 font-extrabold text-gray-500">notes</h1>
            </a>
            <div className="text-sm text-gray-500 italic pl-10 -mt-3 mb-1">by koderhut.eu</div>
        </div>
    </header>
    )
}

export default Header
