import { useContext } from "react";
import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Badge from "@mui/material/Badge";
import { ProductContext } from "../../context/product-context";
import styles from "./Navbar.module.css";
function NavBar() {
  const { cartData } = useContext(ProductContext);
  return (
    <div className={styles.navbarContainer}>
      <div>
        <h1>TeeRex Store</h1>
      </div>
      <div className={styles.subNavContainer}>
        <div>
          <Link to="/" className={styles.products}>
            <p className={styles.product}>Products</p>
          </Link>
        </div>
        <Link to="/cart">
          <div className={styles.iconContainer}>
            <Badge
              badgeContent={cartData.reduce(
                (prevValue, currValue) => prevValue + currValue.prodQuantity,
                0
              )}
              color="primary"
            >
              <AiOutlineShoppingCart
                className={styles.cartIcon}
                color="black"
              />
            </Badge>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default NavBar;
