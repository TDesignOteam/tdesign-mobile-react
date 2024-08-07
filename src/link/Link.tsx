import classNames from 'classnames';
import React from 'react';
import useConfig from '../_util/useConfig';
import { TdLinkProps } from './type';
import { StyledProps } from '../common';
import useDefaultProps from '../hooks/useDefaultProps';
import { linkDefaultProps } from './defaultProps';

export interface LinkProps extends TdLinkProps, StyledProps {}

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => {
  const {
    children,
    content,
    className,
    underline,
    prefixIcon,
    suffixIcon,
    theme,
    disabled,
    hover,
    onClick,
    href,
    size,
    ...otherProps
  } = useDefaultProps<LinkProps>(props, linkDefaultProps);

  const { classPrefix } = useConfig();

  const childNode = content || children;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (disabled) {
      return;
    }
    onClick?.(e);
  };

  return (
    <a
      {...otherProps}
      href={disabled || !href ? undefined : href}
      ref={ref}
      className={classNames(
        className,
        `${classPrefix}-link`,
        `${classPrefix}-link--${size || 'medium'}`,
        `${classPrefix}-link--${theme || 'default'}`,
        {
          [`${classPrefix}-link--underline`]: !!underline,
          [`${classPrefix}-link--disabled`]: !!disabled,
          [`${classPrefix}-link--hover`]: !!hover && !disabled,
        },
      )}
      onClick={handleClick}
    >
      {prefixIcon && <span className={classNames([`${classPrefix}-link__prefix-icon`])}>{prefixIcon}</span>}
      {childNode && <span className={classNames([`${classPrefix}-link__content`])}>{childNode}</span>}
      {suffixIcon && <span className={classNames([`${classPrefix}-link__suffix-icon`])}>{suffixIcon}</span>}
    </a>
  );
});

Link.displayName = 'Link';

export default Link;
