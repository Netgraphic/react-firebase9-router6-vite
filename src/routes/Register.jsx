import { useContext, useState } from "react";
import { UserContext } from "../context/UserProvider";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { firebaseErrors } from "../utilities/FirebaseErrors";

import FormError from "../components/FormError";
import Title from "../components/Title";
import FormInputText from "../components/FormInputText";
import Button from "../components/Button";
import ButtonLoading from "../components/ButtonLoading";

import { formValidate } from "../utilities/formValidate";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { registerUser } = useContext(UserContext);
  const { required, patternEmail, setMinLength, validateTrim, validateEquals } =
    formValidate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
  } = useForm();

  const onSubmit = async ({ email, password }) => {
    try {
      setLoading(true);
      await registerUser(email, password);
      navigate("/");
    } catch (error) {
      const { code, message } = firebaseErrors(error.code);
      setError(code, { message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Title text="Register" />
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
            minLength: setMinLength(6),
            validate: validateTrim,
          })}
          label="Ingresa tu password"
          error={errors.password}
        >
          <FormError error={errors.password} />
        </FormInputText>

        <FormInputText
          type="password"
          placeholder="Ingrese password"
          {...register("repassword", {
            validate: validateEquals(getValues("password")),
          })}
          label="Repite tu password"
          error={errors.repassword}
        >
          <FormError error={errors.repassword} />
        </FormInputText>
        <Button text="Register" type="submit" loading={loading} />
      </form>
    </>
  );
};

export default Register;
