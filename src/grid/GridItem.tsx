import React, { FC, useContext, useMemo } from 'react';
import cls from 'classnames';
import isString from 'lodash/isString';
import isObject from 'lodash/isObject';
import isFunction from 'lodash/isFunction';
import { Badge, Image } from 'tdesign-mobile-react';
import { TdGridItemProps, TdGridProps } from './type';
import useConfig from '../_util/useConfig';
import { GridContext } from './GridContext';

import { gridItemDefaultProps } from './defaultProps';

const getGridItemWidth = (column: number) => (column > 0 ? `${100 / column}%` : 0);

export interface GridItemProp extends TdGridItemProps, TdGridProps {}

const GridItem: FC<GridItemProp> = (prop) => {
  const { description, image, layout, text, badge, ...resetProps } = prop;

  const { classPrefix } = useConfig();
  const { align, gutter, column, border } = useContext(GridContext);

  const name = `${classPrefix}-grid-item`;

  const rootClass = useMemo(
    () =>
      cls(name, `${name}--${layout}`, {
        [`${name}--bordered`]: border,
        [`${name}--surround`]: border && gutter,
      }),
    [border, name, gutter, layout],
  );

  const rootStyle = useMemo(() => {
    const percent = getGridItemWidth(column);
    const style: Record<string, any> = {
      textAlign: ['center', 'left'].includes(align) ? align : 'center',
    };
    if (percent !== 0) {
      style.flexBasis = percent;
    }
    return style;
  }, [column, align]);

  const size = useMemo(() => {
    if (column > 4 || !column) return 'small';
    return column < 4 ? 'large' : 'middle';
  }, [column]);

  const gridItemImage = useMemo(() => {
    if (!image) {
      return null;
    }
    let imgProps: Record<string, any>;
    if (isString(image)) {
      imgProps = { src: image };
    }
    if (isObject(image) && !isFunction(image) && !React.isValidElement(image)) {
      imgProps = image;
    }
    return imgProps ? <Image shape="round" {...imgProps} /> : image;
  }, [image]);

  return (
    <div {...resetProps} className={rootClass} style={rootStyle}>
      <div className={cls([`${name}__image`, `${name}__image--${size}`])}>
        {badge ? <Badge {...badge}>{gridItemImage}</Badge> : gridItemImage}
      </div>
      <div className={cls([`${name}__content`, `${name}__content--${layout}`])}>
        <div className={cls([`${name}__title`, `${name}__title--${size}`])}>{text}</div>
        <div className={cls([`${name}__description`, `${name}__description--${layout}`])}>{description}</div>
      </div>
    </div>
  );
};

GridItem.displayName = 'GridItem';
GridItem.defaultProps = gridItemDefaultProps;

export default GridItem;
