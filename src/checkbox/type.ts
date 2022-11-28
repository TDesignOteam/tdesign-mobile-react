/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TNode } from '../common';
import { ChangeEvent, MouseEvent } from 'react';

export interface TdCheckboxProps {
  /**
   * 多选框和内容相对位置
   * @default left
   */
  align?: 'left' | 'right';
  /**
   * 用于标识是否为「全选选项」。单独使用无效，需在 CheckboxGroup 中使用
   * @default false
   */
  checkAll?: boolean;
  /**
   * 是否选中
   * @default false
   */
  checked?: boolean;
  /**
   * 是否选中，非受控属性
   * @default false
   */
  defaultChecked?: boolean;
  /**
   * 多选框内容，同 label
   */
  children?: TNode;
  /**
   * 多选框内容
   */
  content?: TNode;
  /**
   * 是否禁用组件内容（content）触发选中
   */
  contentDisabled?: boolean;
  /**
   * 是否禁用组件
   */
  disabled?: boolean;
  /**
   * 自定义选中图标和非选中图标。示例：[选中态图标，非选中态图标]
   */
  icon?: Array<TNode>;
  /**
   * 是否为半选
   * @default false
   */
  indeterminate?: boolean;
  /**
   * 主文案
   */
  label?: TNode;
  /**
   * 内容最大行数限制
   * @default 5
   */
  maxContentRow?: number;
  /**
   * 主文案最大行数限制
   * @default 3
   */
  maxLabelRow?: number;
  /**
   * HTML 元素原生属性
   * @default ''
   */
  name?: string;
  /**
   * 只读状态
   * @default false
   */
  readonly?: boolean;
  /**
   * 多选框的值
   */
  value?: string | number;
  /**
   * 值变化时触发
   */
  onChange?: (checked: boolean, context: { e: ChangeEvent<HTMLDivElement> | MouseEvent<HTMLDivElement> }) => void;
}

export interface TdCheckboxGroupProps {
  /**
   * 是否禁用组件
   * @default false
   */
  disabled?: boolean;
  /**
   * 支持最多选中的数量
   */
  max?: number;
  /**
   * 统一设置内部复选框 HTML 属性
   * @default ''
   */
  name?: string;
  /**
   * 以配置形式设置子元素。示例1：`['北京', '上海']` ，示例2: `[{ label: '全选', checkAll: true }, { label: '上海', value: 'shanghai' }]`。checkAll 值为 true 表示当前选项为「全选选项」
   * @default []
   */
  options?: Array<CheckboxOption>;
  /**
   * 选中值
   * @default []
   */
  value?: CheckboxGroupValue;
  /**
   * 选中值，非受控属性
   * @default []
   */
  defaultValue?: CheckboxGroupValue;
  /**
   * 值变化时触发，`context.current` 表示当前变化的数据项，如果是全选则为空；`context.type` 表示引起选中数据变化的是选中或是取消选中
   */
  onChange?: (value: CheckboxGroupValue, context: CheckboxGroupChangeContext) => void;
}

export type CheckboxOption = string | number | CheckboxOptionObj;

export interface CheckboxOptionObj { label?: string | TNode; value?: string | number; disabled?: boolean; name?: string; checkAll?: true };

export type CheckboxGroupValue = Array<string | number>;

export interface CheckboxGroupChangeContext { e: ChangeEvent<HTMLDivElement>; current: CheckboxOption | TdCheckboxProps; type: 'check' | 'uncheck' };
