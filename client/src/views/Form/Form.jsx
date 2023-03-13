import "./Form.css";
import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const Form = () => {
  const [name, setName] = useState("");
  const [heightMin, setHeightMin] = useState("");
  const [heightMax, setHeightMax] = useState("");
  const [weightMin, setWeightMin] = useState("");
  const [weightMax, setWeightMax] = useState("");
  const [lifeSpan, setLifeSpan] = useState("");
  const [image, setImage] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [selectedTemperaments, setSelectedTemperaments] = useState([]);

  const temperaments = useSelector(state => state.temperaments.temperaments);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validations
    if (!name || !heightMin || !heightMax || !weightMin || !weightMax || !lifeSpan || !image || selectedTemperaments.length === 0) {
      alert("Please fill out all fields.");
      return;
    }
    if (name.match(/\d/)) {
      alert("Name should not contain numbers.");
      return;
    }
    if (parseInt(heightMin) >= parseInt(heightMax)) {
      alert("Minimum height should be less than maximum height.");
      return;
    }
    if (parseInt(weightMin) >= parseInt(weightMax)) {
      alert("Minimum weight should be less than maximum weight.");
      return;
    }

    const data = {
      name,
      height: `${heightMin} - ${heightMax}`,
      weight: `${weightMin} - ${weightMax}`,
      life_span: lifeSpan,
      image: image,
      temperaments: selectedTemperaments.map((t) => ({ id: t.id })),
    };
    await axios.post("http://localhost:3001/dogs", data);
    setShowSuccessMessage(true);
    setName("");
    setHeightMin("");
    setHeightMax("");
    setWeightMin("");
    setWeightMax("");
    setLifeSpan("");
    setImage("");
    setSelectedTemperaments([]);
  };

  const handleTemperamentChange = (e) => {
    const options = e.target.options;
    let selectedTemperaments = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedTemperaments = selectedTemperaments.concat(JSON.parse(options[i].value));
      }
    }
    setSelectedTemperaments(selectedTemperaments);
  };


  return (
    <div className="conteiner">
    <form className="form" onSubmit={handleSubmit}>
      
      <label>
        Nombre:   
        <input className="field" type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label className="height">
      Minimun height:
        <input className="field" type="text" value={heightMin} onChange={(e) => setHeightMin(e.target.value)} />
      </label>
      <label>
      Maximum height:
        <input className="field" type="text" value={heightMax} onChange={(e) => setHeightMax(e.target.value)} />
      </label>
      <label className="weight"> 
        Minimum weight:
        <input className="field" type="text" value={weightMin} onChange={(e) => setWeightMin(e.target.value)} />
      </label>
      <label>
      Maximum weight:
        <input  className="field" type="text" value={weightMax} onChange={(e) => setWeightMax(e.target.value)} />
      </label>
      <label className="life">
      Life span:
        <input className="field" type="text" value={lifeSpan} onChange={(e) => setLifeSpan(e.target.value)} />
      </label>
      <label className="image">
      Image:
        <input className="field" type="text" value={image} onChange={(e) => setImage(e.target.value)} />
      </label>
      <label className="temperament">
      Temperaments:
  <select multiple={true} value={selectedTemperaments.map((t) => t.id)} onChange={handleTemperamentChange}>
    {temperaments.map((temperament) => (
      <option key={temperament.id} value={JSON.stringify(temperament)}>
        {temperament.name}
      </option>
    ))}
  </select>
</label>
<div className="field">
  <p>Selected temperaments:</p>
  <ul>
    {selectedTemperaments.map((temperament) => (
      <li key={temperament.id}>{temperament.name}</li>
    ))}
  </ul>
</div>
      <button className="boton" type="submit">Create new race</button>
      {showSuccessMessage && <p>The dog was created correctly!!</p>}

    
    </form>
    </div>
  );
};

export default Form;