export const getVariantPrice = (product, variant) => {
  let totalPrice;
  if (variant?.extraPrice) {
    if (product?.priceDiscount?.type == "fixed")
      totalPrice =
        product.price + variant?.extraPrice - product?.priceDiscount?.value;
    else
      totalPrice =
        product.price +
        variant?.extraPrice -
        (product?.priceDiscount?.value *
          (product.price + variant?.extraPrice)) /
          100;
  } else {
    totalPrice = product.price;
  }
  return { totalPrice };
};
