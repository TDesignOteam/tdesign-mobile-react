import React from 'react';
import { Input } from 'tdesign-mobile-react';
import './style/index.less';

export default function Custom() {
  return (
    <div className="input-custom">
      <Input label="标签文字" placeholder="请输入文字" />
    </div>
  );
}
