import React, { useState } from 'react';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';
import TDemoHeader from '../../../site/mobile/components/DemoHeader';
import './style/index.less';
import WithTitle from './with-title';
import CustomClose from './custom-close';
import Button from '../../button';
import Popup from '..';

function PlacementBottom() {
  const [visible, setVisible] = useState(false);

  const handleVisibleChange = (visible) => {
    setVisible(visible);
  };

  return (
    <>
      <Button variant="outline" block={true} theme="primary" size="large" onClick={() => setVisible(true)}>
        底部弹出
      </Button>

      <Popup
        visible={visible}
        onVisibleChange={handleVisibleChange}
        placement="bottom"
        style={{ padding: '100px' }}
      ></Popup>
    </>
  );
}

function PlacementTop() {
  const [visible, setVisible] = useState(false);

  const handleVisibleChange = (visible) => {
    setVisible(visible);
  };

  return (
    <>
      <Button variant="outline" block={true} theme="primary" size="large" onClick={() => setVisible(true)}>
        顶部弹出
      </Button>

      <Popup
        visible={visible}
        onVisibleChange={handleVisibleChange}
        placement="top"
        style={{ padding: '100px' }}
      ></Popup>
    </>
  );
}

function PlacementLeft() {
  const [visible, setVisible] = useState(false);

  const handleVisibleChange = (visible) => {
    setVisible(visible);
  };

  return (
    <>
      <Button variant="outline" block={true} theme="primary" size="large" onClick={() => setVisible(true)}>
        左侧弹出
      </Button>

      <Popup
        visible={visible}
        onVisibleChange={handleVisibleChange}
        placement="left"
        style={{ padding: '100px' }}
      ></Popup>
    </>
  );
}

function PlacementRight() {
  const [visible, setVisible] = useState(false);

  const handleVisibleChange = (visible) => {
    setVisible(visible);
  };

  return (
    <>
      <Button variant="outline" block={true} theme="primary" size="large" onClick={() => setVisible(true)}>
        右侧弹出
      </Button>

      <Popup
        visible={visible}
        onVisibleChange={handleVisibleChange}
        placement="right"
        style={{ padding: '100px' }}
      ></Popup>
    </>
  );
}

function PlacementCenter() {
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

export default function Index() {
  return (
    <div className="tdesign-mobile-popup-demo">
      <TDemoHeader title="Popup 弹窗层" summary="由其他控件触发，屏幕滑出或弹出一块自定义内容区域" />
      <TDemoBlock title="01 组件类型" summary="基础弹出层" padding={true}>
        <PlacementTop />
        <PlacementLeft />
        <PlacementCenter />
        <PlacementBottom />
        <PlacementRight />
      </TDemoBlock>
      <TDemoBlock title="01 组件示例" summary="应用示例" padding={true}>
        <WithTitle />
        <CustomClose />
      </TDemoBlock>
    </div>
  );
}
