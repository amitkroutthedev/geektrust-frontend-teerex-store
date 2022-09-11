import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const ProductContext = createContext({});
export const FILTERS = {
  COLOR: "color",
  GENDER: "gender",
  PRICE: "price",
  TYPE: "type",
};
function ProductContextProvider({ children }) {
  const [productData, setProductData] = useState();
  const [cartData, setCartData] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchResult, setSearchResult] = useState(productData);
  const [filterListTypes, setFilterListTypes] = useState({
    colourTypes: [],
    genderTypes: [],
    priceRangeTypes: [],
    productTypes: [],
  });
  useEffect(() => {
    axios
      .get(
        "https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json"
      )
      .then((res) => setProductData(res.data));
  }, []);

  const filterProduct = (list) => {
    let filtredProdData = productData
      .filter((a) =>
        list[FILTERS.COLOR].length
          ? list[FILTERS.COLOR].includes(a.color)
          : a.color
      )
      .filter((b) =>
        list[FILTERS.GENDER].length
          ? list[FILTERS.GENDER].includes(b.gender)
          : b.gender
      )
      .filter((c) =>
        list[FILTERS.PRICE].length
          ? list[FILTERS.PRICE].includes(c.price)
          : c.price
      )
      .filter((d) =>
        list[FILTERS.TYPE].length ? list[FILTERS.TYPE].includes(d.type) : d.type
      );
    setSearchResult(filtredProdData);
  };

  useEffect(() => {
    if (productData !== undefined) {
      const filtredProdData = productData.filter((product) => {
        return (
          product.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
          product.color.toLowerCase().includes(searchKeyword.toLowerCase()) ||
          product.type.toLowerCase().includes(searchKeyword.toLowerCase())
        );
      });
      setSearchResult(filtredProdData);
    }
  }, [searchKeyword, productData]);
  useEffect(() => {
    if (productData !== undefined) {
      let colorTemp = [];
      let genderTemp = [];
      let priceRangeTemp = [];
      let productTemp = [];
      productData.map((data) => colorTemp.push(data.color));
      productData.map((data) => genderTemp.push(data.gender));
      productData.map((data) => priceRangeTemp.push(data.price));
      productData.map((data) => productTemp.push(data.type));
      setFilterListTypes({
        colourTypes: findUniqueItems(colorTemp),
        genderTypes: findUniqueItems(genderTemp),
        priceRangeTypes: findUniqueItems(priceRangeTemp),
        productTypes: findUniqueItems(productTemp),
      });
    }
  }, [productData]);

  function findUniqueItems(temp) {
    var unique = temp.filter(
      (value, index, arr) => arr.indexOf(value) === index
    );
    return unique;
  }
  function addToCart(data) {
    const currData = cartData.find((item) => item.id === data.id);
    if (currData !== undefined) {
      return;
    }
    const tempCart = { ...data, prodQuantity: 1 };
    setCartData([...cartData, tempCart]);
  }
  function incrementQuantityHandler(currData) {
    const currProduct = cartData.find((item) => item.id === currData.id);
    if (currProduct.prodQuantity < currProduct.quantity) {
      let tempCart = cartData;
      tempCart[tempCart.indexOf(currProduct)].prodQuantity++;
      setCartData([...tempCart]);
    } else {
      alert("Out of STOCK");
      return;
    }
  }
  function decrementQuantityHandler(currData, setQuantityIsShown) {
    const currProduct = cartData.find((item) => item.id === currData.id);
    if (currProduct.prodQuantity > 1) {
      let tempCart = cartData;
      tempCart[tempCart.indexOf(currProduct)].prodQuantity--;
      setCartData([...tempCart]);
    } else {
      let tempCart = cartData.filter((e) => e.id !== currData.id);
      setCartData(tempCart);
      //setQuantityIsShown(false);
    }
  }
  function removeProductHandler(currData) {
    let tempCart = cartData.filter((e) => e.id !== currData.id);
    setCartData(tempCart);
  }
  const value = {
    productData,
    searchKeyword,
    setSearchKeyword,
    searchResult,
    cartData,
    filterListTypes,
    addToCart,
    filterProduct,
    incrementQuantityHandler,
    decrementQuantityHandler,
    removeProductHandler,
  };
  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
}

export default ProductContextProvider;
