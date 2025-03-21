import { useState } from "react";

const ProductList = ({ products, onDelete, onEdit }) => {
  const [editIndex, setEditIndex] = useState(null);
  const [editProduct, setEditProduct] = useState("");
  const [editSerial, setEditSerial] = useState("");
  const [editNumCores, setEditNumCores] = useState("");
  const [editRam, setEditRam] = useState(""); // NUEVO ESTADO PARA LA RAM
  const [editCategory, setEditCategory] = useState("");
  const [editStatus, setEditStatus] = useState(false);

  const handleEdit = (index, product) => {
    setEditIndex(index);
    setEditProduct(product.product);
    setEditSerial(product.serial);
    setEditNumCores(product.numCores);
    setEditRam(product.ram);
    setEditCategory(product.category);
    setEditStatus(product.status === "Usado");
  };

  const handleSave = (index) => {
    if (
      editProduct.trim() &&
      editSerial.trim() &&
      editNumCores.trim() &&
      editRam.trim() &&
      editCategory.trim()
    ) {
      onEdit(index, {
        product: editProduct,
        serial: editSerial,
        numCores: editNumCores,
        ram: editRam, // Guardamos la RAM
        category: editCategory,
        status: editStatus ? "Usado" : "Nuevo",
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

  return (
    <div>
      <h2>Lista de Productos</h2>
      <ul>
        {products.map((product, index) => (
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
                  <strong>Marca:</strong> {product.product} | 
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
