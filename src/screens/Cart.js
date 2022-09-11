import { useContext } from "react";
import { MdDeleteForever } from "react-icons/md";
import { ProductContext } from "../context/product-context";
import styles from "./Cart.module.css";
function Cart() {
  const {
    cartData,
    incrementQuantityHandler,
    decrementQuantityHandler,
    removeProductHandler,
  } = useContext(ProductContext);
  return (
    <div>
      <h1>My Cart</h1>
      <div className={styles.cartSection}>
        {cartData.length !== 0 &&
          cartData.map((data) => (
            <div key={data.id} className={styles.productSection}>
              <div className={styles.subProductSection}>
                <img
                  src={data.imageURL}
                  alt={data.name}
                  className={styles.productImage}
                />
                <div>
                  <p className={styles.productInfo}>
                    <b>{data.name} </b>
                    {data.gender}
                  </p>
                  <p>
                    {data.currency} {data.price}
                  </p>
                  <div>
                    <button onClick={() => incrementQuantityHandler(data)}>
                      +
                    </button>
                    <button disabled>{data.prodQuantity}</button>
                    <button onClick={() => decrementQuantityHandler(data)}>
                      -
                    </button>
                  </div>
                </div>
              </div>
              <div>
                <button
                  className={styles.removeIcon}
                  onClick={() => removeProductHandler(data)}
                >
                  <MdDeleteForever size={30} color="red" />
                </button>
              </div>
            </div>
          ))}
        {cartData.length === 0 ? (
          <>
            <p className={styles.noItemContainer}>
              There is nothing in your cart. Let's add some items
            </p>
          </>
        ) : (
          <div className={styles.totalCartInfo}>
            <p>
              No. of Items :{" "}
              {cartData.reduce(
                (prevValue, currValue) => prevValue + currValue.prodQuantity,
                0
              )}
            </p>
            <p>
              SubTotal : Rs{" "}
              {cartData.reduce(
                (prevValue, currValue) =>
                  prevValue + currValue.price * currValue.prodQuantity,
                0
              )}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
