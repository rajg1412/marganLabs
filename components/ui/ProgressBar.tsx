"use client";

import { useEffect, useRef } from "react";
import styles from "./ProgressBar.module.css";
import clsx from "clsx";

interface ProgressBarProps {
    value: number; // 0-100
    size?: "sm" | "md" | "lg";
    showLabel?: boolean;
    animated?: boolean;
    className?: string;
}

export default function ProgressBar({
    value,
    size = "md",
    showLabel = false,
    animated = true,
    className,
}: ProgressBarProps) {
    const fillRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (fillRef.current) {
            // Delay for mount animation
            setTimeout(() => {
                if (fillRef.current) {
                    fillRef.current.style.width = `${value}%`;
                }
            }, 100);
        }
    }, [value]);

    const colorClass =
        value >= 80
            ? styles.high
            : value >= 40
                ? styles.medium
                : styles.low;

    return (
        <div className={clsx(styles.wrapper, className)}>
            {showLabel && (
                <div className={styles.labelRow}>
                    <span className={styles.label}>Progress</span>
                    <span className={styles.value}>{value}%</span>
                </div>
            )}
            <div className={clsx(styles.track, styles[size])}>
                <div
                    ref={fillRef}
                    className={clsx(
                        styles.fill,
                        colorClass,
                        animated && styles.animated
                    )}
                    style={{ width: "0%" }}
                    role="progressbar"
                    aria-valuenow={value}
                    aria-valuemin={0}
                    aria-valuemax={100}
                />
            </div>
        </div>
    );
}
