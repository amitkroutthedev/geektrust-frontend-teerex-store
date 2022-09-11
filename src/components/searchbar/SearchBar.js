import { useContext, useState } from "react";
import styles from "./SearchBar.module.css";
import { GrFilter } from "react-icons/gr";
import { ProductContext } from "../../context/product-context";
import FilterList from "../filterlist/FilterList";
function SearchBar() {
  const { searchKeyword, setSearchKeyword } = useContext(ProductContext);
  const [filterListOpener, setFilterListOpener] = useState(false);
  function filterHandler() {
    setFilterListOpener(!filterListOpener);
  }
  return (
    <div>
      <div className={styles.searchBarContainer}>
        <div>
          <input
            type="text"
            className={styles.input}
            placeholder="Search for Product"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
        </div>
        <div>
          <button className={styles.buttonContainer} onClick={filterHandler}>
            <GrFilter className={styles.filterIcon} color="white" />
          </button>
        </div>
      </div>
      {filterListOpener && <FilterList />}
    </div>
  );
}

export default SearchBar;
