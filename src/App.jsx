import React, { useState, useEffect } from "react";
import ProductList from "./components/ProductList";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductForm from "./components/ProductForm";
import ProductDetail from "./components/ProductDetail";
import "./index.css";

const App = () => {
  const [products, setProducts] = useState([]);
  const [theme, setTheme] = useState("light"); // Estado para el tema de la aplicación (light, dark, blue)  

  

  useEffect(() => {
    const savedProducts = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(savedProducts);

    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.body.classList.add(savedTheme);
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem("products", JSON.stringify(products));
    }
  }, [products]);

  const addProduct = (product) => {
    const updatedProducts = [...products, product];
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  };

  const deleteProduct = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  };

  const editProduct = (index, newProduct) => {
    const updatedProducts = products.map((product, i) =>
      i === index ? newProduct : product
    );
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  };

  const toggleTheme = () => { // Función que cambia el tema de la aplicación
    const newTheme = theme === "light"
      ? "dark"
      : theme === "dark"
        ? "blue"
        : theme === "blue"
          ? "green"
          : theme === "green"
            ? "orange"
            : "light"; // Cambia el tema actual al siguiente en el ciclo (light -> dark -> blue -> light) 
    document.body.classList.remove(theme);
    document.body.classList.add(newTheme);
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return ( // Renderiza el formulario y la lista de productos
    <Router>
      <div className="container">
        <button className="theme-toggle" onClick={toggleTheme}>
          {
            theme === "light"
              ? "🌙 Modo Oscuro"
              : theme === "dark"
                ? "🔵 Modo Azul"
                : theme === "blue"
                  ? "🟢 Modo Verde"
                  : theme === "green"
                    ? "🟠 Modo Naranja"
                    : "☀️ Modo Claro"
          }
        </button>
        <h1>Inventario de Equipos de la USTA</h1>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <ProductForm onAdd={addProduct} />
                <ProductList products={products} onDelete={deleteProduct} onEdit={editProduct} />

              </>
            }
          />
          <Route path="/detalle-producto" element={<ProductDetail onEdit={editProduct} />} />
        </Routes>
      </div>
    </Router>

  );
};

export default App;
