import { useEffect } from "react";
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { createClient, getClients } from "./clients/clients";


export default function Clients(){
    const { data } = useSelector((store) => store.login);
    const {allClients} = useSelector((store)=>store.client)
    //console.log(data)

    
    const dispatch = useDispatch();
    
    //let data = "633405068c91f635cc739af0:admin@gmail.com:Admin"

    const [form,setForm] = useState({});
    
    
    const handleChange = (e)=>{
        const {name,value} = e.target;
        setForm({...form,[name]:value});
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log(form);
        if(data && data._id){
            let token = data._id;
            createClient(form,token);
            //dispatch(getClients(token));
            setTimeout(()=>{
                dispatch(getClients(token))
            },500);
        }
        
    };

    useEffect(()=>{
        if(data){
            if(data._id){
                let token = data._id;
                dispatch(getClients(token));
            }
        }
        
    },[data])
    return(<>
    <div>Clients</div>
        <form onSubmit={handleSubmit}>
            <input placeholder="name" name="name" onChange={handleChange}/>
            <br />
            <input placeholder="email" name="email" onChange={handleChange}/>
            <br />
            <button type="submit" >Submit</button>
        </form>
        <br />
        {allClients && allClients.map((el,i)=>{
            return <div key={i}>{el._id} : {el.name}</div>
        })}
    </>)
}