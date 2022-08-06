import { FormEvent, useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserProvider";
import HttpService from "../services/http";

const LoginScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const userContext = useContext(UserContext);

  const login = async (e: FormEvent) => {
    e.preventDefault();
    const service = new HttpService();
    const response = await service.post("/auth/login", { username, password });
    console.log(response);
    if (response.status === 200) {
      userContext.setUsername(username);
      localStorage.setItem("username", username);
      localStorage.setItem("token", response.data.accessToken);
    }
  };

  return (
    <div className="ui one column centered grid login-modal-container">
      <div className="login-modal ui mini active modal">
        <form className="ui form" onSubmit={login}>
          <div className="field">
            <label>Username</label>
            <input
              type="text"
              name="first-name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="field">
            <label>Password</label>
            <input
              type="password"
              name="last-name"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <input className="ui button" type="submit" value="Login" />
        </form>
      </div>
    </div>
  );
};

export default LoginScreen;
