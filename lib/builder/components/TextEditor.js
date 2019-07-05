import ReactQuill from "react-quill";
import React from "react";
import { connect } from "react-redux";
import { setTextForParagraph } from "../../actions/rootActions";
import "react-quill/dist/quill.snow.css";

const TextEditor = props => {
  const { text, settingsVisible } = props;
  return (
    <ReactQuill
      value={text || ""}
      onChange={(newValue, delta, source) =>
        props.setTextForParagraph(newValue, source, settingsVisible)
      }
      modules={TextEditor.modules}
    />
  );
};

const mapStateToProps = state => {
  const {
    settingsVisible,
    dashboardInfo: { dashboardData }
  } = state;
  return {
    settingsVisible,
    text: dashboardData[settingsVisible].text
  };
};

const mapDispatchToProps = dispatch => ({
  setTextForParagraph: (newValue, source, settingsVisible) =>
    dispatch(setTextForParagraph(newValue, source, settingsVisible))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TextEditor);

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
