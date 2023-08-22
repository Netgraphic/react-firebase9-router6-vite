import { useContext } from "react";
import { UserContext } from "../context/UserProvider";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { firebaseErrors } from "../utilities/FirebaseErrors";

import FormError from "../components/FormError";
import Title from "../components/Title";
import FormInputText from "../components/FormInputText";
import Button from "../components/Button";

import { formValidate } from "../utilities/formValidate";

const Login = () => {
  const navigate = useNavigate();
  const { loginUser } = useContext(UserContext);
  const { required, patternEmail, minLength, validateTrim } = formValidate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const onSubmit = async ({ email, password }) => {
    try {
      await loginUser(email, password);
      navigate("/");
    } catch (error) {
      const { code, message } = firebaseErrors(error.code);
      setError(code, { message });
    }
  };

  return (
    <>
      <Title text="Login" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInputText
          type="email"
          placeholder="Ingrese email"
          {...register("email", {
            required,
            pattern: patternEmail,
          })}
          label="Ingresa tu correo"
          error={errors.email}
        >
          <FormError error={errors.email} />
        </FormInputText>

        <FormInputText
          type="password"
          placeholder="Ingrese password"
          {...register("password", {
            minLength,
            validate: validateTrim,
          })}
          label="Ingresa tu password"
          error={errors.password}
        >
          <FormError error={errors.password} />
        </FormInputText>

        <Button text="Login" type="submit" />
      </form>
    </>
  );
};

export default Login;
