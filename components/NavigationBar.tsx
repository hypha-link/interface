import styles from '../styles/navigationbar.module.css'
import Link from 'next/link'
import { useState } from 'react'
import HyphaLogo from "../public/logo/hypha-01.svg"

export default function NavigationBar (){
    const [hideMobileMenu, setHideMobileMenu] = useState(true);

    return (
        <nav className={styles.nav}>
            <Link href="/">
                <a className={`logoContainer`}>
                    <HyphaLogo/>
                    <h1>HYPHA</h1>
                </a>
            </Link>
            <div className={hideMobileMenu ? styles.hideMobileMenu : undefined}>
                <ul>
                    <li><Link href='/welcome'><a>Docs</a></Link></li>
                    <li><Link href='/network'><a>Network Activity</a></Link></li>
                    <li><Link href="/roadmap"><a>Roadmap</a></Link></li>
                </ul>
                <Link href="/app">
                    <a className={styles.enter}>Enter App</a>
                </Link>
            </div>
            <a className={styles.hamburger} onClick={() => setHideMobileMenu(!hideMobileMenu)}>☰</a>
        </nav>
    )
}