import axios from "axios";

export const LOGIN = "/login";
export const ERROR = "/error";
export const LOADING = "/loading";

export const login = (creds) => async (dispatch) => {
    dispatch({ type: LOADING });
    try{
        let res = await axios.post('http://localhost:5000/users/login',creds);
        dispatch({type:LOGIN,payload:res.data});
        console.log(res.data);
    }
    catch(e){
        dispatch({type: ERROR})
    }
}