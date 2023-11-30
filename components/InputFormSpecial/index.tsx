import { useField } from "formik";
import React, { SetStateAction, useEffect } from "react";
interface InputProps {
  label: string;
  id: string;
  name: string;
  type: string;
  placeholder: string;
  password: string;
  setTextChanged: React.Dispatch<SetStateAction<string | null>>;
}

function InputFormSpecial({ label, setTextChanged, password,...props }: InputProps) {
  const [field, meta] = useField(props);

  useEffect(() => {
    setTextChanged(field.value);
  }, [field.value, setTextChanged])

  return (
    <>
      <label htmlFor={label}></label>
      <input
        {...field}
        {...props}
        className={
          meta.error && meta.touched
            ? "p-[10px] text-sm font-medium leading-5 w-full border-solid border-[1px] border-[#fc8181]  outline-[#0065A9] rounded-lg bg-[#F9FAFB]"
            : "p-[10px] text-sm font-medium leading-5 w-full border-solid border-[1px] border-[#D1D5DB]  outline-[#0065A9] rounded-lg bg-[#F9FAFB]"
        }
      ></input>
      {meta.error && meta.touched && (
        <p className="text-[10px] font-medium text-[#fc8181]"> {meta.error}</p>
      )}
    </>
  );
}

export default InputFormSpecial;
