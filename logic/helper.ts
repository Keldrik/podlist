export const dateHeadText = (date: Date): string => {
  const today = new Date(Date.now());
  let text: string = `${date.getDate().toString().padStart(2, '0')}/${(
    date.getMonth() + 1
  )
    .toString()
    .padStart(2, '0')}/${date.getFullYear()}`;
  text =
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
      ? 'Heute'
      : text;

  text =
    date.getDate() === today.getDate() - 1 &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
      ? 'Gestern'
      : text;
  return text;
};

export const timeString = (date: Date): string => {
  return `${date
    .getHours()
    .toString()
    .padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')} Uhr`;
};

export const playtimeString = (time: number): string => {
  let seconds = Math.floor(time);
  let minutes = Math.floor(seconds / 60);
  seconds = Math.floor(seconds - minutes * 60);
  let hours = Math.floor(minutes / 60);
  minutes = Math.floor(minutes - hours * 60);
  return `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};
