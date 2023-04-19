import { useState, useEffect } from 'react';

export function useDebounce<T>(value: T, delay = 500) {
    const [debouncedValue, setdebouncedValue] = useState(value)

    useEffect(() => {
        const timer = setTimeout(() => {
            setdebouncedValue(value)
        }, delay);

        return () => { clearTimeout(timer) }
    }, [value, delay])
    return debouncedValue
}

