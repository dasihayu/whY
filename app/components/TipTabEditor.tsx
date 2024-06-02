"use client"
import { Button } from '@/components/ui/button'
import {Editor, EditorContent, JSONContent, useEditor} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

export const Menubar =({editor}: {editor: Editor | null}) => {
    if(!editor) {
            return null
    }

    return (
        <div className='flex flex-wrap gap-3 justify-center'>
            <Button 
                type='button'
                onClick={() => editor.chain().focus().toggleHeading({level: 1}).run()}
                variant={editor.isActive('heading', {level: 1}) ? 'default' : 'outline'}
                size="sm"
                className='max-w-9'
                >
                H1
            </Button>
            <Button 
                type='button'
                onClick={() => editor.chain().focus().toggleHeading({level: 2}).run()}
                variant={editor.isActive('heading', {level: 2}) ? 'default' : 'outline'}
                size="sm"
                className='max-w-9'
                >
                H2
            </Button>
            <Button 
                type='button'
                onClick={() => editor.chain().focus().toggleHeading({level: 3}).run()}
                variant={editor.isActive('heading', {level: 3}) ? 'default' : 'outline'}
                size="sm"
                className='max-w-9'
                >
                H3
            </Button>
            <Button 
                type='button'
                onClick={() => editor.chain().focus().toggleBold().run()}
                variant={editor.isActive('bold') ? 'default' : 'outline'}
                size="sm"
                className='font-bold min-w-9'
                >
                B
            </Button>
            <Button 
                type='button'
                onClick={() => editor.chain().focus().toggleItalic().run()}
                variant={editor.isActive('italic') ? 'default' : 'outline'}
                size="sm"
                className='italic min-w-9'
                >
                I
            </Button>
            <Button 
                type='button'
                onClick={() => editor.chain().focus().toggleStrike().run()}
                variant={editor.isActive('strike') ? 'default' : 'outline'}
                size="sm"
                className='line-through min-w-9'
                >
                A
            </Button>
        </div>
    )
}

export default function TipTapEditor({setJson, json} : {setJson: any, json: JSONContent | null}) {
    const editor = useEditor({
        extensions: [StarterKit],
        content: json ?? '',
        editorProps: {
            attributes:{
                class: "prose"
            }
        },
        onUpdate: ({editor}) => {
            const json = editor.getJSON()
            setJson(json)
        }
    })
    return (
        <div>
            <EditorContent editor={editor} className='rounded-lg border p-2 min-h-[150px] mt-2'/>
        </div>
    )
}