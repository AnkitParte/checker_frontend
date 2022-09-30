

import axios from "axios";

// export const CLIENTPOST = "/clients/post";
// export const CLIENTERR = "/clients/error";
// export const CLIENTLOAD = "/clients/loading";
export const ClientFetch = "/clients/fetch";

// export const clientsPost = (creds) => async (dispatch) => {
//     dispatch({ type: CLIENTLOAD });
//     try {
//         let res = await axios.post('http://localhost:5000/clients', creds);
//         dispatch({ type: CLIENTPOST, payload: res.data });
//         console.log(res.data);
//     }
//     catch (e) {
//         dispatch({ type: CLIENTERR })
//     }
// }

export const createClient = (creds, token) => {
    let config = {
        method: 'post',
        url: 'http://localhost:5000/clients',
        headers: {
            'token': token,
            'Content-Type': 'application/json'
        },
        data: creds
    };

    return axios(config);

}

export const getClients = (token) => async (dispatch) => {
    try {
        let config = {
            method: 'get',
            url: 'http://localhost:5000/clients',
            headers: {
                'token': token,
                'Content-Type': 'application/json'
            }
        };

        let res = await axios(config);
        //console.log(res)
        dispatch({ type: ClientFetch, payload: res.data });
        return (console.log("clients fetched"));
    }
    catch (e) {
        console.log(e);
    }
}

export const patchClients = (id, data) => {
    let config = {
        method: 'patch',
        url: `http://localhost:5000/clients/${id}`,
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };

    return axios(config);
}

export const deleteClients = (id) => {
    let config = {
        method: 'delete',
        url: `http://localhost:5000/clients/${id}`,
        headers: {
            'Content-Type': 'application/json'
        }
    };

    return axios(config);
}
