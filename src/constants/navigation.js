import { FaHome } from "react-icons/fa";
import { PiTelevisionFill } from "react-icons/pi";
import { BiSolidMoviePlay } from "react-icons/bi";
import { IoSearch } from "react-icons/io5";

export const navigation = [
    {
        label: "Movies",
        href: "movie",
        icon: <BiSolidMoviePlay />
    },
    {
        label: "TV Shows",
        href: "tv",
        icon: <PiTelevisionFill />
    }
];


export const mobileNavigation = [
    {
        label : "Home",
        href : "/",
        icon  : <FaHome/>
    },
    ...navigation,
    {
        label: "Search",
        href: "/search",
        icon: <IoSearch/>
    }
]
