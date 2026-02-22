import styles from "./Skeleton.module.css";
import clsx from "clsx";

interface SkeletonProps {
    width?: string | number;
    height?: string | number;
    rounded?: boolean;
    className?: string;
}

export default function Skeleton({
    width = "100%",
    height = 16,
    rounded = false,
    className,
}: SkeletonProps) {
    return (
        <div
            className={clsx(styles.skeleton, rounded && styles.rounded, className)}
            style={{
                width: typeof width === "number" ? `${width}px` : width,
                height: typeof height === "number" ? `${height}px` : height,
            }}
        />
    );
}

export function SkeletonCourseCard() {
    return (
        <div className={styles.card}>
            <div className={styles.cardHeader}>
                <Skeleton width={48} height={48} rounded />
                <div className={styles.cardHeaderText}>
                    <Skeleton width="60%" height={14} />
                    <Skeleton width="40%" height={11} />
                </div>
            </div>
            <Skeleton width="85%" height={20} className={styles.titleSkel} />
            <Skeleton width="100%" height={12} />
            <Skeleton width="75%" height={12} />
            <div className={styles.progressSection}>
                <Skeleton width="30%" height={11} />
                <Skeleton width={44} height={11} />
            </div>
            <Skeleton width="100%" height={8} rounded />
        </div>
    );
}
