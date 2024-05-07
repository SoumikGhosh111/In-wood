export const redableTimeStamp = (time) => {
    const date = new Date(time);
    const options = {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: 'UTC' // Specify timezone if needed
    };
    const formattedDate = date.toLocaleString('en-US', options);
    return formattedDate;
}