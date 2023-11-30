import React, { useState } from "react";
import UnlinkButton from "../UnlinkButton";
import EditorNormal from "../EditorNormal";

type TPros = {
  about: string;
  userId: string;
};

function AboutUser({ about, userId }: TPros): JSX.Element {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isSave, setIsSave] = useState<boolean>(false);
  const [htmlString, setHtmlString] = useState<string>(about);

  return (
    <div className="flex flex-col gap-[20px] p-[24px] shadow-primary dark:shadow-darkPrimary rounded-[10px]">
      <h3 className="font-[700] text-[24px] select-none dark:text-white">
        About you
      </h3>
      {
        // htmlString.length == 0 ? <p className="italic">Haven&apos;t set bio yet!</p> :
        htmlString.length == 0 || htmlString == "<p class=\"EditorTheme__paragraph\"><br></p>" ? (
          <p
            className="italic select-none cursor-pointer dark:text-white"
            onClick={() => setIsEdit(true)}
          >
            Write something about you...
          </p>
        ) : (
          <div
            className="dark:text-white"
            dangerouslySetInnerHTML={{ __html: htmlString }}
          ></div>
        )
      }
      <div>
        <UnlinkButton
          textContent={"Edit bio"}
          icon={"edit"}
          iconPosition={"left"}
          backgroundColor={"bg-blue-700"}
          method={() => {
            setIsEdit((isEdit) => !isEdit);
          }}
          tailwind={"text-white dark:shadow-darkPrimaryBlue"}
        ></UnlinkButton>
      </div>

      {isEdit ? (
        <>
          <EditorNormal
            htmlString={htmlString}
            setHtmlString={setHtmlString}
            isNeedSave={true}
            useEditorFor={"about"}
            userId = {userId}
          />
        </>
      ) : null}
    </div>
  );
}

export default AboutUser;
