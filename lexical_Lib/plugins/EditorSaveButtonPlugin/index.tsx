import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $generateHtmlFromNodes } from "@lexical/html";
import UnlinkButton from "@/components/UnlinkButton";
import React from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { getCookie } from "cookies-next";
import { updateAbout } from "@/apis/setting";
import { useDispatch } from "react-redux";
import { setIsBackdrop } from "@/redux/slices/app";

type TPros = {
  setHtmlString: React.Dispatch<React.SetStateAction<string>>;
  useFor: string;
  userId:string;
};

function EditorSaveButtonPlugin({ setHtmlString, useFor, userId }: TPros) {
  const [editor] = useLexicalComposerContext();
  const dispatch = useDispatch();

  const handleUpdateBio = async (bio: string) => {
    try {
      const access_token = getCookie("accessToken");
      const aboutMe = {
        userId: userId!,
        aboutMe: bio
      }
      console.log(aboutMe);
      if (access_token) {
        dispatch(setIsBackdrop(true));
        await updateAbout(access_token, aboutMe);
        toast.success("Change bio successfully!");
        dispatch(setIsBackdrop(false));
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        dispatch(setIsBackdrop(false));
        toast.warning("Update bio failed!");
      }
    }
  };

  const handleSaveLetter = async () => {
    editor.update(() => {
      const htmlString = $generateHtmlFromNodes(editor, null);
      setHtmlString(htmlString);
      if (useFor === "about") {
        handleUpdateBio(htmlString);
      }
    });
  };

  return (
    <>
      <UnlinkButton
        textContent={"Save"}
        icon={""}
        iconPosition={"left"}
        backgroundColor={"bg-blue-700"}
        method={() => handleSaveLetter()}
        tailwind={"text-white mt-[20px] dark:shadow-darkPrimaryBlue"}
      ></UnlinkButton>
    </>
  );
}

export default EditorSaveButtonPlugin;
