const { SAVE_USER, UNSET_USER } = require("../actions/user");

const stateInitial = {
    user: null,
}

function user(state, action) {
    if (typeof state === 'undefined') {
        return stateInitial
    }

    const {
        user
    } = action.payload;

    switch (action.type) {
        case SAVE_USER:
            return user
            break;
        case UNSET_USER:
            return stateInitial;
            break;

        default:
            return state;
            break;
    }
}

export default user;