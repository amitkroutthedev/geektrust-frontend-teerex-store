import { useContext, useState } from "react";
import { ProductContext, FILTERS } from "../../context/product-context";
import styles from "./Filter.module.css";
function FilterList() {
  const { filterListTypes, filterProduct } = useContext(ProductContext);
  const { colourTypes, genderTypes, priceRangeTypes, productTypes } =
    filterListTypes;
  const [filterKeys, setFilterKeys] = useState({
    [FILTERS.COLOR]: [],
    [FILTERS.GENDER]: [],
    [FILTERS.PRICE]: [],
    [FILTERS.TYPE]: [],
  });
  const changeHandler = (type) => (e) => {
    const value =
      type === FILTERS.PRICE ? parseInt(e.target.value) : e.target.value;
    let { ...allKeywords } = filterKeys;
    const keywords = allKeywords[type];

    if (keywords.includes(value)) {
      const index = keywords.findIndex((key) => key === value);

      if (index !== -1) {
        keywords.splice(index, 1);
      }
    } else {
      keywords.push(value);
    }
    allKeywords = {
      ...allKeywords,
      [type]: keywords,
    };
    setFilterKeys({ ...allKeywords });
    filterProduct(allKeywords);
  };
  return (
    <div className={styles.filterListContainer}>
      <div className={styles.filterTypeContainer}>
        <p className={styles.filterType}>Colors</p>

        {colourTypes.map((color) => (
          <div key={color} onChange={changeHandler(FILTERS.COLOR)}>
            <input type="checkbox" id="color_type" name={color} value={color} />
            <label htmlFor={color}>{color}</label>
          </div>
        ))}
      </div>
      <div className={styles.filterTypeContainer}>
        <p className={styles.filterType}>Gender</p>
        {genderTypes.map((gender) => (
          <div key={gender} onChange={changeHandler(FILTERS.GENDER)}>
            <input
              type="checkbox"
              id="gender_type"
              name={gender}
              value={gender}
            />
            <label htmlFor={gender}>{gender}</label>
          </div>
        ))}
      </div>
      <div className={styles.filterTypeContainer}>
        <p className={styles.filterType}>Range</p>
        {priceRangeTypes.map((priceRange) => (
          <div key={priceRange} onChange={changeHandler(FILTERS.PRICE)}>
            <input
              type="checkbox"
              id="pricerange_type"
              name={priceRange}
              value={priceRange}
            />
            <label htmlFor={priceRange}>{priceRange}</label>
          </div>
        ))}
      </div>
      <div className={styles.filterTypeContainer}>
        <p className={styles.filterType}>Type</p>
        {productTypes.map((product) => (
          <div key={product} onChange={changeHandler(FILTERS.TYPE)}>
            <input
              type="checkbox"
              id="product_type"
              name={product}
              value={product}
            />
            <label htmlFor={product}>{product}</label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FilterList;
