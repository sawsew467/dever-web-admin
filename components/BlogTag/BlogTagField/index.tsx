import React, { useEffect, useState } from "react";
import Tags from "@yaireo/tagify/dist/react.tagify";
import UnlinkButton from "@/components/UnlinkButton";
import { TagifySettings } from "@yaireo/tagify";
import "@component/SettingElement/TagField/styling.scss";

interface TagFieldProps {
  suggestions: string[];
  setState: React.Dispatch<React.SetStateAction<string[]>>;
  state: string[];
}

const baseTagifySettings = {
  blacklist: [],
  maxTags: 30,
  backspace: "edit",
  placeholder: "Enter tags...",
  editTags: 1,
  dropdown: {
    enabled: 0,
  },
  callbacks: {} as any,
};

function BlogTagField({
  suggestions = [],
  setState,
  state,
}: TagFieldProps) {
  const [data, setData] = useState<string[]>(state);
  // console.log("DATA", data);

  const handleChange = (e: CustomEvent) => {
    setData(e.detail.tagify.value.map((item: { value: string }) => item.value));
  };

  const settings: TagifySettings<Tagify.BaseTagData> = {
    ...baseTagifySettings,
    whitelist: suggestions,
    editTags: 1,
    backspace: "edit",
    callbacks: {
      add: handleChange,
      remove: handleChange,
      blur: handleChange,
      invalid: handleChange,
      click: handleChange,
      focus: handleChange,
      "edit:updated": handleChange,
      "edit:start": handleChange,
      "edit:input": handleChange,
    },
  };

  const handleSubmitTags = () => {

  };

  return (
    <div className="flex flex-col gap-[20px]">
      <div
        className={`form-group shadow-primary  rounded-[8px] p-[6px]`}
      >
        <Tags value={state} settings={settings} readOnly={false} />
      </div>
    </div>
  );
}

export default BlogTagField;
