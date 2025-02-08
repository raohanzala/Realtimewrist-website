import React, { useEffect, useState } from "react";
import { RiEqualizer2Line } from "react-icons/ri";
import { NavLink, useSearchParams } from "react-router-dom";
import { useCategories } from "../api/useCategories";

const CollectionsSidebar = ({ isShowFilter = true }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [gender, setGender] = useState(
    searchParams.get("gender")?.split(",") || []
  );

  const { categories } = useCategories();

  const toggleGender = (e) => {
    const { value } = e.target;

    setGender((prevGender) => {
      if (prevGender.includes(value)) {
        return prevGender.filter((item) => item !== value);
      } else {
        return [...prevGender, value];
      }
    });
  };

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (gender.length > 0) {
      params.set("gender", gender.join(","));
    } else {
      params.delete("gender"); 
    }
    setSearchParams(params, { replace: true });
  }, [gender, setSearchParams]);

  return (
    <div className="min-w-48 lg:min-w-60 mb-5">
      <p className="my-2 text-xl flex uppercase items-center gap-2">
        Filters
        <span className="text-lg">
          <RiEqualizer2Line />
        </span>
      </p>

      {isShowFilter && (
        <div className="border border-gray-300 pl-5 py-3 mt-6">
          <p className="mb-3 text-sm font-medium uppercase">Gender</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            {["Men", "Women", "Kids", "Unisex"].map((item) => (
              <p key={item} className="flex gap-2 ">
                <input
                  type="checkbox"
                  className="w-3"
                  value={item}
                  id={item}
                  checked={gender.includes(item)}
                  onChange={toggleGender} 
                />{" "}
                <label htmlFor={item} className="cursor-pointer">{item}</label>
              </p>
            ))}
          </div>
        </div>
      )}

      <div className={`border border-gray-300 pl-5 py-3 mt-6`}>
        <p className="mb-3 text-sm font-medium">BROWSE</p>
        <ul className="flex flex-col gap-2 text-sm font-light text-gray-700">
          {categories?.map((category, index) => (
            <li key={index}>
              <NavLink
                to={`/category/${category.name}/${category._id}`}
                className="cursor-pointer hover:text-black flex gap-1"
              >
                {category.name}{" "}
                <span className="font-normal">({category.totalProducts})</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CollectionsSidebar;
