import React, { forwardRef, memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { StyledProps } from '../common';
import type { TdSideBarProps } from './type';
import { SideBarDefaultProps } from './defaultProps';
import { SideBarProvider } from './SideBarContext';
import useConfig from '../_util/useConfig';
import useDefault from '../_util/useDefault';
import parseTNode from '../_util/parseTNode';

export interface SideBarProps extends TdSideBarProps, StyledProps {}

/**
 * SideBar is a sidebar component that can be used to display a list of items in a collapsible menu.
 *
 * @param {Object} props - The properties of the SideBar component.
 * @returns The rendered SideBar component.
 */
const SideBar = forwardRef<HTMLDivElement, SideBarProps>((props, ref) => {
  const { classPrefix } = useConfig();
  const name = `${classPrefix}-side-bar`;

  const { onClick, onChange, children, defaultValue, value } = props;
  const [activeValue, onToggleActiveValue] = useDefault(value, defaultValue, onChange);

  const defaultIndex = useRef(-1);
  const updateChild = onToggleActiveValue;

  const [childrenList, setChildrenList] = useState([]);

  useEffect(() => {
    onChange?.(activeValue);
  }, [activeValue, onChange]);

  /**
   * Adds a child component to the children array.
   *
   * @param {React.Element} child - The child component to add.
   */
  const relation = useCallback((child) => {
    setChildrenList((prevChildrenList) => [...prevChildrenList, child]);
  }, []);

  /**
   * Removes a child component from the children array.
   *
   * @param {React.Element} child - The child component to remove.
   */
  const removeRelation = useCallback((child) => {
    setChildrenList((prevChildrenList) => prevChildrenList.filter((item) => item !== child));
  }, []);

  /**
   * Handles the click event on a SideBar item.
   *
   * @param {string | number} cur - The value of the clicked item.
   * @param {string} label - The label of the clicked item.
   */
  const onClickItem = useCallback(
    (cur, label) => {
      onToggleActiveValue(cur);
      onClick?.(cur, label);
    },
    [onToggleActiveValue, onClick],
  );

  const memoProviderValues = useMemo(
    () => ({
      defaultIndex,
      activeValue,
      updateChild,
      childrenList,
      relation,
      removeRelation,
      onClickItem,
    }),
    [activeValue, updateChild, childrenList, relation, removeRelation, onClickItem],
  );

  return (
    <div ref={ref} className={name}>
      <SideBarProvider value={memoProviderValues}>{parseTNode(children)}</SideBarProvider>
      <div className={`${name}__padding`}></div>
    </div>
  );
});

SideBar.defaultProps = SideBarDefaultProps;

export default memo(SideBar);
