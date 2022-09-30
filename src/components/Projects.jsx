import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getClients } from "./clients/clients";
import { createProject, getProjects } from "./projects/projects";


let style = {
    padding:"2px"
}
export default function Projects() {
    const {allClients} = useSelector((store)=>store.client);
    const {data} = useSelector((store)=>store.login);
    const {allProjects} = useSelector((store)=>store.project)

    console.log(data);
    const dispatch = useDispatch();


    const [form, setForm] = useState({});



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
            createProject(form,token);
            
            setTimeout(()=>{
                dispatch(getProjects(token));
            },500);
        }
        Array.from(document.querySelectorAll("input")).forEach((el)=>el.value=null);
        setForm({});
    };

    useEffect(()=>{
        if(data){
            if(data._id){
                let token = data._id;
                dispatch(getClients(token));
                dispatch(getProjects(token));
            }
        }
        
    },[data])

    return (<>
        <div>
            <form onSubmit={handleSubmit}>
                <input placeholder="enter title" name="projectName" style={style} onChange={handleChange}/>
                <select style={style} name="clientName" placeholder="choose client" onChange={handleChange}>
                    <option defaultValue={"none"} >none</option>
                    {allClients && allClients.map((el,i)=>{
                        return <option key={i} value={`${el.name}`}>{el.name}</option>
                    })}
                </select>
                <input placeholder="enter currency > 40" name="currency" style={style} onChange={handleChange}/>
                <br />
                <button type="submit">add client</button>
            </form>
            <br />
            {allProjects && allProjects.map((el,i)=>{
                return <SubProject projectName={el.projectName} clientName={el.clientName} status={el.status} key={i}/>
            })}
        </div>
    </>)
}

function SubProject({projectName,clientName,status}){
    let display = {display:"flex",padding:"2px",justifyContent:"space-around"}
    return(<>
        <div style={display}>
            <div>{projectName}</div>
            <div>{clientName}</div>
            <div><button>{status?"Complete":"Pending"}</button></div>
        </div>
    </>)
}