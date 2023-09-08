import React, { useState } from "react";

import Image from "next/image";
import EditIconAnimate from "@icon/components/Button/edit.gif";
import EditIconPause from "@icon/components/Button/edit_pause.png";
import TagField from "./TagField";



function Hobbies() {
  const hobbiesData = [
    "Reading",
    "Writing",
    "Painting",
    "Drawing",
    "Cooking",
    "Baking",
    "Gardening",
    "Hiking",
    "Camping",
    "Photography",
    "Birdwatching",
    "Fishing",
    "Playing Board Games",
    "Playing Video Games",
    "Collecting",
    "Yoga",
    "Meditation",
    "Dancing",
    "Watching Movies",
    "Traveling",
    "Surfing",
    "Scuba Diving",
    "Skiing",
    "Snowboarding",
    "Rock Climbing",
    "Surfing",
    "Sailing",
    "Horseback Riding",
    "Knitting or Crocheting",
    "Pottery",
    "Sculpting",
    "Calligraphy",
    "Chess",
    "Taekwondo",
    "Archery",
    "Model Building (e.g., airplanes, ships)",
    "Home Improvement",
    "DIY Crafts",
    "Volunteering",
  ];

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [hobbies, setHobbies] = useState<string[]>(["Calligraphy", "Chess"]);
  return (
    <div className="flex flex-col gap-[20px] p-[24px] rounded-[10px] shadow-primary">
      <div className="flex flex-row justify-between">
        <h3 className="font-[700] text-[24px] ">Hobbies</h3>
        <button
          className="w-[28px] h-[28px] flex items-center justify-center hover:scale-125 rounded-[50%] hover:border-[1px] hover:border-blue-700 cursor-pointer transition"
          onClick={() => {
            setIsEdit(!isEdit);
          }}
        >
          <Image
            src={isEdit ? EditIconAnimate : EditIconPause}
            alt="Edit"
            width={18}
            height={18}
          ></Image>
        </button>
      </div>
      <div className="flex flex-col gap-[5px]" aria-disabled="true">
        <p className="font-[300] text-[14px]">Add tag</p>
        <TagField
                  suggestions={hobbiesData}
                  isEdit={isEdit}
                  state={hobbies}
                  setState={setHobbies} 
                  useTagFor={"hobbies"}        />
      </div>
    </div>
  );
}

export default Hobbies;
