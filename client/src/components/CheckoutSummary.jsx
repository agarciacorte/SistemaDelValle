import React from 'react';

const CheckoutSummary = ({ total }) => {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Resumen de Venta</h5>
        <p>Total a Pagar: $<span>{total.toFixed(2)}</span></p>
        <button className="btn btn-success">Procesar Pago</button>
        <button className="btn btn-danger">Cancelar Venta</button>
      </div>
    </div>
  );
};

export default CheckoutSummary;
