import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc'
import format from 'dayjs/plugin/localizedFormat'
dayjs.extend(utc)
dayjs.extend(format)

export const generateRange = (start, end) => {
    const length = end - start + 1
    return Array.from({ length }, (_, index) => start + index)
}

export const getDateFormat = (date) => {
    // console.log(date)
    const format = 'YYYY-MM-DD';
    const dateConvert = dayjs(date).format();
    // console.log(dateConvert)
    return dayjs(dateConvert, format)
}

export const addDate = (date, value, type) => {
    const format = 'YYYY-MM-DD';
    let dateTypeDayjs = dayjs(date);

    if (type === 'date') {
        dateTypeDayjs = dateTypeDayjs.set('date', dateTypeDayjs.get('date') + value);
    }
    const dateString = dateTypeDayjs.format();
    return dayjs(dateString, format)
}

export const differentDate = (startDate, endDate) => {
    const daysDifference = dayjs(endDate).diff(dayjs(startDate), 'day') + 1
    return daysDifference
}


export const createSlug = (string) => string.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(" ").join("-")