import { useField } from "formik";
import React from "react";

type TOptionsList = {
  id: string;
  name: string;
};

type TPros = {
  label: string;
  id: string;
  name: string;
  isEdit: boolean;
  title: string;
  options: TOptionsList[];
};

function FormikSelect({
  label,
  title,
  isEdit,
  options,
  ...props
}: TPros): JSX.Element {
  const [field, meta] = useField(props);

  const renderSelectOption = () => {
    const options_list = [];
    for (let option of options) {
      options_list.push(
        <option value={option.id} key={option.id}>
          {option.name}
        </option>
      );
    }
    return options_list;
  };

  const capitalizeFirstLetter = (inputString: string): string => {
    if (inputString.length === 0) return inputString;
    const firstChar = inputString.charAt(0).toUpperCase();
    const restOfString = inputString.slice(1);
    return firstChar + restOfString;
  };
  const lowercaseFirstLetter = (inputString: string): string => {
    if (inputString.length === 0) return inputString;
    const firstChar = inputString.charAt(0).toLocaleLowerCase();
    const restOfString = inputString.slice(1);
    return firstChar + restOfString;
  };

  return (
    <div className="w-full relative flex flex-col justify-between">
      <span className="font-[300] text-[14px] mb-[6px] dark:font-semibold">
        {capitalizeFirstLetter(title)}
      </span>
      <select
        {...field}
        {...props}
        className={`w-full text-sm font-medium text-gray-700 border-gray-300 dark:border-darkHover  bg-gray-50 dark:bg-dark dark:text-gray-400  py-[10px] ${
          isEdit ? "text-black dark:text-white" : "pointer-events-none"
        } rounded-[6px]`}
        // disabled={!isEdit}
      >
        <option value="">Select a {lowercaseFirstLetter(title)}...</option>
        {renderSelectOption()}
      </select>
      {meta.error && meta.touched && (
        <p className="text-[12px] font-medium text-[#fc8181]">{meta.error}</p>
      )}
    </div>
  );
}

export default FormikSelect;
