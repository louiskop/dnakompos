import React from 'react';

const Header = () => {

    return (
        <nav className='navbar_main'>

            <div className='navbar_logo'>
                {/* Placeholder logo */}
                <img src="/images/temp_logo.jpg" height="50rem" />
            </div>

            <div className='navbar_links'>
                <ul>
                    <li>
                        <a href="#">Shop</a>
                    </li>
                    <li>
                        <a>Reviews</a>
                    </li>
                    <li>
                        <a>Contact & About us</a>
                    </li>
                </ul>
            </div>

            <div className='navbar_useritems'>
                <img src="/images/temp_logo.jpg" height="50rem" />
                <img src="/images/temp_logo.jpg" height="50rem" />  
            </div>

        </nav>
    );
     
};

export default Header;