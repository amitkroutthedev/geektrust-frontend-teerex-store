import { useContext } from "react";
import Product from "../product/Product";
import { ProductContext } from "../../context/product-context";
import styles from "./ProductList.module.css";

function ProductList() {
  const { searchResult } = useContext(ProductContext);

  var catelogueData = searchResult;

  if (catelogueData === undefined) {
    return <div>Loading...</div>;
  }
  if (catelogueData.length === 0) {
    return <div>No items found...</div>;
  }
  let catelogueList = (
    <div>
      {catelogueData.map((data) => (
        <div key={data.id}>
          <Product prodData={data} />
        </div>
      ))}
    </div>
  );

  return <div className={styles.productListContainer}>{catelogueList}</div>;
}

export default ProductList;
