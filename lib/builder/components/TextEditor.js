import ReactQuill from 'react-quill';
import React from 'react';
import { connect } from 'react-redux';
import { setTextForParagraph } from '../../actions/rootActions';
import 'react-quill/dist/quill.snow.css';

const TextEditor = props => {
  const { text, settingsVisible, items } = props;
  const item = items.find(item => item.i === settingsVisible);
  const editorText = (item && item.text) || '';
  return (
    <ReactQuill
      value={editorText}
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
    dashboardInfo: {
      settings: { items }
    }
  } = state.app;
  return {
    settingsVisible,
    items
  };
};

const mapDispatchToProps = {
  setTextForParagraph
};

export default connect(mapStateToProps, mapDispatchToProps)(TextEditor);

TextEditor.modules = {
  toolbar: {
    container: [
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ color: [] }],
      ['clean']
    ]
  }
};
