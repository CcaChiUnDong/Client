import React, { Component } from 'react';
import LandingComponent from './LandingComponent';

class HeaderComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }
    render() {
        return (
            <div>
                <header>
                    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                        <div><a href="http://localhost:3000" className="navbar-brand">Cca Chi Un Dong</a></div>
                        <div className = "collapse navbar-collapse justify-content-between" id="collapsibleNavbar">
                            <ul>

                            </ul>
                            <ul className="navbar-nav">
                                <li className='nav-item'>
                                    <a href="http://localhost:3000/login/" className='nav-link'>LOGIN</a>
                                </li>
                                <li className='nav-item'>
                                    <LandingComponent/>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </header>
            </div>
        );
    }
}

export default HeaderComponent;