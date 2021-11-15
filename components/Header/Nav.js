import React, {useState} from 'react';
import styles from './Nav.module.css';

const Nav = () => {
    return (
        <nav className={styles.nav}>
            <ul className={styles.ul}>
                <li className={styles.li}>Login</li>
                <li className={styles.li}>Signup</li>
            </ul>
        </nav>
    );
};

export default Nav;