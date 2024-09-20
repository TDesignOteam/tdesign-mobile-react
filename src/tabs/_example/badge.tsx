import React from 'react';
import { Tabs, TabPanel } from 'tdesign-mobile-react';

export default () => (
  <div>
    <Tabs defaultValue={'first'}>
      <TabPanel value={'first'} badgeProps={{ dot: true, offset: [-4, 1] }} label="选项"></TabPanel>
      <TabPanel value={'second'} badgeProps={{ count: 8, offset: [-8, 3] }} label="选项"></TabPanel>
      <TabPanel value={'third'} label="选项"></TabPanel>
    </Tabs>
  </div>
);
