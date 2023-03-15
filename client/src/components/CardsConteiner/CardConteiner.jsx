import Card from "../Card/Card"
import style from "./CardConteiner.module.css"
import { useSelector } from "react-redux"
import SearchBar from "../SearchBar/SearchBar"

const CardConteiner = ({ currentPage, setCurrentPage, dogsPerPage }) => {
  const dogs = useSelector((state) => state.dogs);

  const indexOfLastDog = currentPage * dogsPerPage;
  const indexOfFirstDog = indexOfLastDog - dogsPerPage;
  const currentDogs = dogs.slice(indexOfFirstDog, indexOfLastDog);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(dogs.length / dogsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleClick = (event) => {
    setCurrentPage(Number(event.target.id));
  };

  return (
    <div className={style.container}>
  <div className={style.searchBarContainer}>
    <SearchBar />
  </div>
  <div className={style.cardsContainer}>
    {currentDogs.map((dog) => {
      const temperaments = dog.temperaments ? dog.temperaments.map(t => t.name).join(", ") : dog.temperament;
      return (
        <Card
          key={dog.id}
          id={dog.id}
          name={dog.name}
          image={dog.image}
          weight={dog.weight}
          temperaments={temperaments}
        />
      );
    })}
  </div>
  <div className={style.pagination}>
  <div className={style.arrow} onClick={() => setCurrentPage(currentPage - 1)}>{'<'}</div>
  {pageNumbers.map((number) => {
    return (
      <div
        key={number}
        id={number}
        onClick={handleClick}
        className={currentPage === number ? style.active : null}
      >
        {number}
      </div>
    );
  })}
  <div className={style.arrow} onClick={() => setCurrentPage(currentPage + 1)}>{'>'}</div>
</div>
<div className={style.pageInfo}>
  Página {currentPage} de {Math.ceil(dogs.length / dogsPerPage)}
</div>
    </div>
  );
};

export default CardConteiner
