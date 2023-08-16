export const formValidate = () => {
  return {
    required: {
      value: true,
      message: "Campo obligatorio",
    },
    patternEmail: {
      value:
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: "Formato de email incorrecto",
    },
    minLength: {
      value: 6,
      message: "Mínimo 6 carácteres.",
    },
    validateTrim: {
      trim: (v) => {
        if (!v.trim()) {
          return "No seas 🤡, escribe algo.";
        }

        return true;
      },
    },
    validateEquals(getValues) {
      return {
        equals: (v) =>
        v === getValues("password") || "No coinciden las contraseñas.",
      }
    },
  };
};
