import React, { useState } from 'react';
import { Popup, Button } from 'tdesign-mobile-react';

export default function Base() {
  const [visible, setVisible] = useState(false);

  const handleVisibleChange = (visible) => {
    setVisible(visible);
  };

  return (
    <>
      <Button variant="outline" block={true} theme="primary" size="large" onClick={() => setVisible(true)}>
        中间弹出
      </Button>

      <Popup
        visible={visible}
        onVisibleChange={handleVisibleChange}
        placement="center"
        style={{ padding: '100px' }}
      ></Popup>
    </>
  );
}
