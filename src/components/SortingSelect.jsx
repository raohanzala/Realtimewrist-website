import { useSearchParams } from "react-router-dom";
import { FaSortAmountDown, FaSortAmountUp, FaStar, FaFire } from "react-icons/fa";
import Title from "./Title";

const CollectionHeader = ({ category }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentSort = searchParams.get("sort") || "relevant";

  const handleSortChange = (e) => {
    const sortType = e.target.value;
    if (sortType === "default") {
      searchParams.delete("sort"); 
    } else {
      searchParams.set("sort", sortType);
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="flex justify-between items-center w-full mb-5 text-base sm:text-2xl">
      <Title text1={category} text2={"COLLECTION"} />

      <div className="relative">
        <select
          onChange={handleSortChange}
          value={currentSort}
          className="border-2 border-gray-300 py-3 focus:outline-none focus:ring-2 focus:ring-[#e2c765] rounded text-sm px-3"
        >
          <option value="default">Sort by: Default</option>
          <option value="price-low-high">Sort by: Low to High</option>
          <option value="price-high-low">Sort by: High to Low</option>
          <option value="newest">Sort by: Newest</option>
        </select>
      </div>
    </div>
  );
};

export default CollectionHeader;
