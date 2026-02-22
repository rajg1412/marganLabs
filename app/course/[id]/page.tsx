"use client";

import { use, useMemo } from "react";
import Link from "next/link";
import { getCourseById } from "@/data/courses";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import ProgressBar from "@/components/ui/ProgressBar";
import Badge, { getProgressBadge } from "@/components/ui/Badge";
import AuthGuard from "@/components/auth/AuthGuard";
import styles from "./page.module.css";

const LESSON_TYPE_ICONS: Record<string, string> = {
    video: "▶",
    article: "📄",
    quiz: "✏️",
};

export default function CourseDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = use(params);
    const course = getCourseById(Number(id));

    const [completedIds, setCompletedIds] = useLocalStorage<number[]>(
        `course-${id}-completed`,
        []
    );

    const toggleLesson = (lessonId: number) => {
        setCompletedIds((prev) =>
            prev.includes(lessonId)
                ? prev.filter((l) => l !== lessonId)
                : [...prev, lessonId]
        );
    };

    const liveProgress = useMemo(() => {
        if (!course) return 0;
        return Math.round((completedIds.length / course.lessons.length) * 100);
    }, [completedIds, course]);

    if (!course) {
        return (
            <AuthGuard>
                <div className="app-layout">
                    <Navbar />
                    <Sidebar />
                    <main className="main-content">
                        <div className="page-container">
                            <div className={styles.notFound}>
                                <div className={styles.notFoundIcon}>🔍</div>
                                <h2>Course not found</h2>
                                <Link href="/dashboard" className={styles.backBtn}>
                                    ← Back to Dashboard
                                </Link>
                            </div>
                        </div>
                    </main>
                </div>
            </AuthGuard>
        );
    }

    const { label, variant } = getProgressBadge(liveProgress);

    return (
        <AuthGuard>
            <div className="app-layout">
                <Navbar />
                <Sidebar />
                <main className="main-content">
                    <div className="page-container">
                        {/* Back link */}
                        <Link href="/dashboard" className={styles.backLink}>
                            ← Back to Dashboard
                        </Link>

                        {/* Course hero */}
                        <div className={styles.hero}>
                            <div className={styles.heroLeft}>
                                <div className={styles.categoryChip}>{course.category}</div>
                                <h1 className={styles.courseTitle}>{course.title}</h1>
                                <p className={styles.courseDesc}>{course.description}</p>

                                <div className={styles.metaRow}>
                                    <div className={styles.metaItem}>
                                        <span className={styles.metaIcon}>👨‍🏫</span>
                                        <span>{course.instructor}</span>
                                    </div>
                                    <div className={styles.metaItem}>
                                        <span className={styles.metaIcon}>📚</span>
                                        <span>{course.totalLessons} lessons</span>
                                    </div>
                                    <div className={styles.metaItem}>
                                        <span className={styles.metaIcon}>✅</span>
                                        <span>{completedIds.length} completed</span>
                                    </div>
                                </div>
                            </div>

                            {/* Progress card */}
                            <div className={styles.progressCard}>
                                <div className={styles.progressRing}>
                                    <svg viewBox="0 0 80 80" className={styles.ringsvg}>
                                        <defs>
                                            <linearGradient id="ring-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                                <stop offset="0%" stopColor="var(--primary)" />
                                                <stop offset="100%" stopColor="var(--accent)" />
                                            </linearGradient>
                                        </defs>
                                        <circle cx="40" cy="40" r="34" className={styles.ringBg} />
                                        <circle
                                            cx="40"
                                            cy="40"
                                            r="34"
                                            className={styles.ringFill}
                                            strokeDasharray={`${2 * Math.PI * 34}`}
                                            strokeDashoffset={`${2 * Math.PI * 34 * (1 - liveProgress / 100)}`}
                                        />
                                    </svg>
                                    <div className={styles.ringLabel}>
                                        <span className={styles.ringPercent}>{liveProgress}%</span>
                                        <span className={styles.ringText}>Complete</span>
                                    </div>
                                </div>
                                <Badge label={label} variant={variant} />
                                <ProgressBar value={liveProgress} size="md" showLabel />
                                <p className={styles.progressHint}>
                                    {course.totalLessons - completedIds.length === 0
                                        ? "🎉 Course complete!"
                                        : `${course.totalLessons - completedIds.length} lesson${course.totalLessons - completedIds.length !== 1 ? "s" : ""} remaining`}
                                </p>
                            </div>
                        </div>

                        {/* Lesson list */}
                        <section className={styles.lessonSection}>
                            <h2 className={styles.sectionTitle}>Course Content</h2>
                            <div className={styles.lessonList}>
                                {course.lessons.map((lesson, i) => {
                                    const done = completedIds.includes(lesson.id);
                                    return (
                                        <div
                                            key={lesson.id}
                                            className={`${styles.lessonItem} ${done ? styles.lessonDone : ""}`}
                                            onClick={() => toggleLesson(lesson.id)}
                                            role="button"
                                            tabIndex={0}
                                            onKeyDown={(e) =>
                                                e.key === "Enter" && toggleLesson(lesson.id)
                                            }
                                        >
                                            <div className={styles.lessonNumber}>
                                                {done ? (
                                                    <span className={styles.checkmark}>✓</span>
                                                ) : (
                                                    <span>{String(i + 1).padStart(2, "0")}</span>
                                                )}
                                            </div>
                                            <div className={styles.lessonInfo}>
                                                <p className={styles.lessonTitle}>{lesson.title}</p>
                                                <div className={styles.lessonMeta}>
                                                    <span className={styles.lessonType}>
                                                        {LESSON_TYPE_ICONS[lesson.type]} {lesson.type}
                                                    </span>
                                                    <span className={styles.lessonDuration}>
                                                        ⏱ {lesson.duration}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className={`${styles.checkbox} ${done ? styles.checkboxDone : ""}`}>
                                                {done && <span className={styles.checkInner}>✓</span>}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </section>
                    </div>
                </main>
            </div>
        </AuthGuard>
    );
}
