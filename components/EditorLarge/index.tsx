import React, { ReactNode, useEffect, useRef, useState } from 'react'
import Button from '../Button'

import PlaygroundEditorTheme from '@theme/PlaygroundEditorTheme';
import PlaygroundNodes from '@nodes/PlaygroundNodes'

import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';

import TableCellNodes from '@nodes/TableCellNodes'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import {CheckListPlugin} from '@lexical/react/LexicalCheckListPlugin';
import {ListPlugin} from '@lexical/react/LexicalListPlugin';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { HashtagPlugin } from '@lexical/react/LexicalHashtagPlugin';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { ClearEditorPlugin } from '@lexical/react/LexicalClearEditorPlugin';
import {TablePlugin} from '@lexical/react/LexicalTablePlugin';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import LexicalClickableLinkPlugin from '@lexical/react/LexicalClickableLinkPlugin';
import {HorizontalRulePlugin} from '@lexical/react/LexicalHorizontalRulePlugin';
import FloatingTextFormatToolbarPlugin from '@/plugins/FloatingTextFormatToolbarPlugin';
import {TabIndentationPlugin} from '@lexical/react/LexicalTabIndentationPlugin';

import { TableContext } from '@/plugins/TablePlugin';
import ToolbarPlugin from '@/plugins/ToolbarPlugin';
import TreeViewPlugin from '@/plugins/TreeViewPlugin';
import Placeholder from '@/ui/Placeholder';
import DragDropPaste from '@/plugins/DragDropPastePlugin';
import AutoEmbedPlugin from '@/plugins/AutoEmbedPlugin';
import ComponentPickerPlugin from '@/plugins/ComponentPickerPlugin'
import EmojiPickerPlugin from '@/plugins/EmojiPickerPlugin';
import NewMentionsPlugin from '@/plugins/MentionsPlugin';
import EmojisPlugin from '@/plugins/EmojisPlugin';
import KeywordsPlugin from '@/plugins/KeywordsPlugin';
import CommentPlugin from '@/plugins/CommentPlugin';
import AutoLinkPlugin from '@/plugins/AutoLinkPlugin';
import MarkdownShortcutPlugin from '@/plugins/MarkdownShortcutPlugin';
import CodeHighlightPlugin from '@/plugins/CodeHighlightPlugin';
import LinkPlugin from '@/plugins/LinkPlugin';
import ListMaxIndentLevelPlugin from '@/plugins/ListMaxIndentLevelPlugin';
import TableCellResizer from '@/plugins/TableCellResizer';
import {TablePlugin as NewTablePlugin} from '@/plugins/TablePlugin';
import MentionsPlugin from '@/plugins/MentionsPlugin';
import ImagesPlugin from '@/plugins/ImagesPlugin';
import InlineImagePlugin from '@/plugins/InlineImagePlugin';
import PollPlugin from '@/plugins/PollPlugin';
import YouTubePlugin from '@/plugins/YouTubePlugin';
import TwitterPlugin from '@/plugins/TwitterPlugin';
import FigmaPlugin from '@/plugins/FigmaPlugin';
import EquationsPlugin from '@/plugins/EquationsPlugin';
import ExcalidrawPlugin from '@/plugins/ExcalidrawPlugin';
import TabFocusPlugin from '@/plugins/TabFocusPlugin';
import PageBreakPlugin from '@/plugins/PageBreakPlugin';
import ActionsPlugin from '@/plugins/ActionsPlugin';
import StickyPlugin from '@/plugins/StickyPlugin';
import FloatingLinkEditorPlugin from '@/plugins/FloatingLinkEditorPlugin';
import DraggableBlockPlugin from '@/plugins/DraggableBlockPlugin';
import CodeActionMenuPlugin from '@/plugins/CodeActionMenuPlugin';
import TableActionMenuPlugin from '@/plugins/TableActionMenuPlugin';
import { PlainTextPlugin } from '@lexical/react/LexicalPlainTextPlugin';
import ContextMenuPlugin from '@/plugins/ContextMenuPlugin';
import SpeechToTextPlugin from '@/plugins/SpeechToTextPlugin';
import {HeadingNode, QuoteNode} from '@lexical/rich-text'

interface IPros {
    formTitle: string
}

function placeholder() {
    return <div className="editor-placeholder">Enter some rich text...</div>;
}

const editorConfig = {
    onError(error: Error) {
        throw error;
    }, 
    theme: PlaygroundEditorTheme,
    namespace: "FU-DEVER",
    nodes: [
      ...PlaygroundNodes
    ]
}
const cellEditorConfig = {
    namespace: 'Playground',
    nodes: [...TableCellNodes],
    onError: (error: Error) => {
      throw error;
    },
    theme: PlaygroundEditorTheme,
  };

