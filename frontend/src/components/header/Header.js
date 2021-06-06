import React from "react";
import "./Header.css";
import Menu from '../dropdown/menu'

class Header extends React.Component {
    render() {
        return (
            <>
                <div className="menu-head">
                    <div className="container-md Nav">
                        <div className="Nav-menus">
                            <div className="Nav-Brand">
                                <a className="Nav-brand-logo" href="/">
                                    Instagram
                                </a>
                            </div>
                            <div className="Nav-Profil">
                                <Menu />
                            </div>
                        </div>

                    </div >
                </div>
                <div className="espaceur">

                </div>
            </>
        );
    }
}
export default Header;