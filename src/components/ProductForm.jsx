import React, { useState } from "react";

const ProductForm = ({ onAdd }) => {
  const [product, setProduct] = useState("");
  const [category, setCategory] = useState("");
  const [isUsed, setIsUsed] = useState(false); // Estado para determinar si el equipo es usado     
  const [serial, setSerial] = useState("");      // Serial
  const [numCores, setNumCores] = useState(""); // cores
  const [ram, setRam] = useState(""); // RAM
  const [entryDate, setEntryDate] = useState(""); // Estado para la fecha de ingreso


  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar que la fecha no sea futura
    const today = new Date().toISOString().split("T")[0]; // Obtiene la fecha actual en formato YYYY-MM-DD
    if (entryDate > today) { // Compara la fecha de ingreso con la fecha actual
      alert("La fecha de ingreso no puede ser futura.");
      return;
    }

    // Validamos que no estén vacíos
    if (product.trim() && serial.trim() && numCores.trim() && category.trim() && entryDate) {
      // onAdd recibe un objeto con toda la información
      onAdd({
        name: product,
        serial,
        numCores,
        category,
        ram,
        status: isUsed ? "Usado" : "Nuevo",
        entryDate
      });
      // Limpiar los campos
      setProduct("");
      setSerial("");
      setNumCores("");
      setCategory("");
      setIsUsed(false);
      setRam("");
      setEntryDate("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-container">
        <input
          type="text"
          placeholder="Marca del Equipo"
          value={product}
          onChange={(e) => setProduct(e.target.value)}
          className="marca-box"
        />

        <input
          type="text"
          placeholder="Serial"
          value={serial}
          onChange={(e) => setSerial(e.target.value)}
          className="serial-box"
        />

        <input
          type="number"
          placeholder="Cantidad de RAM (GB)"
          value={ram}
          onChange={(e) => setRam(e.target.value)}
          className="ram-box"
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)} className="sala-box">
          <option value="">Seleccione la Sala</option>
          <optgroup label="Edificio Giordano">
            <option value="Sala 1E">Sala 1E</option>
            <option value="Lab. Software">Lab. Software</option>
          </optgroup>
          <optgroup label="Edificio Santo Domingo">
            <option value="Sala 1F">Sala 1F</option>
            <option value="Sala 2F">Sala 2F</option>
          </optgroup>
        </select>

        <select value={numCores} onChange={(e) => setNumCores(e.target.value)} className="core-box">
          <option value="">Seleccione número de núcleos</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="4">4</option>
          <option value="6">6</option>
          <option value="8">8</option>
          <option value="12">12</option>
          <option value="16">16</option>
        </select>

        <label>Fecha de ingreso del equipo:</label>
        <input
          type="date"
          value={entryDate}
          onChange={(e) => setEntryDate(e.target.value)}
          max={new Date().toISOString().split("T")[0]}
          required
          className="date-filter"
        />

        <label className="checkbox-container">
          <input
            type="checkbox"
            id="estado-equipo"
            checked={isUsed}
            onChange={() => setIsUsed(!isUsed)}
          />
          Equipo Usado
        </label>
      </div>

      <button type="submit" className="button-group">Agregar</button>
    </form>

  );
};

export default ProductForm;
