import React from 'react';
import {Editor, EditorState} from 'draft-js';

export function MarkdownEditor() {
  const [editorState, setEditorState] = React.useState(
    EditorState.createEmpty()
  );

  const editor = React.useRef(null);

  function focusEditor() {
    editor.current.focus();
  }

  React.useEffect(() => {
    focusEditor()
  }, []);

  return (
    <div onClick={focusEditor} onKeyDown={textAreaEdit}>
      <Editor
        ref={editor}
        editorState={editorState}
        onChange={editorState => setEditorState(editorState)}
      />
    </div>
  );

  function textAreaEdit(e) {
    console.log(editorState)
    if (e.keyCode === 9) {
      e.preventDefault();

      if (!e.shiftKey) {
        let caretPosStart = editorState + 1;
        let caretPosEnd = editorState + 1;
        let textAreaTxt = "\n";
        let txtToAdd = "    ";
        let caretIterator = textAreaTxt.substring(0, caretPosStart).lastIndexOf("\n")
        caretPosStart += txtToAdd.length
        while (textAreaTxt.substring(caretIterator).indexOf("\n") !== -1 && caretIterator + textAreaTxt.substring(caretIterator).indexOf("\n") + 1 <= caretPosEnd) {
          caretIterator = caretIterator + textAreaTxt.substring(caretIterator).indexOf("\n") + 1
          textAreaTxt = textAreaTxt.substring(0, caretIterator) + txtToAdd + textAreaTxt.substring(caretIterator);
          caretPosEnd += txtToAdd.length
        }
      } else {
        let caretPosStart = editorState + 1;
        let caretPosEnd = editorState + 1;
        let textAreaTxt = "\n";
        let txtToDel = "    ";
        let caretIterator = textAreaTxt.substring(0, caretPosStart).lastIndexOf("\n")
        let buf = 0
        for (let i = caretIterator + 1; i < caretIterator + 1 + txtToDel.length; i++) {
          if (textAreaTxt[i] !== txtToDel[i - caretIterator - 1])
            break
          buf++
        }
        caretPosStart -= buf
        while (textAreaTxt.substring(caretIterator).indexOf("\n") !== -1 && caretIterator + textAreaTxt.substring(caretIterator).indexOf("\n") + 1 <= caretPosEnd) {
          caretIterator = caretIterator + textAreaTxt.substring(caretIterator).indexOf("\n") + 1
          buf = 0
          for (let i = caretIterator; i < caretIterator + txtToDel.length; i++) {
            if (textAreaTxt[i] !== txtToDel[i - caretIterator])
              break
            buf++
          }
          textAreaTxt = textAreaTxt.substring(0, caretIterator) + textAreaTxt.substring(caretIterator + buf)
          caretPosEnd -= buf
        }
      }
    }
  }
}