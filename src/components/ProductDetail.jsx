import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ProductDetail = ({ onEdit }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;
  const index = location.state?.index;

  const [isEditing, setIsEditing] = useState(false);

  const [editName, setEditName] = useState(product?.name || "");
  const [editCategory, setEditCategory] = useState(product?.category || "");
  const [editStatus, setEditStatus] = useState(product?.status || "");
  const [editSerial, setEditSerial] = useState(product?.serial || "");
  const [editNumCores, setEditNumCores] = useState(product?.numCores || "");
  const [editRam, setEditRam] = useState(product?.ram || "");
  const [editEntryDate, setEditEntryDate] = useState(product?.entryDate || "");

  if (!product) {
    return <p>No hay datos disponibles.</p>;
  }

  const handleSave = () => {
    const updatedProduct = {
      name: editName,
      category: editCategory,
      status: editStatus,
      serial: editSerial,
      numCores: editNumCores,
      ram: editRam,
      entryDate: editEntryDate,
    };

    if (onEdit && typeof index === "number") {
      onEdit(index, updatedProduct);
    }

    setIsEditing(false);
    navigate(-1); // volver atrás después de guardar
  };

  const handleCancel = () => {
    setEditName(product.name);
    setEditCategory(product.category);
    setEditStatus(product.status);
    setEditSerial(product.serial);
    setEditNumCores(product.numCores);
    setEditRam(product.ram);
    setEditEntryDate(product.entryDate);
    setIsEditing(false);
  };

  return (
    <div className="detail-container">
      <h2>Detalles del Producto</h2>
      <table className="detail-table">
        <tbody>
          <tr>
            <th>Marca del Equipo</th>
            <td>
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                />
              ) : (
                product.name
              )}
            </td>
          </tr>
          <tr>
            <th>Sala</th>
            <td>
              {isEditing ? (
                <select
                  name="category"
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
              ) : (
                product.category
              )}
            </td>
          </tr>
          <tr>
            <th>Estado</th>
            <td>
              {isEditing ? (
                <select
                  name="status"
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value)}
                >
                  <option value="">Seleccione el estado</option>
                  <option value="Nuevo">Nuevo</option>
                  <option value="Usado">Usado</option>
                </select>
              ) : (
                product.status
              )}
            </td>
          </tr>
          <tr>
            <th>Serial</th>
            <td>
              {isEditing ? (
                <input
                  type="text"
                  name="serial"
                  value={editSerial}
                  onChange={(e) => setEditSerial(e.target.value)}
                />
              ) : (
                product.serial
              )}
            </td>
          </tr>
          <tr>
            <th>Núcleos</th>
            <td>
              {isEditing ? (
                <input
                  type="number"
                  name="numCores"
                  value={editNumCores}
                  onChange={(e) => setEditNumCores(e.target.value)}
                  min="1"
                />
              ) : (
                product.numCores
              )}
            </td>
          </tr>
          <tr>
            <th>RAM (GB)</th>
            <td>
              {isEditing ? (
                <input
                  type="number"
                  name="ram"
                  value={editRam}
                  onChange={(e) => setEditRam(e.target.value)}
                  min="1"
                />
              ) : (
                product.ram
              )}
            </td>
          </tr>
          <tr>
            <th>Fecha de Ingreso</th>
            <td>
              {isEditing ? (
                <input
                  type="date"
                  name="entryDate"
                  value={editEntryDate}
                  onChange={(e) => setEditEntryDate(e.target.value)}
                  max={new Date().toISOString().split("T")[0]}
                />
              ) : (
                product.entryDate
              )}
            </td>
          </tr>
        </tbody>
      </table>

      <div className="button-group">
        {isEditing ? (
          <>
            <button className="save-btn" onClick={handleSave}>Guardar</button>
            <button className="cancel-btn" onClick={handleCancel}>Cancelar</button>
          </>
        ) : (
          <>
            <button className="edit-btn" onClick={() => setIsEditing(true)}>Editar</button>
            <button className="back-button" onClick={() => navigate(-1)}>Volver</button>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
