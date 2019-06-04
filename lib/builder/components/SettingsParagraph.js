import React from "react";
import TextEditor from "./TextEditor";

const SettingsParagraph = ({
  setTextForParagraph,
  dashboardData: {
    text
  },
  settingsVisible
}) => {
  return (
    <React.Fragment>
      <h4>Text:</h4>
      <TextEditor
        setTextForParagraph={setTextForParagraph}
        value={text}
        index={settingsVisible}
      />
    </React.Fragment>
  );
};

export default SettingsParagraph;
