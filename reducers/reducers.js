const { LOGUEAR } = require("../actions/actions");

const stateInitial = {
    data:{},
    logueado:false
}

const logueo = async (user,passwd) => {
    return await fetch(`https://movie-ranker-backend.herokuapp.com/user/${user}/${passwd}`, {
                method: 'get', headers: new Headers({
                    'Authorization': 'Basic YWRtaW46QURNSU4='
                })
            })
            .then((response) => response.json())
            .then((responseJson) => {
                // console.log(responseJson.result);
                // this.setState({  });
                console.log(this.state.users);
                return {
                    users: responseJson
                }
            })
            .catch((error) => {
                console.error(error);
            });
}

function app(state, action) {
    if (typeof state === 'undefined') {
        return stateInitial
    }

    switch (action.type) {
        case LOGUEAR:
            const {
                user ,passwd
            } = action.payload;
            
            const usuario = logueo(user,passwd),
                  estaLogueado = (typeof usuario !== 'undefined');

            return Object.assign({}, state, {
                data:usuario,
                logueado:estaLogueado
            })
            break;

        default:
            return state;
            break;
    }
}