import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// import { connect } from 'react-redux';
import '../stylesheets/Header.css';

class Header extends Component {
    render() {
        return (
            <header>
                <nav>
                    <p>Hellooooo</p>
                </nav>
            </header>
        );
    }
}

// function mapStateToProps({ auth }) {
//     return { auth };
// }

// export default connect(mapStateToProps)(Header);

export default Header;