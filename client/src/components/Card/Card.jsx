import { Link } from "react-router-dom";
import './Card.css';

const Card = (props)=>{
   
    return(

        <Link to={`/detail/${props.id}`}>
        <div className="card">
            <div className="face front">
            <img src={props.image} />
         <h2 className="title">{props.name}</h2>
        </div>
        <div className="face back">
            <h2>{props.name}</h2>
        <p>weight: {props.weight}</p>
         <p>temperaments: {props.temperaments}</p>
         </div>
        </div>
        </Link>

    )
}

export default Card