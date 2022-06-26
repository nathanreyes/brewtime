import padNum from './padNum';

const MS_PER_SEC = 1000;
const MS_PER_MIN = 1000 * 60;

export function getDataFromDuration(duration: number) {
  const minutes = Math.floor(duration / MS_PER_MIN);
  duration -= minutes * MS_PER_MIN;
  const seconds = Math.floor(duration / MS_PER_SEC);
  duration -= seconds * MS_PER_SEC;
  const milliseconds = duration;
  return {
    minutes,
    seconds,
    milliseconds,
  };
}

export function getDurationFromData({ minutes = 0, seconds = 0, milliseconds = 0 }) {
  return minutes * MS_PER_MIN + seconds * MS_PER_SEC + milliseconds;
}

export function formatDuration(duration: number) {
  const data = getDataFromDuration(duration);
  return `${padNum(data.minutes)}:${padNum(data.seconds)}`;
}
