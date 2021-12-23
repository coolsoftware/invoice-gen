export function formatDate(date) {
    if (!date) return date;
    if ('string' === typeof date) {
        date = new Date(Date.parse(date));
    }
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];
    const ends = ['th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th'];
    return `${months[date.getMonth()]} ${date.getDate()}${ends[date.getDate()%10]}, ${date.getFullYear()}`;
}