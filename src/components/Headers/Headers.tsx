// import { MdMenu, MdClose } from "react-icons/md";
import "./Headers.scss";
import { NavLink } from "react-router";



function Headers() {

    return (
        <>
            <nav className='header'>
                <div className="wrapper">
                    <div className="left">
                        <NavLink className="logo" to={"/"}>
                            <span className="f">F</span>
                            <span className="h">H</span>
                        </NavLink>
                    </div>

                    <div className="center">
                        <ul>
                            <li className="toContact">
                                <NavLink to="/contact">
                                    CONTACT
                                </NavLink>
                            </li>
                            <li>/</li>
                            <li>FR</li>
                            <li>/</li>
                            <li>EN</li>
                        </ul>
                    </div>
                </div>
            </nav>

            <div className="copiright">
                © Franklin Hyriol Inc
            </div>
        </>
    )
}

export default Headers;