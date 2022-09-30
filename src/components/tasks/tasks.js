import axios from "axios";

export const TaskPost = "/tasks/post";
export const TaskGet = "/tasks/get";

export const createTasks = (creds, token) => {
    let config = {
        method: 'post',
        url: 'http://localhost:5000/tasks',
        headers: {
            'token': token,
            'Content-Type': 'application/json'
        },
        data: creds
    };

    return axios(config);

}

export const getTasks = (token) => async (dispatch) => {
    try {
        let config = {
            method: 'get',
            url: 'http://localhost:5000/tasks',
            headers: {
                'token': token,
                'Content-Type': 'application/json'
            }
        };

        let res = await axios(config);
        //console.log(res)
        dispatch({type:TaskGet,payload:res.data});
        return(console.log("Tasks fetched"));
    }
    catch (e) {
        console.log(e);
    }


}

export const patchTasks = (id, data) => {
    let config = {
        method: 'patch',
        url: `http://localhost:5000/tasks/${id}`,
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };

    return axios(config);

}

export const deleteTasks = (id) => {
    let config = {
        method: 'delete',
        url: `http://localhost:5000/tasks/${id}`,
        headers: {
            'Content-Type': 'application/json'
        }
    };

    return axios(config);
}