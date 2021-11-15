import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./AsideNav.module.scss";
const AsideNav = () => {
  const router = useRouter();

  const navItems = [
    {
      href: {
        pathname: "/projects",
        query: {},
      },
      text: "Projects",
    },
    {
      href: {
        pathname: "/projects/[projectTitle]/issues",
        query: {projectTitle: router.query.projectTitle},
      },
      text: "Issues",
    },
    {
      href: {
        pathname: "/login",
        query: {},
      },
      text: "Manage Users",
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
