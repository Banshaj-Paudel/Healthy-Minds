import { useContext } from "react";
import { Link } from "react-router-dom";
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
      <Link className="item" to="/">
        Home
      </Link>
      <div className="right menu">
        <Link className="ui item" to="/">
          <i className="user icon"></i>
          {username}
        </Link>
        <a className="ui item" onClick={logout}>
          Logout
        </a>
      </div>
    </div>
  );
};

export default Navbar;
