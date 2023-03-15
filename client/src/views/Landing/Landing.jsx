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
          <div className={style.content}>
        <h1 className={style.title}>The Dog App</h1>
         <Link className={style.home} to="/home"> Home</Link>
         </div>
         </div>
    )
}

export default Landing