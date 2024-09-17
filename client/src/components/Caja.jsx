import React, { useState } from 'react';
import ProductForm from './ProductForm';
import CartTable from './CartTable';
import CheckoutSummary from './CheckoutSummary';

const Caja = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  const addToCart = (product, quantity) => {
    const existingProduct = cart.find(item => item.codigo === product.codigo);

    if (existingProduct) {
      existingProduct.cantidad += quantity;
      existingProduct.total = existingProduct.cantidad * existingProduct.precioUnitario;
      setCart([...cart]);
    } else {
      setCart([...cart, { ...product, cantidad: quantity, total: product.precioUnitario * quantity }]);
    }

    calculateTotal();
  };

  const calculateTotal = () => {
    const totalPagar = cart.reduce((acc, item) => acc + item.total, 0);
    setTotal(totalPagar);
  };

  const handleRemove = (codigo) => {
    setCart(cart.filter(item => item.codigo !== codigo));
    calculateTotal();
  };

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-6">
          <ProductForm addToCart={addToCart} />
        </div>
        <div className="col-md-6">
          <CartTable cart={cart} handleRemove={handleRemove} />
        </div>
      </div>
      <CheckoutSummary total={total} />
    </div>
  );
};

export default Caja;
