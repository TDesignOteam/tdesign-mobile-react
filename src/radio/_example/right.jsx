import React, { useState } from 'react';
import { Radio, RadioGroup } from 'tdesign-mobile-react';

export default function () {
  const [defaultValue, setDefaultValue] = useState('idx0');
  return (
    <RadioGroup value={defaultValue} onChange={setDefaultValue}>
      <Radio label="单选" align="right" value="idx0"></Radio>
      <Radio label="单选" align="right" value="idx1"></Radio>
      <Radio label="单选" align="right" value="idx2"></Radio>
      <Radio
        label="单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选单选"
        maxLabelRow="1"
        align="right"
        value="idx3"
      />
    </RadioGroup>
  );
}
