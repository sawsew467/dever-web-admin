import React from "react";


type TPros = {
  title: string;
  options: {id:string, name:string}[];
  value: string;
  isEdit: boolean;
  onChange(event: React.ChangeEvent<HTMLSelectElement>): void;
};

function Selection({
  title,
  options,
  value,
  isEdit,
  onChange,
}: TPros): JSX.Element {
  
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

  return (
    <div className="w-full">
      <span className="font-[300] text-[14px]">
        {capitalizeFirstLetter(title)}
      </span>
      <select
        name=""
        id=""
        className={`w-full text-[14px] text-gray-700 border-gray-300  bg-gray-50 ${
          isEdit ? "text-black" : ""
        } rounded-[6px]`}
        disabled={!isEdit}
        value={value}
        onChange={(e) => {
          onChange(e);
        }}
      >
        <option value={""}>Select platform...</option>
        {renderSelectOption()}
      </select>
    </div>
  );
}

export default Selection;
