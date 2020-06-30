/*
 * action types
 */

export const SAVE_USER = 'SAVE_USER'
export const UNSET_USER = 'UNSET_USER'

/*
 * action creators
 */

export function saveUser(user) {
    return { type: SAVE_USER, payload: { user } }
}

export function unsetUser() {
    return { type: UNSET_USER, payload: {} }
}
