export const generateRange = (start, end) => {
    const length = end - start + 1
    return Array.from({ length }, (_, index) => start + index)
}

export const createSlug = (string) => string.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(" ").join("-")