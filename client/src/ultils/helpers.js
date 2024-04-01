export const generateRange = (start, end) => {
    const length = end - start + 1
    return Array.from({ length }, (_, index) => start + index)
}