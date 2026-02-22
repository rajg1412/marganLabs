import styles from "./Badge.module.css";
import clsx from "clsx";

type BadgeVariant = "primary" | "success" | "warning" | "danger" | "muted";

interface BadgeProps {
    label: string;
    variant?: BadgeVariant;
    className?: string;
}

export default function Badge({
    label,
    variant = "primary",
    className,
}: BadgeProps) {
    return (
        <span className={clsx(styles.badge, styles[variant], className)}>
            {label}
        </span>
    );
}

export function getProgressBadge(progress: number): {
    label: string;
    variant: BadgeVariant;
} {
    if (progress === 0) return { label: "Not Started", variant: "muted" };
    if (progress < 30) return { label: "Just Started", variant: "danger" };
    if (progress < 70) return { label: "In Progress", variant: "warning" };
    if (progress < 100) return { label: "Almost Done", variant: "primary" };
    return { label: "Completed", variant: "success" };
}
