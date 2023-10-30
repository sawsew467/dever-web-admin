import React, { useState } from "react";
import BlogTagField from "./BlogTagField";

function BlogTag() {
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

  const [blogTags, setBlogTags] = useState<string[]>([]);

  return (
    <div className="flex flex-col gap-[8px]">
        <div>
            <h3 className="font-[500] dark:text-white ">Add tag</h3>
        </div>
        <div>
        <BlogTagField
          suggestions={suggestions}
          state={blogTags}
          setState={setBlogTags}
        />            
        </div>
    </div>
  );
}

export default BlogTag;
