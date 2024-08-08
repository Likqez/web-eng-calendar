// oshea-02.08.2024: Hamburger, cheeseburger, bigmac, whopper
import {IoSettingsSharp} from "react-icons/io5";

interface HeaderProp {
    onProfileClick: () => void;
}

const Header = (props: HeaderProp) => {
    return (
        <>
            <div id="header" className="flex flex-row h-14 border-b-2 border-gray-400 min-w-72">
                {/* Settings options */}
                <IoSettingsSharp className="flex-none fill-black py-2 w-fit h-full ml-auto mr-2 my-auto"/>

                {/* "User icon" only really used for fun stuff :) */}
                <img alt="user profile" title="Click for the funnies :)" src="/goose_funnies.jpeg"
                     className="flex-none w-10 h-10 rounded-full mr-2 my-2 z-50"
                    onClick={props.onProfileClick}
                />
            </div>
        </>
    );
}

export default Header;