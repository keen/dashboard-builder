import React from 'react'
import Select from "react-select";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

const paletteOptions = [
  { value: "", label: "Default" },
  { value: "autocollector", label: "Autocollector" },
  { value: "modern", label: "Modern" },
  { value: "dracula", label: "Dracula" }
];

const SettingsDashboard = ({
  palette,
  selectPalette,
}) => {
  return (
    <Tabs>
      <TabList>
        <Tab>General</Tab>
        <Tab>Theme</Tab>
      </TabList>

      <TabPanel>
        <h4>Palette:</h4>
        <Select
          value={palette}
          onChange={selectPalette}
          options={paletteOptions}
        />
      </TabPanel>
      <TabPanel>
        Theme builder
      </TabPanel>
    </Tabs>
  )
}

export default SettingsDashboard
