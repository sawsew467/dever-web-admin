import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { $generateHtmlFromNodes } from '@lexical/html';
import UnlinkButton from '@/components/UnlinkButton';
import React from 'react'

type TPros = {
    setHtmlString: React.Dispatch<React.SetStateAction<string>>;
}

function EditorSaveButtonPlugin({setHtmlString}: TPros) {
    const [editor] = useLexicalComposerContext();

    const handleSaveLetter = () => {
        editor.update(() => {
            const hmtlString = $generateHtmlFromNodes(editor, null);
            setHtmlString(hmtlString);
        })
    }

    return (
        <>
            <UnlinkButton 
            textContent={'Save'} 
            icon={''} 
            iconPosition={'left'} 
            backgroundColor={'bg-blue-700'} 
            method={() => handleSaveLetter()} 
            tailwind={'text-white mt-[20px]'}            
            ></UnlinkButton>
        </>
    )
}

export default EditorSaveButtonPlugin
