import React from 'react';

interface Props {
  product: string;
}

export default function Product({ product }: Props) {
  console.log(product);
  return <div>Product</div>;
}
