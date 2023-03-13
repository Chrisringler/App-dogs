import {Link} from "react-router-dom"
import style from "./Landing.module.css"
import { getTemperaments } from "../../redux/actions"
import { useDispatch } from "react-redux"
import { useEffect } from "react"

const Landing = ()=>{
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getTemperaments());
      }, [getTemperaments()]);
    return(
        <div className={style.landing}>
        <h1>The Dog App</h1>
         <Link className={style.home} to="/home"> Home</Link>
         </div>
        
    )
}

export default Landing