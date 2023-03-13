import { GET_DOGS, GET_DOG, GET_DOG_BY_NAME, GET_TEMPERAMENTS,GET_DOGS_BY_TEMPERAMENT } from "./actions"

const initialState= {
  dogs:[],
  dog:{},
  name:{},
  temperaments:[]
}
const rootReducer = (state= initialState, action)=>{
  switch(action.type){
    case GET_DOGS:
      return {...state, dogs: action.payload}
    case GET_DOG:
      return{
        ...state,
        dog: action.payload
      }
    case GET_DOG_BY_NAME:
      return{
        ...state,
        name: action.payload
      }
    case GET_TEMPERAMENTS:
      console.log(action.payload);
      return{
        ...state,
        temperaments: action.payload
      }
      case GET_DOGS_BY_TEMPERAMENT:
        return{
          ...state,
          dogs: action.payload
        }
    default:
      return {...state}
  } 
}

export default rootReducer

