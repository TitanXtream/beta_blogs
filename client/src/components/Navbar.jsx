import React, { useEffect, useState } from "react";
import MainAvatar from "../assets/design-img/main-avatar.png";
import { RiArrowDownSLine } from "react-icons/ri";
import { FaBars } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions";

const Navbar = () => {
  const user = useSelector((state) => state.authManager.user);
  const dispatch = useDispatch();
  const [screenSize, setScreenSize] = useState(undefined);
  const [navBtnClicked, setNavBtnClicked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogin = async () => {
    navigate("/login");
  };

  const handleSignin = async () => {
    navigate("/signin");
  };

  const handleLogout = async () => {
    dispatch(logout(user));
    setNavBtnClicked(false);
    navigate("/");
  };

  return (
    <nav className="f-r-between h-full gap-[10px]">
      <div className="relative f-r-between sm:gap-[20px] gap-[10px] h-full">
        {!user ? (
          <>
            <button
              className="border-b-[3px] border-white hover:border-b-yellow-400"
              onClick={handleLogin}
            >
              Login
            </button>
            <button
              className="bg-pink-500 sm:px-[20px] sm:py-[10px] px-[10px] py-[5px] border-[5px] border-gray-200 rounded-lg hover:bg-yellow-400 text-white"
              onClick={handleSignin}
            >
              Sign in
            </button>
          </>
        ) : (
          <>
            {(screenSize > 1000 || (screenSize < 1000 && navBtnClicked)) && (
              <div
                className={`flex gap-[10px] ${screenSize < 1000 && "drop_nav"}`}
              >
                <button className="nav_btn" onClick={handleLogout}>
                  logout
                </button>
                <NavLink
                  to="/"
                  className="nav_btn"
                  onClick={() => setNavBtnClicked(false)}
                >
                  My Blogs
                </NavLink>
                <NavLink
                  to="/create"
                  className="nav_btn"
                  onClick={() => setNavBtnClicked(false)}
                >
                  New Blog
                </NavLink>

                <NavLink
                  to="/my-blogs"
                  className="nav_btn"
                  onClick={() => setNavBtnClicked(false)}
                >
                  All Blogs
                </NavLink>
              </div>
            )}
            {screenSize < 1000 && (
              <button
                className="border-[4px] border-gray-200 rounded-lg p-[5px] bg-pink-400 hover:bg-pink-700 group relative"
                onClick={() => setNavBtnClicked((clicked) => !clicked)}
              >
                <FaBars className="md:text-[30px] xs:text-[25px] text-[18px] text-yellow-200" />
              </button>
            )}
          </>
        )}
      </div>
      {user && (
        <button
          className="f-r-between md:max-w-[200px] max-w-auto border-l-[2px] border-gray-500 h-full md:pl-[20px] pl-[10px] hover:bg-gray-200 rounded-r-lg"
          onClick={() => {}}
        >
          <div className="block h-full">
            <img src={MainAvatar} alt="Person img" className="h-[100%]" />
          </div>
          {screenSize > 460 ? (
            <div className="f-r-between">
              <p className="max-w-[110px] overflow-hidden text-ellipsis ">
                {user?.name}
              </p>
              <RiArrowDownSLine className="text-[20px]" />
            </div>
          ) : (
            ""
          )}
        </button>
      )}
    </nav>
  );
};

export default Navbar;
