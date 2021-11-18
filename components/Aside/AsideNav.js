import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./AsideNav.module.scss";
import {FaGripHorizontal, FaIgloo, FaUserFriends} from 'react-icons/fa'
const AsideNav = () => {
  const router = useRouter();

  const navItems = [
    {
      href: {
        pathname: "/projects",
        query: {},
      },
      text: "Projects",
      icon: <FaGripHorizontal/>,
    },
    {
      href: {
        pathname: "/projects/[projectTitle]/issues",
        query: {projectTitle: router.query.projectTitle},
      },
      text: "Issues",
      icon: <FaIgloo/>
    },
    {
      href: {
        pathname: "/login",
        query: {},
      },
      text: "Manage Users",
      icon: <FaUserFriends/>,
    },
  ];

  const [activeLi, setActiveLi] = useState();

  return (
    <nav className={styles.nav}>
      <ul className={styles.ul}>
        {navItems.map((item) => {
          return (
            <li
              key={item.text}
              className={`${styles.li} ${
                activeLi === item.text && styles.active
              }`}
            >
              {item.icon}
              <Link
                href={item.href}
                passHref
              >
                <a
                  onClick={() => setActiveLi(item.text)}
                  className={`${styles.link}`}
                >
                  {item.text}
                </a>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default AsideNav;
