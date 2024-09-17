import React from 'react';

const CartTable = ({ cart, handleRemove }) => {
  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="card-title">Carrito</h5>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>#</th>
              <th>Código</th>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Precio Unitario</th>
              <th>Total</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, index) => (
              <tr key={item.codigo}>
                <td>{index + 1}</td>
                <td>{item.codigo}</td>
                <td>{item.nombre}</td>
                <td>{item.cantidad}</td>
                <td>${item.precioUnitario.toFixed(2)}</td>
                <td>${item.total.toFixed(2)}</td>
                <td>
                  <button className="btn btn-danger btn-sm" onClick={() => handleRemove(item.codigo)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CartTable;
