import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createPopper, Placement } from '@popperjs/core';
import { useClickAway } from 'ahooks';
import { CSSTransition } from 'react-transition-group';
import { CSSTransitionClassNames } from 'react-transition-group/CSSTransition';
import classNames from 'classnames';
import { TdPopoverProps } from './type';
import { StyledProps } from '../common';
import { usePrefixClass } from '../hooks/useClass';
import useDefaultProps from '../hooks/useDefaultProps';
import { popoverDefaultProps } from './defaultProps';
import { parseContentTNode } from '../_util/parseTNode';

export interface PopoverProps extends TdPopoverProps, StyledProps {}

const Popover: React.FC<PopoverProps> = (props) => {
  const { closeOnClickOutside, content, placement, showArrow, theme, triggerElement, visible, onVisibleChange } =
    useDefaultProps<PopoverProps>(props, popoverDefaultProps);

  const [currentVisible, setVisible] = useState(visible);
  const [active, setActive] = useState(visible);
  const referenceRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  let popper: ReturnType<typeof createPopper>;
  const popoverClass = usePrefixClass('popover');
  const contentClasses = useMemo(
    () =>
      classNames({
        [`${popoverClass}__content`]: true,
        [`${popoverClass}--${theme}`]: true,
      }),
    [popoverClass, theme],
  );

  const getPopperPlacement = (placement: PopoverProps['placement']): Placement =>
    placement?.replace(/-(left|top)$/, '-start').replace(/-(right|bottom)$/, '-end') as Placement;

  const placementPadding = ({
    popper,
    reference,
    placement,
  }: {
    popper: {
      width: number;
      height: number;
      x: number;
      y: number;
    };
    reference: {
      width: number;
      height: number;
      x: number;
      y: number;
    };
    placement: String;
  }) => {
    const horizontal = ['top', 'bottom'];
    const vertical = ['left', 'right'];
    const isBase = [...horizontal, ...vertical].find((item) => item === placement);
    if (isBase) {
      return 0;
    }

    const { width, x } = reference;
    const { width: popperWidth, height: popperHeight } = popper;
    const { width: windowWidth } = window.screen;

    const isHorizontal = horizontal.find((item) => placement.includes(item));
    const isEnd = placement.includes('end');
    const small = (a: number, b: number) => (a < b ? a : b);
    if (isHorizontal) {
      const padding = isEnd ? small(width + x, popperWidth) : small(windowWidth - x, popperWidth);
      return {
        [isEnd ? 'left' : 'right']: padding - 22,
      };
    }

    const isVertical = vertical.find((item) => placement.includes(item));
    if (isVertical) {
      return {
        [isEnd ? 'top' : 'bottom']: popperHeight - 22,
      };
    }
  };

  const getPopoverOptions = () => ({
    placement: getPopperPlacement(placement),
    modifiers: [
      {
        name: 'arrow',
        options: {
          padding: placementPadding,
        },
      },
    ],
  });

  const destroyPopper = () => {
    if (popper) {
      popper?.destroy();
      popper = null;
    }
  };

  const animationClassNames: CSSTransitionClassNames = {
    enter: `${popoverClass}--animation-enter`,
    enterActive: `${popoverClass}--animation-enter-active ${popoverClass}--animation-enter-to`,
    exitActive: `${popoverClass}--animation-leave-active ${popoverClass}--animation-leave-to`,
    exitDone: `${popoverClass}--animation-leave-done`,
  };

  const updatePopper = () => {
    if (currentVisible && referenceRef.current && popoverRef.current) {
      popper = createPopper(referenceRef.current, popoverRef.current, getPopoverOptions());
    }
    return null;
  };

  const updateVisible = (visible) => {
    setVisible((pre) => {
      if (pre !== visible) {
        onVisibleChange?.(visible);
      }
      return visible;
    });
  };

  const onClickAway = () => {
    if (currentVisible && closeOnClickOutside) {
      updateVisible(false);
    }
  };

  useClickAway(() => {
    onClickAway();
  }, [referenceRef.current, popoverRef.current]);

  const onClickReference = () => {
    updateVisible(!currentVisible);
  };

  useEffect(() => {
    setVisible(visible);
  }, [visible]);

  useEffect(() => {
    destroyPopper();
    updatePopper();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [placement]);

  useEffect(
    () => () => {
      onClickAway();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const contentStyle = useMemo<React.CSSProperties>(
    () => ({
      display: active ? null : 'none',
    }),
    [active],
  );

  const renderArrow = () => showArrow && <div className={`${popoverClass}__arrow`} data-popper-arrow />;
  const renderContentNode = () => (
    <div ref={popoverRef} data-popper-placement={placement} className={`${popoverClass}`} style={contentStyle}>
      <div className={contentClasses}>
        {parseContentTNode(content, {})}
        {renderArrow()}
      </div>
    </div>
  );

  return (
    <>
      <div ref={referenceRef} className={`${popoverClass}__wrapper`} onClick={onClickReference}>
        {triggerElement}
      </div>
      <CSSTransition
        in={currentVisible}
        classNames={animationClassNames}
        timeout={200}
        onEnter={() => {
          updatePopper();
          setActive(true);
        }}
        onExited={() => {
          destroyPopper();
          setActive(false);
        }}
        nodeRef={popoverRef}
      >
        <>{renderContentNode()}</>
      </CSSTransition>
    </>
  );
};

Popover.displayName = 'Popover';

export default Popover;
