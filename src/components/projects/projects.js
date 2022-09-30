import axios from "axios";

// export const CLIENTPOST = "/clients/post";
// export const CLIENTERR = "/clients/error";
// export const CLIENTLOAD = "/clients/loading";
export const ProjectPost = "/project/post";
export const ProjectGet = "/project/get";

export const createProject = (creds, token) => {
    let config = {
        method: 'post',
        url: 'http://localhost:5000/projects',
        headers: {
            'token': token,
            'Content-Type': 'application/json'
        },
        data: creds
    };

    return axios(config);

}

export const getProjects = (token) => async (dispatch) => {
    try {
        let config = {
            method: 'get',
            url: 'http://localhost:5000/projects',
            headers: {
                'token': token,
                'Content-Type': 'application/json'
            }
        };

        let res = await axios(config);
        //console.log(res)
        dispatch({type:ProjectGet,payload:res.data});
        return(console.log("projects fetched"));
    }
    catch (e) {
        console.log(e);
    }


}

export const patchProject = (id, data) => {
    let config = {
        method: 'patch',
        url: `http://localhost:5000/projects/${id}`,
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };

    return axios(config);

}

export const deleteProjects = (id) => {
    let config = {
        method: 'delete',
        url: `http://localhost:5000/projects/${id}`,
        headers: {
            'Content-Type': 'application/json'
        }
    };

    return axios(config);
}