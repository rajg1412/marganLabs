import { ReactNode } from "react";
import styles from "./Card.module.css";
import clsx from "clsx";

interface CardProps {
    children: ReactNode;
    className?: string;
    onClick?: () => void;
    hoverable?: boolean;
    padding?: "sm" | "md" | "lg";
}

export default function Card({
    children,
    className,
    onClick,
    hoverable = false,
    padding = "md",
}: CardProps) {
    return (
        <div
            className={clsx(
                styles.card,
                hoverable && styles.hoverable,
                styles[padding || "md"],
                className
            )}
            onClick={onClick}
            role={onClick ? "button" : undefined}
            tabIndex={onClick ? 0 : undefined}
            onKeyDown={onClick ? (e) => e.key === "Enter" && onClick() : undefined}
        >
            {children}
        </div>
    );
}
