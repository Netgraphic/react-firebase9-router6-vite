import { useContext, useState } from "react";
import { UserContext } from "../context/UserProvider";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("test2@test.com");
  const [password, setPassword] = useState("123123");

  const navigate = useNavigate();

  const {registerUser} = useContext(UserContext);
  
  const handleSubmit = async(e) => {
    e.preventDefault();
    
    try {
        await registerUser(email, password);
        console.log('Usuario creado');
        navigate('/');
    }
    catch(error) {
        console.log(error.code);
        alert('Este email ya está registrado.');
    }
  }


  return (
    <>
      <h1>Register</h1>
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
        <button type="submit">Register</button>
      </form>
    </>
  );
};

export default Register;
