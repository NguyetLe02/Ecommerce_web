import React, { useEffect, useState } from 'react'

const useDebounce = (value, ms) => {
    const [debounceValue, setDebounceValue] = useState('')
    useEffect(() => {
        const setTimeOutId = setTimeout(() => {
            setDebounceValue(value)
        }, ms)
        return () => {
            clearTimeout(setTimeOutId)
        }
    }, [value, ms])
    return debounceValue
}

export default useDebounce
