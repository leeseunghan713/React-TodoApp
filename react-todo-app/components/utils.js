// utils.js
export const convertTo24Hour = (time) => {
    let [hours, minutes] = time.split(':');
    const period = minutes.slice(-2);
    minutes = minutes.slice(0, -2);
    if (period === 'AM' && hours !== '12') {
      hours = (parseInt(hours, 10) + 12).toString();
    } else if (period === 'PM' && hours === '12') {
      hours = '00';
    }
    return `${hours}:${minutes}`;
  };
  