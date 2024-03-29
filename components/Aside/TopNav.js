import React from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import Link from "next/dist/client/link";
import styles from "./TopNav.module.scss";
import { splitPathnameIntoItems } from "../../functions/utils";

const NavItem = ({ text, href }) => {
  return (
    <Link href={href} passHref>
      <a>{text}</a>
    </Link>
  );
};

const TopNav = (props) => {
  const router = useRouter();

  let navItems = splitPathnameIntoItems(router.asPath);

  return (
    <nav className={styles.navContainer}>
      <ul className={styles.navList}>
        {navItems.map(({ text, href }) => (
          <li className={styles.navItem}>
            <Link passHref href={href}>
              <a>{text} /</a>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TopNav;
