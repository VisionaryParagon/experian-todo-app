export function deprecate(item, message) {
  let log = `${item} is deprecated`;
  if (message) log += `, ${message}`;
  if (console && console.warn) console.warn(log);
};
