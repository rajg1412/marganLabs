"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import styles from "./Sidebar.module.css";

const NAV_ITEMS = [
    {
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
            </svg>
        ),
        label: "Dashboard",
        href: "/dashboard",
    },
    {
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
            </svg>
        ),
        label: "My Courses",
        href: "/dashboard?tab=my-courses",
    },
    {
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
        ),
        label: "Achievements",
        href: "/dashboard?tab=achievements",
    },
    {
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" />
                <line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" />
                <line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" />
            </svg>
        ),
        label: "Learning Path",
        href: "/dashboard?tab=path",
    },
    {
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
            </svg>
        ),
        label: "Profile",
        href: "/dashboard?tab=profile",
    },
];

function SidebarContent() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentTab = searchParams.get("tab");

    return (
        <aside className={styles.sidebar}>
            <nav className={styles.nav}>
                <div className={styles.section}>
                    <span className={styles.sectionLabel}>Main</span>
                    {NAV_ITEMS.slice(0, 4).map((item) => {
                        const isActive = item.href === "/dashboard"
                            ? (pathname === "/dashboard" && !currentTab)
                            : (pathname === "/dashboard" && item.href.includes(`tab=${currentTab}`));

                        return (
                            <Link
                                key={item.label}
                                href={item.href}
                                className={`${styles.navItem} ${isActive ? styles.active : ""}`}
                            >
                                <span className={styles.navIcon}>{item.icon}</span>
                                <span className={styles.navLabel}>{item.label}</span>
                            </Link>
                        );
                    })}
                </div>
                <div className={styles.section}>
                    <span className={styles.sectionLabel}>Account</span>
                    {NAV_ITEMS.slice(4).map((item) => {
                        const isActive = pathname === "/dashboard" && item.href.includes(`tab=${currentTab}`);

                        return (
                            <Link
                                key={item.label}
                                href={item.href}
                                className={`${styles.navItem} ${isActive ? styles.active : ""}`}
                            >
                                <span className={styles.navIcon}>{item.icon}</span>
                                <span className={styles.navLabel}>{item.label}</span>
                            </Link>
                        );
                    })}
                </div>
            </nav>
        </aside>
    );
}

export default function Sidebar() {
    return (
        <Suspense fallback={<aside className={styles.sidebar} />}>
            <SidebarContent />
        </Suspense>
    );
}
