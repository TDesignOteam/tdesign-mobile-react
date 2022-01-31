import React, { FC, useEffect, useRef, useState } from "react";
import Mask from "tdesign-mobile-react/mask";
import { CSSTransition } from "react-transition-group"
import classnames from "classnames"
import { TdPopupProps } from "./type";
import usePopupCssTransition from "./hooks/usePopupCssTransition";

const prefix = 't';
const name = `${prefix}-popup`;

const DEFAULT_SHOW_OVERLAY = true;

const DEFAULT_ZINDEX = 1500;

const DEFAULT_PLACEMENT = 'top';

const DEFAULT_VISIBLE = false;

const getContentTransitionClassName = (placement) => {
    if (placement === 'center') {
        return `slide-zoom`
    }
    return `slide-${placement}`;
}

const Popup: FC<TdPopupProps> = (prop) => {
    const { 
        children, 
        placement = DEFAULT_PLACEMENT, 
        showOverlay = DEFAULT_SHOW_OVERLAY, 
        visible,
        defaultVisible = DEFAULT_VISIBLE, 
        zIndex = DEFAULT_ZINDEX, 
        onVisibleChange 
    } = prop;

    // 判断是否受控
    const isControl = visible !== undefined;

    const contentTransitionClassName = getContentTransitionClassName(placement)

    const [currentVisible, setCurrentVisible] = useState(visible);

    const contentRef = useRef<HTMLDivElement>(null);

    const maskRef = useRef<HTMLDivElement>(null);

    const maskCssTransitionState = usePopupCssTransition({ contentRef: maskRef, classPrefix: 'fade' });

    const cssTransitionState = usePopupCssTransition({ contentRef, classPrefix: contentTransitionClassName });

    const rootStyles = {
        zIndex,
    }

    const handleMaskClick = () => {   
        if (!isControl) return;
        setCurrentVisible(false);
    }

    useEffect(() => {
        visible && setCurrentVisible(visible);
    }, [visible])

    useEffect(() => {
        defaultVisible && setCurrentVisible(defaultVisible);
    }, [defaultVisible])

    useEffect(() => {
        // 非受控属性禁止触发onVisibleChange
        isControl && onVisibleChange && onVisibleChange(currentVisible);
    }, [currentVisible, onVisibleChange, isControl]);

    return <>
        <div className={`${name}`} style={rootStyles}>
            <CSSTransition in={currentVisible} appear {...maskCssTransitionState.props}>
                <div ref={maskRef} style={{display: 'none'}}>
                    <Mask transparent={!showOverlay} click={handleMaskClick}/> 
                </div>
            </CSSTransition>
            <CSSTransition in={currentVisible} appear {...cssTransitionState.props}>
                <div 
                    ref={contentRef} 
                    className={classnames([
                        `${name}--content`,
                        `${name}--content-${placement}`
                    ])}
                    style={{
                        display: 'none'
                    }}
                >
                    { children }
                </div>
            </CSSTransition>
        </div>
    </>
}

export default Popup;
