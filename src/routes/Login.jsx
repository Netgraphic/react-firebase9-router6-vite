import { useContext, useState } from "react";
import { UserContext } from "../context/UserProvider";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("test2@test.com");
  const [password, setPassword] = useState("123123");

  const {loginUser} = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    
    try {
        await loginUser(email, password);
        console.log('Usuario logueado');
        navigate('/');
    }
    catch(error) {
        console.log(error.code);
    }
  }


  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Ingrese email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Ingrese password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default Login;
