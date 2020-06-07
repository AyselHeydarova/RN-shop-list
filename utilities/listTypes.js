export const LIST_TYPES = Object.freeze({
  ONETIME: "ONETIME",
  REGULAR: "REGULAR",
});

export function getListTypeFromParams(route) {
  return route?.params?.listType || LIST_TYPES.ONETIME;
}
