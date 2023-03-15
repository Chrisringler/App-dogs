import axios from "axios"
export const  GET_DOGS = "GET_DOGS"
export const GET_DOG  = "GET_DOG"
export const GET_DOG_BY_NAME = "GET_DOG_BY_NAME"
export const GET_TEMPERAMENTS = "GET_TEMPERAMENTS"
export const GET_DOGS_BY_TEMPERAMENT = "GET_DOGS_BY_TEMPERAMENT"


export const getDogs = (a,b ,sortType, sortProperty) => {
  return async function (dispatch) {
    const apiData = await axios.get("http://localhost:3001/dogs");
    let dogs = apiData.data;
    if (sortProperty === "name") {
      dogs.sort((a, b) =>
        sortType === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
      );
    } else if (sortProperty === "weight") {
      dogs.sort((a, b) => {
        const aWeight = parseFloat(a.weight.split(" - ")[0]);
        const bWeight = parseFloat(b.weight.split(" - ")[0]);
        return sortType === "asc" ? aWeight - bWeight : bWeight - aWeight;
      });
    }
    dispatch({ type: GET_DOGS, payload: dogs });
  };
};


 export const getDog = (id)=>{
  return async function(dispatch){
    const apiData = await axios.get(`http://localhost:3001/dogs/${id}`)
    const dog = apiData.data;
    dispatch({type: GET_DOG, payload: dog})
  }
 }

 export const getDogByName = (name)=>{
  return async function(dispatch){
    const apiData = await axios.get(`http://localhost:3001/dogs?name=${name}`)
    const dog = apiData.data[0];
    dispatch({type: GET_DOG_BY_NAME, payload: dog})
  }
}


export const getTemperaments = ()=>{
  return async function(dispatch){
    const apiData = await axios.get(`http://localhost:3001/temperaments`)
    const temperaments = apiData.data;
    dispatch({type: GET_TEMPERAMENTS, payload: temperaments})
    
  }
 }

 

 export const getDogsByTemperament = (temperament) => {
  return async function (dispatch) {
    const apiData = await axios.get("http://localhost:3001/dogs");
    let dogs = apiData.data;
    const filteredDogs = dogs.filter(dog => {
      if (dog.temperament) {
        const temperaments = dog.temperament?.split(',').map((t) => t.trim()) || [];
        return temperaments.includes(temperament);
      }
      return false;
    });
    dispatch({ type: GET_DOGS_BY_TEMPERAMENT, payload: filteredDogs });
  };
};

export const getDogsBySource = (source) => async (dispatch) => {

    const response = await axios.get("http://localhost:3001/dogs");
    const dogs = response.data.filter((dog) => {
      if (source === "api") {
        return typeof dog.id === "number";
      } else {
        return typeof dog.id === "string";
      }
    });
    dispatch({
      type: GET_DOGS,
      payload: dogs
    });
 
};
