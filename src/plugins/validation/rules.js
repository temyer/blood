export function required(v) {
  return v.toString().trim() !== '';
}

export function minLength(min) {
  return (val) => val && val.toString().length >= min;
}

export function isInt(v) {
  return /^\d+$/.test(v.toString());
}
