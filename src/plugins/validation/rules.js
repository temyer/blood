export function required(v) {
  return v.trim() !== '';
}

export function minLength(min) {
  return (val) => val && val.length >= min;
}
