import { useField } from "formik";
import React from "react";
interface InputProps {
  type: string;
  name: string;
}

function Checkbox({ ...props }: InputProps) {
  const [field, meta] = useField(props);
  return (
    <>
      <div className="mb-6">
        <div className=" flex w-full justify-between items-center">
          <div className="flex items-center  gap-3">
            <input
              {...field}
              {...props}
              className="h-4 w-4 rounded bg-[#F9FAFB] border-[#D1D5DB] outline-[#0065A9] peer-checked:bg-[#0065A9]  "
            ></input>
            <p className=" text-sm leading-5 font-medium">
              I accept the{" "}
              <a
                href="#"
                className="text-[#0098FF] text-sm leading-5 font-medium hover:underline"
              >
                Terms and Conditions
              </a>
            </p>
          </div>
        </div>
        {meta.error && meta.touched && (
          <p className="text-[10px] font-medium text-[#fc8181]">
            {" "}
            {meta.error}
          </p>
        )}
      </div>
    </>
  );
}

export default Checkbox;
