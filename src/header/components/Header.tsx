// oshea-02.08.2024: Hamburger, cheeseburger, bigmac, whopper
import {GiHamburgerMenu} from "react-icons/gi";
import {IoSettingsSharp} from "react-icons/io5";

const Header = () => {
    return (
        <>
            <div id="header" className="flex flex-row h-14 border-b-2 border-gray-400 min-w-72">
                {/* Sidebar menu button */}
                <button id="menu_button">
                    <GiHamburgerMenu className="flex-none fill-black py-2 w-fit h-full ml-2 my-auto"/>
                </button>

                {/* Settings options */}
                <IoSettingsSharp className="flex-none fill-black py-2 w-fit h-full ml-auto mr-2 my-auto"/>

                {/* "User icon" only really used for fun stuff :) */}
                <img alt="user profile" title="Click for the funnies :)" src="/goose_funnies.jpeg"
                     className="flex-none w-10 h-10 rounded-full mr-2 my-2"

                />
            </div>
        </>
    );
}

export default Header;