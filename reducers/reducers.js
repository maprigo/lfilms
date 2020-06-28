const { LOGUEAR } = require("../actions/actions");

function app(state, action) {
    switch (action.type) {
        case LOGUEAR:
            const {
                user ,passwd
            }=action.payload
            await fetch('https://movie-ranker-backend.herokuapp.com/user/', {
                method: 'get', headers: new Headers({
                    'Authorization': 'Basic YWRtaW46QURNSU4='
                })
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    // console.log(responseJson.result);
                    this.setState({ users: responseJson });
                    console.log(this.state.users);
                })
                .catch((error) => {
                    console.error(error);
                });

            break;

        default:
            break;
    }
}