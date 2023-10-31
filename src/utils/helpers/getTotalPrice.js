export const getTotalPrice = (product) => {
  let price;
  let totalPrice;
  if (product?.variants[0]?.extraPrice) {
    price = product.price + product.variants[0]?.extraPrice;
    if (product?.priceDiscount?.type == "fixed")
      totalPrice =
        product.price +
        product.variants[0]?.extraPrice -
        product?.priceDiscount?.value;
    else
      totalPrice =
        product.price +
        product.variants[0]?.extraPrice -
        (product?.priceDiscount?.value *
          (product.price + product.variants[0]?.extraPrice)) /
          100;
  } else {
    price = product.price;
    totalPrice = product.price;
  }
  return { price, totalPrice };
};
