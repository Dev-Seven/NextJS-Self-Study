// ** React Imports
import { useState } from 'react'

// ** Third Party Imports
import { EditorState } from 'draft-js'

// ** Component Import
import ReactDraftWysiwyg from 'src/@core/components/react-draft-wysiwyg'

const EditorControlled = () => {
    // ** State
    const [value, setValue] = useState(EditorState.createEmpty())

    return (
        <div className="textEditor">
            <ReactDraftWysiwyg wrapperClassName='editor-wrapper' editorClassName='text-editor' toolbarClassName='toolbar-editor' editorState={value} onEditorStateChange={data => setValue(data)} />
        </div>
    )
}

export default EditorControlled
