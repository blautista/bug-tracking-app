import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./AsideNav.module.scss";
import {
  FaGripHorizontal,
  FaIgloo,
  FaUserFriends,
  FaRegChartBar,
} from "react-icons/fa";

const NavItem = ({ icon, text, href, isActive }) => {
  return (
    <li
      key={text}
      className={`${styles.li} ${isActive === text && styles.active}`}
    >
      {icon}
      <Link href={href} passHref>
        <a onClick={() => setActiveLi(text)} className={`${styles.link}`}>
          {text}
        </a>
      </Link>
    </li>
  );
};

const AsideNav = () => {
  const router = useRouter();
  const isWithinProject = router.query.hasOwnProperty("projectTitle");

  const navItems = [
    {
      href: {
        pathname: "/projects",
        query: {},
      },
      text: `Projects${isWithinProject ? `/${router.query.projectTitle}` : ""}`,
      icon: <FaGripHorizontal />,
    },
  ];

  const withinProjectItems = [
    {
      href: {
        pathname: "/projects/[projectTitle]/dashboard",
        query: { projectTitle: router.query.projectTitle },
      },
      text: "Dashboard",
      icon: <FaRegChartBar />,
    },
    {
      href: {
        pathname: "/projects/[projectTitle]/issues",
        query: { projectTitle: router.query.projectTitle },
      },
      text: "Issues",
      icon: <FaIgloo />,
    },
    {
      href: {
        pathname: "/login",
        query: {},
      },
      text: "Manage Users",
      icon: <FaUserFriends />,
    },
  ];

  const [activeLi, setActiveLi] = useState("Issues");

  return (
    <nav className={styles.nav}>
      <ul className={styles.ul}>
        {navItems.map(({ icon, text, href }) => {
          return <NavItem icon={icon} text={text} href={href} />;
        })}
        <ul>
          {isWithinProject &&
            withinProjectItems.map(({ icon, text, href }) => (
              <NavItem
                isActive={text === activeLi}
                onClick={() => setActiveLi(text)}
                icon={icon}
                text={text}
                href={href}
              />
            ))}
        </ul>
      </ul>
    </nav>
  );
};

export default AsideNav;
