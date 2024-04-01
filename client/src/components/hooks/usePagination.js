import { useMemo } from 'react'
import { generateRange } from '../../ultils/helpers'
import icons from '../../ultils/icons'

const usePagination = (totalCount, currentPage, siblingCount = 1) => {
    const { BsThreeDots } = icons
    const paginationArray = useMemo(() => {
        const pagesize = process.env.REACT_APP_LIMIT || 2
        const paginationCount = Math.ceil(totalCount / pagesize)
        const totalPaginationItem = siblingCount + 6

        if (paginationCount <= totalPaginationItem) return generateRange(1, paginationCount)
        const isHideLeft = currentPage - siblingCount > 3
        const isHideRight = currentPage + siblingCount < paginationCount - 2
        if (isHideLeft && !isHideRight) {
            const rightStart = currentPage - siblingCount
            const rightRange = generateRange(rightStart, paginationCount)
            return [1, <BsThreeDots />, ...rightRange]
        }
        if (!isHideLeft && isHideRight) {
            const leftEnd = currentPage + siblingCount
            const leftRange = generateRange(1, leftEnd)
            return [...leftRange, <BsThreeDots />, paginationCount]
        }
        if (isHideLeft && isHideRight) {
            const siblingLeft = Math.max(currentPage - siblingCount, 1)
            const siblingRight = Math.min(currentPage + siblingCount, paginationCount)
            const middleRange = generateRange(siblingLeft, siblingRight)
            return [1, <BsThreeDots />, ...middleRange, <BsThreeDots />, paginationCount]
        }
    }, [totalCount, currentPage, siblingCount = 1])
    return paginationArray
}
//[1,2,3,4,5,6]
//[1,...,6,7,8,9,10]
//[1,2,3,4,5,...,10]
//[1,...,5,6,7,...,10]
export default usePagination
