"use client";

import { InputHTMLAttributes, forwardRef } from "react";
import styles from "./SearchInput.module.css";
import clsx from "clsx";

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
    className?: string;
}

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
    ({ className, ...props }, ref) => {
        return (
            <div className={clsx(styles.wrapper, className)}>
                <svg
                    className={styles.icon}
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                    ref={ref}
                    type="text"
                    className={styles.input}
                    {...props}
                />
                {props.value && (
                    <button
                        className={styles.clear}
                        onClick={() => {
                            const event = {
                                target: { value: "" },
                            } as React.ChangeEvent<HTMLInputElement>;
                            props.onChange?.(event);
                        }}
                        aria-label="Clear search"
                    >
                        ×
                    </button>
                )}
            </div>
        );
    }
);

SearchInput.displayName = "SearchInput";
export default SearchInput;
