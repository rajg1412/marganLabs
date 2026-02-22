"use client";

import { useMemo, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useCourses } from "@/hooks/useCourses";
import { Course } from "@/data/courses";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import SearchInput from "@/components/ui/SearchInput";
import ProgressBar from "@/components/ui/ProgressBar";
import Badge, { getProgressBadge } from "@/components/ui/Badge";
import { SkeletonCourseCard } from "@/components/ui/Skeleton";
import AuthGuard from "@/components/auth/AuthGuard";
import styles from "./page.module.css";

const CATEGORY_ICONS: Record<string, string> = {
    "Artificial Intelligence": "🤖",
    "Machine Learning": "📊",
    "Web Development": "💻",
    "Deep Learning": "🧠",
    NLP: "💬",
    "Data Science": "📈",
};

function EmptyState({ query }: { query: string }) {
    return (
        <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>🔍</div>
            <h3 className={styles.emptyTitle}>No courses found</h3>
            <p className={styles.emptyText}>
                No results for &ldquo;<strong>{query}</strong>&rdquo;. Try a different keyword.
            </p>
        </div>
    );
}

function CourseCard({ course, index }: { course: Course; index: number }) {
    const router = useRouter();
    const { label, variant } = getProgressBadge(course.progress);
    const icon = CATEGORY_ICONS[course.category] ?? "📚";

    return (
        <div
            className={styles.courseCard}
            style={{ animationDelay: `${index * 80}ms` }}
            onClick={() => router.push(`/course/${course.id}`)}
        >
            <div className={styles.cardTop}>
                <div className={styles.courseIcon}>{icon}</div>
                <Badge label={label} variant={variant} />
            </div>

            <h3 className={styles.courseTitle}>{course.title}</h3>
            <p className={styles.courseDesc}>{course.description}</p>

            <div className={styles.instructor}>
                <span className={styles.instructorAvatar}>
                    {course.instructor.split(" ").map((n: string) => n[0]).join("").slice(0, 2)}
                </span>
                <span className={styles.instructorName}>{course.instructor}</span>
            </div>

            <div className={styles.progressSection}>
                <div className={styles.progressHeader}>
                    <span className={styles.progressLabel}>{course.totalLessons} lessons</span>
                    <span className={styles.progressValue}>{course.progress}%</span>
                </div>
                <ProgressBar value={course.progress} size="md" />
            </div>

            <div className={styles.cardFooter}>
                <span className={styles.category}>{course.category}</span>
                <Link
                    href={`/course/${course.id}`}
                    className={styles.continueBtn}
                    onClick={(e) => e.stopPropagation()}
                >
                    {course.progress === 0
                        ? "Start"
                        : course.progress === 100
                            ? "Review"
                            : "Continue"} →
                </Link>
            </div>
        </div>
    );
}

function DashboardContent() {
    const { courses, loading } = useCourses();
    const [query, setQuery] = useState("");
    const searchParams = useSearchParams();
    const currentTab = searchParams.get("tab") || "dashboard";

    const filtered = useMemo(() => {
        const q = query.toLowerCase().trim();
        if (!q) return courses;
        return courses.filter(
            (c: Course) =>
                c.title.toLowerCase().includes(q) ||
                c.category.toLowerCase().includes(q) ||
                c.instructor.toLowerCase().includes(q)
        );
    }, [courses, query]);

    // Stats
    const avgProgress = courses.length
        ? Math.round(courses.reduce((s: number, c: Course) => s + c.progress, 0) / courses.length)
        : 0;
    const completed = courses.filter((c: Course) => c.progress === 100).length;
    const inProgress = courses.filter((c: Course) => c.progress > 0 && c.progress < 100).length;

    // Tab Header Map
    const tabInfo: Record<string, { title: string; sub: string }> = {
        dashboard: { title: "My Learning Dashboard", sub: "Track your progress and continue where you left off" },
        "my-courses": { title: "My Enrolled Courses", sub: "View and manage all your active and completed courses" },
        achievements: { title: "Your Achievements", sub: "Celebrated milestones and earned certificates" },
        path: { title: "Learning Path", sub: "Your personalized roadmap to AI mastery" },
        profile: { title: "Profile Settings", sub: "Manage your account and preferences" },
    };

    const { title, sub } = tabInfo[currentTab] || tabInfo.dashboard;
    const userEmail = typeof window !== "undefined" ? localStorage.getItem("userEmail") : null;

    return (
        <div className="page-container">
            {/* Page header */}
            <div className={styles.pageHeader}>
                <div>
                    <h1 className={styles.pageTitle}>{title}</h1>
                    <p className={styles.pageSubtitle}>{sub}</p>
                    {currentTab === "profile" && userEmail && (
                        <div className={styles.profileMeta} style={{ marginTop: "12px", display: "flex", alignItems: "center", gap: "8px", color: "var(--text-secondary)" }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                <polyline points="22,6 12,13 2,6" />
                            </svg>
                            <span style={{ fontSize: "14px", fontWeight: "500" }}>{userEmail}</span>
                        </div>
                    )}
                </div>
            </div>

            {currentTab === "dashboard" || currentTab === "my-courses" ? (
                <>
                    {/* Stats strip */}
                    <div className={styles.statsRow}>
                        {[
                            { label: "Total Courses", value: courses.length, icon: "📚" },
                            { label: "Avg. Progress", value: `${avgProgress}%`, icon: "📊" },
                            { label: "Completed", value: completed, icon: "✅" },
                            { label: "In Progress", value: inProgress, icon: "⚡" },
                        ].map((stat) => (
                            <div key={stat.label} className={styles.statCard}>
                                <span className={styles.statIcon}>{stat.icon}</span>
                                <div>
                                    <p className={styles.statValue}>{loading ? "—" : stat.value}</p>
                                    <p className={styles.statLabel}>{stat.label}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Search */}
                    <div className={styles.searchRow}>
                        <SearchInput
                            placeholder="Search courses, instructors, categories…"
                            value={query}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
                            className={styles.searchInput}
                        />
                        <div className={styles.resultCount}>
                            {!loading && (
                                <span>
                                    {filtered.length} course{filtered.length !== 1 ? "s" : ""}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Course grid */}
                    {loading ? (
                        <div className={styles.grid}>
                            {Array.from({ length: 6 }).map((_, i) => (
                                <SkeletonCourseCard key={i} />
                            ))}
                        </div>
                    ) : filtered.length === 0 ? (
                        <EmptyState query={query} />
                    ) : (
                        <div className={styles.grid}>
                            {filtered.map((course: Course, i: number) => (
                                <CourseCard key={course.id} course={course} index={i} />
                            ))}
                        </div>
                    )}
                </>
            ) : (
                <div className={styles.emptyState}>
                    <div className={styles.emptyIcon}>⏳</div>
                    <h3 className={styles.emptyTitle}>{title} is coming soon</h3>
                    <p className={styles.emptyText}>
                        We are currently building this feature. Please check back later!
                    </p>
                    <Link href="/dashboard" className={styles.continueBtn} style={{ marginTop: "20px" }}>
                        Back to Dashboard
                    </Link>
                </div>
            )}
        </div>
    );
}

export default function DashboardPage() {
    return (
        <AuthGuard>
            <div className="app-layout">
                <Navbar />
                <Sidebar />
                <main className="main-content">
                    <Suspense fallback={<div className="page-container"><SkeletonCourseCard /></div>}>
                        <DashboardContent />
                    </Suspense>
                </main>
            </div>
        </AuthGuard>
    );
}
