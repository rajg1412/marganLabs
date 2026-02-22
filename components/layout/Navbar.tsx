"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";
import styles from "./Navbar.module.css";

export default function Navbar() {
    const { theme, toggleTheme } = useTheme();
    const [menuOpen, setMenuOpen] = useState(false);
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem("isLoggedIn");
        router.replace("/");
    };

    return (
        <nav className={styles.navbar}>
            <div className={styles.inner}>
                {/* Logo */}
                <Link href="/dashboard" className={styles.logo}>
                    <span className={styles.logoIcon}>⚡</span>
                    <span className={styles.logoText}>
                        Neuro<span className={styles.logoAccent}>Learn</span>
                    </span>
                </Link>

                {/* Center nav (desktop) */}
                <div className={styles.centerNav}>
                    <Link href="/dashboard" className={styles.navLink}>Dashboard</Link>
                    <Link href="/dashboard" className={styles.navLink}>My Courses</Link>
                    <Link href="/dashboard" className={styles.navLink}>Explore</Link>
                </div>

                {/* Right side */}
                <div className={styles.rightSide}>
                    {/* Dark mode toggle */}
                    <button
                        onClick={toggleTheme}
                        className={styles.themeBtn}
                        aria-label="Toggle dark mode"
                    >
                        {theme === "dark" ? (
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="5" />
                                <line x1="12" y1="1" x2="12" y2="3" />
                                <line x1="12" y1="21" x2="12" y2="23" />
                                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                                <line x1="1" y1="12" x2="3" y2="12" />
                                <line x1="21" y1="12" x2="23" y2="12" />
                                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                            </svg>
                        ) : (
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                            </svg>
                        )}
                    </button>

                    {/* Avatar / Logout */}
                    <button className={styles.avatar} onClick={handleLogout} title="Click to Logout">
                        <span>JD</span>
                    </button>

                    {/* Mobile hamburger */}
                    <button
                        className={styles.hamburger}
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Toggle menu"
                    >
                        <span className={`${styles.bar} ${menuOpen ? styles.bar1Open : ""}`} />
                        <span className={`${styles.bar} ${menuOpen ? styles.bar2Open : ""}`} />
                        <span className={`${styles.bar} ${menuOpen ? styles.bar3Open : ""}`} />
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            {menuOpen && (
                <div className={styles.mobileMenu}>
                    <Link href="/dashboard" className={styles.mobileLink} onClick={() => setMenuOpen(false)}>Dashboard</Link>
                    <Link href="/dashboard" className={styles.mobileLink} onClick={() => setMenuOpen(false)}>My Courses</Link>
                    <Link href="/dashboard" className={styles.mobileLink} onClick={() => setMenuOpen(false)}>Explore</Link>
                </div>
            )}
        </nav>
    );
}
