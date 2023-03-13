import { getDog } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import style from "./Detail.module.css";
import defaultImage from "./default_image.gif";

const Detail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const detail = useSelector((state) => state.dog);
  const [loading, setLoading] = useState(true);
  


  useEffect(() => {
    setLoading(true);
    dispatch(getDog(id)).then(() => setLoading(false));
  }, [dispatch, id]);

  
  return (
    <div className={style.container}>
      {loading ? (
        <div className={style.loadingContainer}>
          <img className={style.loadingImage} src={defaultImage} alt="Loading..." />
        </div>
      ) : (
        <div className={style.cardDetail}>
          <img className={style.images} src={detail.image}/>
          <div className={style.cardl}>
            <h2>ID: {detail.id}</h2>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <h2>Breeds: {detail.name}</h2>
            <br></br>
            <br></br>
            <br></br>
            <p>Weight: {detail.weight}</p>
            <br></br>
            <p>Height: {detail.height}</p>
            <br></br>
            <p>Temperament: {detail.temperament}</p>
            <br></br>
            <p>Life Span: {detail.life_span}</p>
            <br></br>
          </div>
        </div>
      )}
    </div>
  );
};

export default Detail;
