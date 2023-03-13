import {Link} from "react-router-dom"
import style from "./NavBar.module.css"

const NavBar = ()=>{
    return(
       <div className={style.mainConteiner} >
        
        <Link className={style.link1} to="/home">HOME</Link>
        <h1>The dog app</h1>
        <Link  className={style.link2} to="/create">Form</Link>
       </div>
    )
}

export default NavBar