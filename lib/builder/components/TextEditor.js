import ReactQuill from "react-quill";
import React from "react";
import "react-quill/dist/quill.snow.css";

const TextEditor = ({ setTextForParagraph, value, index }) => {
  return (
    <ReactQuill
      value={value || ""}
      onChange={(newValue, delta, source) =>
        setTextForParagraph(newValue, source, index)
      }
      modules={TextEditor.modules}
    />
  );
};

export default TextEditor;

TextEditor.modules = {
  toolbar: {
    container: [
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ color: [] }],
      ["clean"]
    ]
  }
};
