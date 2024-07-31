import {GiHamburgerMenu} from "react-icons/gi";
import {IoSettingsSharp} from "react-icons/io5";

// Todo:
//  Make this more dynamic and import the svgs?
const Header = () => {
    return (
        <>
            <div id="header" className="flex flex-row h-14 border-b-2 border-gray-400">
                {/* Sidebar menu button */}
                <GiHamburgerMenu className="flex-none fill-black w-10 h-10 ml-2 my-auto"/>

                {/* Settings options */}
                <IoSettingsSharp className="flex-none fill-black w-10 h-10 ml-auto mr-2 my-auto"/>

                {/* "User icon" only really used for fun stuff :) */}
                <img alt="user profile" title="Klick for the funnies :)" src="../../../public/goose_funnies.jpeg"
                     className="flex-none w-10 h-10 rounded-full my-auto mr-2"

                />
            </div>
        </>
    );
}

export default Header;