function EditorLarge({formTitle}:IPros) {
    const [editorState, setEditorState] = useState<any>('');

    const [floatingAnchorElem, setFloatingAnchorElem] =
    useState<HTMLDivElement | null>(null);

    const onRef = (_floatingAnchorElem: HTMLDivElement) => {
        if (_floatingAnchorElem !== null) {
          setFloatingAnchorElem(_floatingAnchorElem);
        }
    };

    return (
        <div className='flex flex-col gap-[8px]'>
             <div>
                <h4 className='select-none font-[500]'>{formTitle}:</h4>
                {/* <button onClick={() => {}}>show text</button> */}
            </div>


            <div>
                <LexicalComposer initialConfig={editorConfig}>
                   <TableContext>
                        <div className='border-2 rounded-[10px]'>
                           <div>
                            <ToolbarPlugin/>
                           </div>
                            <div className='relative'>
                            
                                <DragDropPaste />
                                <AutoFocusPlugin />
                                <ClearEditorPlugin />
                                <ComponentPickerPlugin />
                                <EmojiPickerPlugin />
                                <AutoEmbedPlugin />

                                <NewMentionsPlugin/>
                                <EmojisPlugin />
                                <HashtagPlugin />
                                <KeywordsPlugin />
                                <SpeechToTextPlugin />
                                <AutoLinkPlugin/>
                                <CommentPlugin
                                providerFactory={undefined}/>
                                <RichTextPlugin
                                    contentEditable={
                                    <div className="editor-scroller">
                                        <div className="editor" ref={onRef}>
                                        <ContentEditable className='editor-input' />
                                        </div>
                                    </div>
                                    }
                                    placeholder={<Placeholder className='absolute top-[15px] left-[10px] text-[14px] text-gray-500'>{"Enter some rich text..."}</Placeholder>}
                                    ErrorBoundary={LexicalErrorBoundary}
                                />

                                <MarkdownShortcutPlugin />
                                <CodeHighlightPlugin />
                                <ListPlugin />
                                <CheckListPlugin />
                                <ListMaxIndentLevelPlugin maxDepth={7} />
                                <TablePlugin
                                hasCellMerge={true}
                                hasCellBackgroundColor={true}
                                />
                                <TableCellResizer/>
                                <NewTablePlugin cellEditorConfig={cellEditorConfig}>
                                    <AutoFocusPlugin />
                                    <RichTextPlugin
                                        contentEditable={
                                        <ContentEditable className="TableNode__contentEditable" />
                                        }
                                        placeholder={null}
                                        ErrorBoundary={LexicalErrorBoundary}
                                    />
                                    <MentionsPlugin />
                                    <HistoryPlugin />
                                    <ImagesPlugin captionsEnabled={false} />
                                    <LinkPlugin />
                                    <ImagesPlugin captionsEnabled={false}/>     
                                    <LexicalClickableLinkPlugin />
                                    <FloatingTextFormatToolbarPlugin />
                                    <FloatingLinkEditorPlugin/>
                                </NewTablePlugin>
                                
                                <StickyPlugin/>
                                <ImagesPlugin/>
                                <InlineImagePlugin />
                                <LinkPlugin />
                                <FloatingLinkEditorPlugin/>
                                <PollPlugin />
                                <TwitterPlugin />
                                <YouTubePlugin />
                                <FigmaPlugin />
                                <LexicalClickableLinkPlugin />
                                <FloatingTextFormatToolbarPlugin/>
                                <HorizontalRulePlugin />
                                <EquationsPlugin />
                                <ExcalidrawPlugin />
                                <TabFocusPlugin />
                                <TabIndentationPlugin />
                                <PageBreakPlugin />       
                                <DraggableBlockPlugin/>
                                <CodeActionMenuPlugin/>
                                <TableActionMenuPlugin/>
                                <ActionsPlugin isRichText={true} /> 

                                
                            </div>
                            <TreeViewPlugin/>
                        </div>
                   </TableContext>
                </LexicalComposer>
            </div>

            <div className='mt-[12px] flex flex-row justify-between'>
                <div>
                    <Button 
                    textContent={'Publish notification'} 
                    icon={'public'} 
                    iconPosition={'left'} 
                    backgroundColor={'bg-blue-700'} 
                    href={'#'} 
                    method={() => {}} 
                    tailwind={'text-white'}
                    ></Button>
                </div>
                <div>
                    <p className='font-[500] select-none'>{""} </p>
                </div>
            </div>
        </div>
    )
}

export default EditorLarge;
