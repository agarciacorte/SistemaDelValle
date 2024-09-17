import React, { useState } from 'react';

const ProductForm = ({ addToCart }) => {
  const [codigo, setCodigo] = useState('');
  const [cantidad, setCantidad] = useState(1);
  const [producto, setProducto] = useState({ codigo: '', nombre: '', precioUnitario: 0 });

  const fetchProduct = async () => {
    // Simulación de búsqueda de producto por código
    // Aquí deberías hacer una solicitud a tu backend para obtener el producto
    if (codigo) {
      setProducto({ codigo, nombre: 'Producto Ejemplo', precioUnitario: 10.00 });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (producto.codigo) {
      addToCart(producto, cantidad);
      setCodigo('');
      setCantidad(1);
      setProducto({ codigo: '', nombre: '', precioUnitario: 0 });
    }
  };

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="card-title">Agregar Producto</h5>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="codigoProducto" className="form-label">Código de Producto</label>
            <input
              type="text"
              className="form-control"
              id="codigoProducto"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
              onBlur={fetchProduct}
              placeholder="Introduce el código"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="cantidadProducto" className="form-label">Cantidad</label>
            <input
              type="number"
              className="form-control"
              id="cantidadProducto"
              value={cantidad}
              onChange={(e) => setCantidad(parseInt(e.target.value, 10))}
              min="1"
            />
          </div>
          <button type="submit" className="btn btn-primary">Agregar al Carrito</button>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
