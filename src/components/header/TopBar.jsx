import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const TopBar = () => {

  const { isLoggedIn } = useSelector((state) => state.user);


  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
    !isLoggedIn ? { name: 'Login', path: '/login' } : null, // Conditionally add "Login" when not logged in
    { name: 'Your Orders', path: '/orders' },
  ].filter(Boolean); 


  return (
    <div className="flex justify-between text-xs py-[2px] bg-[red] text-white tracking-wide px-10">

    <div className="flex gap-1 capitalize text-nowrap">
      Free Shipping On All Orders <span className="font-bold"> Shop </span> Your
      Favourite Now!
    </div>

<ul className="hidden items-center gap-1 uppercase text-[10px] sm:flex font-semibold">
    {navItems.map((item, index) => (
      <li key={item.name}>
          <NavLink
            to={item.path}
            className={`${index !== 0 ? 'border-l pl-1' : ''}`}
          >
            {item.name}
          </NavLink>
        </li>
      ))}
      </ul>
    </div>
  );
};

export default TopBar;
