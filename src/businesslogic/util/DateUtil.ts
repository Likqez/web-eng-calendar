export const isSameDate = (o1: Date, o2: Date): boolean => {
    return o1.getFullYear() === o2.getFullYear() && o1.getMonth() === o2.getMonth() && o1.getDate() === o2.getDate();
}