import { forwardRef } from "react";

const FormInputText = forwardRef(
  ({ type, placeholder, onChange, onBlur, name, children }, ref) => {
    return (
      <>
        <input
          type={type}
          placeholder={placeholder}
          ref={ref}
          onChange={onChange}
          onBlur={onBlur}
          name={name}
        />

        {children}
      </>
    );
  }
);

export default FormInputText;
