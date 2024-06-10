

export const formateDate = (date, config) => {
    
    const defaultOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };

    const options = config ? config : defaultOptions;

    return new Date (date).toLocaleDateString('en-US', options);
};