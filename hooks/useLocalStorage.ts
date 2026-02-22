import { useState, useEffect, useCallback } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
    const [storedValue, setStoredValue] = useState<T>(initialValue);

    useEffect(() => {
        try {
            const item = window.localStorage.getItem(key);
            if (item) {
                setStoredValue(JSON.parse(item));
            }
        } catch (error) {
            console.warn(`useLocalStorage read error for key "${key}":`, error);
        }
    }, [key]);

    const setValue = useCallback(
        (value: T | ((val: T) => T)) => {
            try {
                setStoredValue((prev) => {
                    const valueToStore =
                        value instanceof Function ? value(prev) : value;
                    window.localStorage.setItem(key, JSON.stringify(valueToStore));
                    return valueToStore;
                });
            } catch (error) {
                console.warn(`useLocalStorage write error for key "${key}":`, error);
            }
        },
        [key]
    );

    return [storedValue, setValue] as const;
}
