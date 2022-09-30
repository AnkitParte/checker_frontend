import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProjects } from "./projects/projects";
import { createTasks, deleteTasks, getTasks, patchTasks } from "./tasks/tasks";



export default function Tasks(){
    const [form, setForm] = useState({});

    const {allProjects} = useSelector((store)=>store.project)
    const {data} = useSelector((store)=>store.login)
    const {allTasks} = useSelector((store)=>store.task)

    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(form);
        //createClient(form, data);
        if(data && data._id){
            let token = data._id;
            createTasks(form,token);
            dispatch(getTasks(token))
            setTimeout(()=>{
                dispatch(getTasks(token));
            },500);
        }
        Array.from(document.querySelectorAll("input")).forEach((el)=>el.value=null);
        setForm({});
    };

    const handleDelete = (id)=>{
        deleteTasks(id);
        let token = data._id
        setTimeout(()=>{
            dispatch(getTasks(token))
        },500)
        
    }

    const handleStatus = (id,body)=>{
        patchTasks(id,body);
        let token = data._id
        setTimeout(()=>{
            dispatch(getTasks(token))
        },500)
        
    }

    useEffect(()=>{
        if(data && data._id){
            let token = data._id;
            dispatch(getProjects(token))
            dispatch(getTasks(token))
        }
    },[data])
    return(<>
    <div>Tasks</div>
    <form onSubmit={handleSubmit}>
        <input placeholder="task name" name="taskName" onChange={handleChange}/>
        <select placeholder="project name" name="projectName" onChange={handleChange}>
            <option value={"none"}>none</option>
            {allProjects && allProjects.map((el,i)=>{
                return <option key={i} value={el.projectName}>{el.projectName} : {el.clientName}</option>
            })}
        </select>
        <input placeholder="clientName" name="clientName" onChange={handleChange}/>
        <button type="submit">add task</button>
    </form>
    <br />
    {allTasks && allTasks.map((el)=>{
        return <div>{el.taskName} : {el.projectName} : {el.clientName} : <button onClick={()=>handleDelete(el._id)}>delete Task</button>
            <button onClick={()=>handleStatus(el._id,{status:!el.status})}>{el.status?"Done":"Undone"}</button>
        </div>
    })}
    </>)
}
