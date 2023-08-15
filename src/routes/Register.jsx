import { useContext, useState } from "react";
import { UserContext } from "../context/UserProvider";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const Register = () => {
  const navigate = useNavigate();
  const { registerUser } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
  } = useForm({
    defaultValues: {
      email: "test@test.com",
    },
  });

  const onSubmit = async ({ email, password }) => {
    try {
      await registerUser(email, password);
      console.log("Usuario creado");
      navigate("/");
    } catch (error) {
      console.log(error.code);

      switch (error.code) {
        case "auth/email-already-in-use":
          setError("email", {
            message: "Usuario ya registrado",
          });
          break;

        case "auth/invalid-email":
          setError("email", {
            message: "Formato email no válido",
          });
          break;

        default:
          console.log("Ocurrió un error en el servidor");
      }
    }
  };

  return (
    <>
      <h1>Register</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="email"
          placeholder="Ingrese email"
          {...register("email", {
            required: {
              value: true,
              message: "Campo obligatorio",
            },
            pattern: {
              value:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: "Formato de email incorrecto",
            },
          })}
        />
        {errors.email && <p>{errors.email.message}</p>}
        <input
          type="password"
          placeholder="Ingrese password"
          {...register("password", {
            setValueAs: (v) => v.trim(),
            minLength: {
              value: 6,
              message: "Mínimo 6 carácteres.",
            },
            validate: {
              trim: (v) => {
                if (!v.trim()) {
                  return "No seas 🤡, escribe algo.";
                }

                return true;
              },
            },
          })}
        />
        {errors.password && <p>{errors.password.message}</p>}
        <input
          type="password"
          placeholder="Ingrese password"
          {...register("repassword", {
            setValueAs: (v) => v.trim(),
            validate: {
              equals: (v) =>
                v === getValues("password") || "No coinciden las contraseñas.",
            },
          })}
        />
        {errors.repassword && <p>{errors.repassword.message}</p>}
        <button type="submit">Register</button>
      </form>
    </>
  );
};

export default Register;
