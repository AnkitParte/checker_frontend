import { Link } from "react-router-dom"

let routes = [
    {
        name:"Login",
        to:"/login"
    },
    {
        name:"Clients",
        to:"/clients"
    },
    {
        name:"Tasks",
        to:"/tasks"
    },
    {
        name:"Projects",
        to:"/projects"
    }
]

export default function Navbar(){
    return(<>
        <div style={{width:"80%",display:"flex",justifyContent:"space-around"}}>
        {routes && routes.map((el,i)=>{
            return <Link key={i} to={el.to}>{el.name}</Link>
        })}
        </div>
    </>)
}