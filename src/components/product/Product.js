import { useContext } from "react";
import styles from "./Product.module.css";
import { ProductContext } from "../../context/product-context";

function Product({ prodData }) {
  const {
    cartData,
    addToCart,
    incrementQuantityHandler,
    decrementQuantityHandler,
  } = useContext(ProductContext);

  const { imageURL, name, price, gender } = prodData;
  function addProductHandler() {
    addToCart(prodData);
  }
  return (
    <div className={styles.productContainer}>
      <div>
        <img
          src={imageURL}
          alt={name}
          style={styles.prodImage}
          height={200}
          width={200}
          className={styles.productPic}
        />
        <div className={styles.prodInfo}>
          <p>{name}</p>
          <p>{gender}</p>
        </div>
        <div className={styles.subProductContainer}>
          <div>Rs {price}</div>
          {!cartData.find((item) => item.id === prodData.id) ? (
            <div>
              <button className={styles.cartButton} onClick={addProductHandler}>
                Add to Cart
              </button>
            </div>
          ) : (
            <div>
              <button onClick={() => incrementQuantityHandler(prodData)}>
                +
              </button>
              <button disabled>
                {cartData.find((item) => item.id === prodData.id) &&
                  cartData.find((item) => item.id === prodData.id).prodQuantity}
              </button>
              <button onClick={() => decrementQuantityHandler(prodData)}>
                -
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Product;
