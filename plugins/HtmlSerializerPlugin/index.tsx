import React, {useEffect} from 'react'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {$generateHtmlFromNodes} from '@lexical/html';

interface IPros {
    setHtml: React.Dispatch<React.SetStateAction<string>>
}

function HTMLSerializerPlugin({setHtml}:IPros) {
    const [editor] = useLexicalComposerContext();
    useEffect(() => {
        const removeUpdateListener = editor.registerUpdateListener(({editorState}) => {
            editorState.read(()=> {
                const htmlString = $generateHtmlFromNodes(editor, null);
                setHtml(htmlString);
            })
        })
        return () => {
            removeUpdateListener()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[editor]);
    
    return null
}

export default HTMLSerializerPlugin
