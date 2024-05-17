export const redableTimeStamp = (time) => {
    const date = new Date(time);
    const options = {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: 'UTC' 
    };
    const formattedDate = date.toLocaleString('en-US', options);
    return formattedDate;
}

export const formatReadableDate = (timestamp) => {
    const date = new Date(timestamp);

    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); 
    const day = ('0' + date.getDate()).slice(-2);

    const formattedDate = `${year}-${month}-${day}`;

    return formattedDate;
}