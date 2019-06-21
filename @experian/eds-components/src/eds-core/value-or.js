// Uses 'value' unless null or undefined, then uses 'or'
// Allows for conditional checks that include valid falsey values such as 0
export function valueOr(value, or) {
  // double equal intentional here to check for undefined as well
  return (value == null) ? or : value;
};
