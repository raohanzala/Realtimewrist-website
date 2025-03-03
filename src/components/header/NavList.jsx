import React from 'react';
import { NavLink } from 'react-router-dom';
import { useCategories } from '../../api/useCategories';
import { IoIosArrowDown } from 'react-icons/io';

const NavList = () => {
  const { isLoading, error, categories } = useCategories(true);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'All Collections', path: '/all-collection' },
    { name: "Men's", path: '/gender/Men' },
    { name: "Women's", path: '/gender/Women' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <ul className='hidden md:flex gap-5 text-gray-100 text-xs font-semibold uppercase z-[999]'>
      {navItems.map((item) => (
        <li key={item.name}>
          <NavLink
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1`
            }
          >
            {item.name}
          </NavLink>
        </li>
      ))}
      <li className='group relative'>
        <div className='flex items-center gap-1 cursor-pointer'>
          Categories <IoIosArrowDown />
        </div>
        <div className='group-hover:block hidden absolute dropdown-menu shadow-md left-0 pt-3 z-[99]'>
          <div className='flex flex-col gap-2 w-48 py-3 px-5 bg-white text-gray-500'>
            {isLoading ? 'Loading' : error ? 'Error loading categories' : categories?.map((category) => (
              <NavLink
                key={category._id}
                to={`/category/${category.name}/${category._id}`}
                className={({ isActive }) =>
                  `cursor-pointer ${isActive ? 'text-dark-1' : 'hover:text-dark-1'}`
                }
              >
                {category.name}
              </NavLink>
            ))}
          </div>
        </div>
      </li>
    </ul>
  );
};

export default NavList;
