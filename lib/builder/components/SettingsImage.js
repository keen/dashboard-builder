import React from 'react'

const SettingsImage = ({
  dashboardData: {
    src
  },
  setSrcForImg,
  settingsVisible
}) => {
  return (
    <React.Fragment>
      <h4>Image url:</h4>
      <input
        onChange={e => setSrcForImg(e, settingsVisible)}
        className="settings-input"
        value={src}
      />
    </React.Fragment>
  )
}

export default SettingsImage
