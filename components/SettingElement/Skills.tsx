import React, { useState } from "react";
import TagField from "./TagField";

import Image from "next/image";
import EditIconAnimate from "@icon/components/Button/edit.gif";
import EditIconPause from "@icon/components/Button/edit_pause.png";

function Skills() {
  const suggestions = [
    "HTML",
    "CSS",
    "JavaScript",
    "Responsive Design",
    "Bootstrap",
    "Flexbox",
    "ReactJs",
    "NextJs",
    "Angular",
    "Vue.js",
    "Git",
    "npm",
    "Browser Developer Tools",
    "AJAX",
    "RESTful APIs",
    "GraphQL",
    "Cross-Browser Compatibility",
    "Node.js",
    "Python",
    "Django",
    "Flask",
    "Ruby",
    "Ruby on Rails",
    "Java",
    "Spring Boot",
    "PHP",
    "C#",
    "ASP.NET Core",
    "MySQL",
    "PostgreSQL",
    "SQL Server",
    "MongoDB",
    "Redis",
    "Express.js",
    "Web Security",
    "Authentication",
    "Authorization",
    "Caching",
    "SQL",
    "Database Design",
    "ORM",
    "Sequelize",
    "SQLAlchemy",
    "Entity Framework",
    "Command Line",
    "Apache",
    "Nginx",
    "Docker",
    "DevOps",
    "Agile",
    "Scrum",
    "Version Control Systems",
  ];

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [skills, setSkills] = useState<string[]>(["ReactJs", "NextJS"]);
  return (
    <div className="flex flex-col gap-[20px] p-[24px] rounded-[10px] shadow-primary">
      <div className="flex flex-row justify-between">
        <h3 className="font-[700] text-[24px] ">Skills</h3>
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
                  suggestions={suggestions}
                  isEdit={isEdit}
                  useTagFor="skills"
                  state={skills}
                  setState={setSkills} />
      </div>
    </div>
  );
}

export default Skills;
