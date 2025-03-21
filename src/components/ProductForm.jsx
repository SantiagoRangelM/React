import React, { useState } from "react";

const ProductForm = ({ onAdd }) => {
  const [product, setProduct] = useState("");
  const [category, setCategory] = useState("");
  const [isUsed, setIsUsed] = useState(false); // Estado para determinar si el equipo es usado     
  const [serial, setSerial] = useState("");      // Serial
  const [numCores, setNumCores] = useState(""); // cores
  const [ram, setRam] = useState(""); // RAM


  const handleSubmit = (e) => {
    e.preventDefault();
    // Validamos que no estén vacíos
    if (product.trim() && serial.trim() && numCores.trim() && category.trim()) {
      // onAdd recibe un objeto con toda la información
      onAdd({
        product,
        serial,
        numCores,
        category,
        ram,
        status: isUsed ? "Usado" : "Nuevo",
      });
      // Limpiar los campos
      setProduct("");
      setSerial("");
      setNumCores("");
      setCategory("");
      setIsUsed(false);
      setRam("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Marca del Equipo"
        value={product}
        onChange={(e) => setProduct(e.target.value)}
      />

      <input
        type="text"
        placeholder="Serial"
        value={serial}
        onChange={(e) => setSerial(e.target.value)}
      />

      <input
        type="number"
        placeholder="Cantidad de RAM (GB)"
        value={ram}
        onChange={(e) => setRam(e.target.value)}
      />


      <select value={category} onChange={(e) => setCategory(e.target.value)}>
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

      <select value={numCores} onChange={(e) => setNumCores(e.target.value)}>
        <option value="">Seleccione número de núcleos</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="4">4</option>
        <option value="6">6</option>
        <option value="8">8</option>
        <option value="12">12</option>
        <option value="16">16</option>
      </select>

      {/* Checkbox para estado del equipo */}
      <label class="checkbox-container">
        <input
          type="checkbox" id="estado-equipo"
          checked={isUsed}
          onChange={() => setIsUsed(!isUsed)}
        />
        Equipo Usado
      </label>

      <button type="submit">Agregar</button>
    </form>
  );
};

export default ProductForm;
