import CardConteiner from "../../components/CardsConteiner/CardConteiner"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {getDogs, getDogsByTemperament, getDogsBySource}  from "../../redux/actions"
import style from "./Home.module.css"

const Home = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [dogsPerPage] = useState(8);
  const [sortType, setSortType] = useState("asc");
  const [sortProperty, setSortProperty] = useState("name");
  const [metricWeight, setMetricWeight] = useState(false);
  const [temperamentFilter, setTemperamentFilter] = useState("");
  const [sourceFilter, setSourceFilter] = useState("all");
  const temperaments = useSelector(state => state.temperaments.temperaments);

  
  const handleSourceChange = (event) => {
    const { value } = event.target;
    setSourceFilter(value);
  };
  
  useEffect(() => {
    if (temperamentFilter === "") {
      if (sourceFilter === "all") {
        dispatch(getDogs(currentPage, dogsPerPage, sortType, sortProperty, metricWeight));
      } else {
        dispatch(getDogsBySource(sourceFilter));
      }
    } else {
      dispatch(getDogsByTemperament(temperamentFilter));
    }
  }, [dispatch, currentPage, dogsPerPage, sortType, sortProperty, metricWeight, temperamentFilter, sourceFilter]);
  
  

  const handleSortChange = (event) => {
    const { value } = event.target;
    if (value === "name-asc" || value === "name-desc") {
      setSortProperty("name");
    } else if (value === "weight-asc" || value === "weight-desc") {
      setSortProperty("weight");
      setMetricWeight(true);
    }
    if (value === "name-asc" || value === "weight-asc") {
      setSortType("asc");
    } else if (value === "name-desc" || value === "weight-desc") {
      setSortType("desc");
    }
  };
  const handleTemperamentChange = (value) => {
    setTemperamentFilter(value);
    dispatch(getDogsByTemperament(value));
  };
  console.log("temperaments:", temperaments);
  return (
    <div className={style.home}>
      <div className={style.sortContainer}>
        <label htmlFor="sort-select">Sort by:</label>
        <select id="sort-select" onChange={handleSortChange}>
          <option value="name-asc">Name (A-Z)</option>
          <option value="name-desc">Name (Z-A)</option>
          <option value="weight-asc">Weight (Low to High)</option>
          <option value="weight-desc">Weight (High to Low)</option>
        </select>
      </div>
      <div className={style.temperamentContainer}>
  <label htmlFor="temperament-select">Sort by temperament: </label>
  <select id="temperament-select" onChange={(e) => handleTemperamentChange(e.target.value)}>
  <option value="">Temperament</option>
  {Array.isArray(temperaments) && temperaments.map((temperament) => (
    <option value={temperament.name} key={temperament.id}>
      {temperament.name}
    </option>
  ))}
</select>
</div>
<div className={style.sourceContainer}>
  <label htmlFor="source-select">Source: </label>
  <select id="source-select" onChange={handleSourceChange}>
    <option value="all">All</option>
    <option value="api">API</option>
    <option value="database">Database</option>
  </select>
</div>

      <CardConteiner
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        dogsPerPage={dogsPerPage}
      />
    </div>
  );
};
export default Home


//  const temperaments = ["Stubborn", "Curious", "Playful", "Adventurous", "Active", "Fun-loving", "Aloof", "Clownish", "Dignified", "Independent", "Happy", "Wild", "Hardworking", "Dutiful", "Outgoing", "Friendly", "Alert", "Confident", "Intelligent", "Courageous", "Loyal", "Responsive", "Faithful", "Docile", "Composed", "Receptive", "Protective", "Trainable", "Responsible", "Gentle", "Affectionate", "Devoted", "Assertive", "Dominant", "Obedient", "Reserved", "Kind", "Sweet-Tempered", "Attentive", "Tenacious", "Companionable", "Even-Tempered", "Rugged", "Fierce", "Refined", "Joyful", "Agile", "Sensitive", "Adaptable", "Trusting", "Territorial", "Keen", "Responsive", "Feisty", "Cheerful", "Self-confident", "Hardy", "Calm", "Good-tempered", "Watchful", "Hard-working"];