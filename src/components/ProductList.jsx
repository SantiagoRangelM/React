import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProductList = ({ products, onDelete, onEdit }) => {
  const navigate = useNavigate();
  const [editIndex, setEditIndex] = useState(null);
  const [editProduct, setEditProduct] = useState("");
  const [editSerial, setEditSerial] = useState("");
  const [editNumCores, setEditNumCores] = useState("");
  const [editRam, setEditRam] = useState(""); // NUEVO ESTADO PARA LA RAM
  const [editCategory, setEditCategory] = useState("");
  const [editStatus, setEditStatus] = useState(false);
  const [editEntryDate, setEditEntryDate] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        handleCancel();
      }
    };

    if (editIndex !== null) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [editIndex]); // Se ejecuta cuando editIndex cambia

  const handleEdit = (index, product) => {
    setEditIndex(index);
    setEditProduct(product.name);
    setEditSerial(product.serial);
    setEditNumCores(product.numCores);
    setEditRam(product.ram);
    setEditCategory(product.category);
    setEditStatus(product.status === "Usado");
    setEditEntryDate(product.entryDate);
  };

  const handleSave = (index) => {
    if (
      editProduct.trim() &&
      editSerial.trim() &&
      editNumCores.trim() &&
      editRam.trim() &&
      editCategory.trim() &&
      editEntryDate
    ) {
      onEdit(index, {
        name: editProduct,
        serial: editSerial,
        numCores: editNumCores,
        ram: editRam, // Guardamos la RAM
        category: editCategory,
        status: editStatus ? "Usado" : "Nuevo",
        entryDate: editEntryDate
      });
      setEditIndex(null);
    }
  };

  const handleCancel = () => {
    setEditIndex(null);
    setEditProduct("");
    setEditSerial("");
    setEditNumCores("");
    setEditRam("");
    setEditCategory("");
    setEditStatus(false);
  };

  const handleClearSearch = () => { // Función que maneja la limpieza de la búsqueda
    setSearchTerm("");
    setStartDate("");
    setEndDate("");
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      (product.name?.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
      (product.category?.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
      (product.status?.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
      (product.serial?.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
      (String(product.ram).toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
      (String(product.numCores).toLowerCase().includes(searchTerm.toLowerCase()) || false);

    const matchesDateRange =
      (!startDate || product.entryDate >= startDate) &&
      (!endDate || product.entryDate <= endDate);

    return matchesSearch && matchesDateRange;
  });


  return (
    <div>
      <h2>Lista de Productos</h2>

      {/* Barra de búsqueda y filtro de fechas en una sola línea */}
      <div className="filter-container">   {/* Contenedor de la barra de búsqueda y filtro de fechas */}
        <input
          type="text"
          placeholder="Buscar producto..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-box"
        />
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          max={new Date().toISOString().split("T")[0]}
          className="date-filter"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          max={new Date().toISOString().split("T")[0]}
          className="date-filter"
        />
        <button onClick={handleClearSearch} className="clear-btn">Limpiar</button>
      </div> {/* Fin del contenedor de la barra de búsqueda y filtro de fechas */}

      <ul>
        {filteredProducts.map((product, index) => (
          <li key={index} className="product-item">
            <div className="product-content">
              {editIndex === index ? (
                <>
                  <input
                    type="text"
                    value={editProduct}
                    onChange={(e) => setEditProduct(e.target.value)}
                  />
                  <input
                    type="text"
                    value={editSerial}
                    onChange={(e) => setEditSerial(e.target.value)}
                  />

                  {/* Menú desplegable para núcleos */}
                  <select
                    value={editNumCores}
                    onChange={(e) => setEditNumCores(e.target.value)}
                  >
                    <option value="">Seleccione número de núcleos</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="4">4</option>
                    <option value="6">6</option>
                    <option value="8">8</option>
                    <option value="12">12</option>
                    <option value="16">16</option>
                  </select>

                  {/* NUEVO CAMPO: RAM */}
                  <input
                    type="number"
                    placeholder="RAM (GB)"
                    value={editRam}
                    onChange={(e) => setEditRam(e.target.value)}
                  />

                  <select
                    value={editCategory}
                    onChange={(e) => setEditCategory(e.target.value)}
                  >
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

                  <label className="checkbox-container">
                    <input
                      type="checkbox"
                      checked={editStatus}
                      onChange={() => setEditStatus(!editStatus)}
                    />
                    Equipo Usado
                  </label>
                </>
              ) : (
                <span>
                  <strong> Marca:</strong> {product.name} |
                  <strong> Serial:</strong> {product.serial} |
                  <strong> Núcleos:</strong> {product.numCores} |
                  <strong> RAM:</strong> {product.ram} GB |
                  <strong> Categoría:</strong> {product.category} |
                  <strong> Estado:</strong> {product.status}
                </span>
              )}
            </div>
            <div className="button-group">
              {editIndex === index ? (
                <>
                  <button className="save-btn" onClick={() => handleSave(index)}>
                    Guardar
                  </button>
                  <button className="cancel-btn" onClick={handleCancel}>
                    Cancelar
                  </button>
                </>
              ) : (
                <>
                  <button onClick={() => navigate("/detalle-producto", { state: { product, index } })}>
                    Ver Detalles
                  </button>
                  <button className="edit-btn" onClick={() => handleEdit(index, product)}>
                    Editar
                  </button>
                  <button className="delete-btn" onClick={() => onDelete(index)}>
                    Eliminar
                  </button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
