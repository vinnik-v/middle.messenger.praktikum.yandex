/**
 * Функция принимает на вход дату в формате строки или даты и возвращает нормализованную дату или время
 * @param inpDate дата в формате строки или даты
 * @param dateType типа возвращаемой даты:
 * - full - 16.04.2024 08:00:00
 * - date - 16.04.2024
 * - fullTime - 08:00:00
 * - timeNoSecs - 08:00
 */
export default function dateToString(inpDate: string | Date, dateType?: string) {
    const date = new Date(inpDate);

    const day = dateElemNormalize(date.getDate());
    const month = dateElemNormalize(date.getMonth()+1);
    const year = String(date.getFullYear());

    const hours = dateElemNormalize(date.getHours());
    const minutes = dateElemNormalize(date.getMinutes());
    const seconds = dateElemNormalize(date.getSeconds());

    switch (dateType) {
        case 'date': 
            return `${day}.${month}.${year}`;
        case 'fullTime': 
            return `${hours}:${minutes}:${seconds}`;
        case 'timeNoSecs': 
            return `${hours}:${minutes}`;
        case 'full': 
        default:
            return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
    }
}

function dateElemNormalize(elem: number) {
    if (elem > 9) {
        return String(elem);
    }
    return '0'+elem;
}
