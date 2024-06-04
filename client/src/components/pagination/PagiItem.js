import React from 'react'
import clsx from 'clsx'
import { useLocation, useNavigate, useSearchParams, createSearchParams } from 'react-router-dom'

const PagiItem = ({ children }) => {
    const navigate = useNavigate()
    const [params] = useSearchParams()
    const location = useLocation()

    const handlePagination = () => {
        const queries = Object.fromEntries([...params])
        if (Number(children)) queries.page = children
        navigate({
            pathname: location.pathname,
            search: createSearchParams(queries).toString()
        })
    }
    return (
        <button
            className={clsx(' w-10 h-10 flex items-center justify-center pt-2 ', Number(children) && ' cursor-pointer hover:rounded-full hover:bg-main p-4 pb-2')}
            disabled={!Number(children)}
            onClick={handlePagination}
        >
            {children}
        </button >
    )
}

export default PagiItem
