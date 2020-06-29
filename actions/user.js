/*
 * action types
 */

export const SAVE_USER = 'SAVE_USER'

/*
 * action creators
 */

export function saveUser(user) {
    return { type: SAVE_USER, payload: { user } }
}
