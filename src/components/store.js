
import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import thunk from "redux-thunk";
import { ClientFetch } from "./clients/clients";
import { ProjectGet } from "./projects/projects";
import { TaskGet } from "./tasks/tasks";
import { ERROR, LOADING, LOGIN } from "./users/users";


const initial = {
    data: {},
    isAuth: false,
    error: false,
    loading: false
}



export function loginReducer(state = initial, { type, payload }) {
    switch (type) {
        case LOGIN: {
            return { ...state, data: payload.token, isAuth: true, loading: false, error: false }
        }
        case LOADING: {
            return { ...state, loading: true }
        }
        case ERROR: {
            return { ...state, error: true }
        }
        default: {
            return state;
        }
    }
}

const client = {allClients:[]}
export function clientReducer(state = client, { type, payload }) {
    switch (type) {
        case ClientFetch: {
            return { ...state, allClients:payload }
        }
        default: {
            return state;
        }
    }
}

const projects = {allProjects:[]};
export function projectReducer(state=projects,{type,payload}){
    switch (type) {
        case ProjectGet: {
            return { ...state, allProjects:payload }
        }
        default: {
            return state;
        }
    }
}

const tasks = {allTasks:[]};
export function taskReducer(state=tasks,{type,payload}){
    switch (type) {
        case TaskGet: {
            return { ...state, allTasks:payload }
        }
        default: {
            return state;
        }
    }
}

const rootReducer = combineReducers({
    login: loginReducer,
    client: clientReducer,
    project: projectReducer,
    task: taskReducer
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))