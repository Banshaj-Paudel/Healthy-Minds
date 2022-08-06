import { useContext } from "react";
import { UserContext } from "../context/UserProvider";

const Navbar = () => {
  const { username, setUsername } = useContext(UserContext);

  const logout = () => {
    setUsername("");
    localStorage.removeItem("username");
    localStorage.removeItem("token");
  };

  return (
    <div className="ui secondary container menu">
      <a className="item">Home</a>
      <div className="right menu">
        <a className="ui item">
          <i className="user icon"></i>
          {username}
        </a>
        <a className="ui item" onClick={logout}>
          Logout
        </a>
      </div>
    </div>
  );
};

export default Navbar;
