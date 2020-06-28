/*
 * action types
 */

export const LOGUEAR = 'LOGUEAR'

/*
 * action creators
 */

export function loguear(user, passwd) {
  return { type: LOGUEAR, payload:{user,passwd} }
}
