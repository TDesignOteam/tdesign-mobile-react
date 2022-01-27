import React, { ChangeEvent, FC, createContext, ReactNode, useRef } from 'react';
import { RadioValue } from '.';
import Radio from './Radio';
import { TdRadioGroupProps } from './type';
import useDefault from './useDefault';

export interface RadioGroupProps extends TdRadioGroupProps {
  children?: ReactNode;
}

export interface RadioGroupContextProps {
  value: RadioValue[];
  disabled: boolean;
  onChange?: (value: RadioValue, context: { e: ChangeEvent<HTMLInputElement> }) => void;
}

export const RadioGroupContext = createContext<RadioGroupContextProps | null>(null);

const prefix = 't';
const cname = `${prefix}-radio-group`;

const RadioGroup: FC<RadioGroupProps> = (props) => {
  const { disabled, options, value, defaultValue, children } = props;
  const groupRef = useRef(null);
  const [internalValue, setInternalValue] = useDefault(value, defaultValue, props.onChange);
  const renderOptions = () =>
    options.map((option) => {
      if (typeof option === 'number' || typeof option === 'string') {
        return (
          <Radio value={option} key={option}>
            {option}
          </Radio>
        );
      }
      return (
        <Radio value={option.value} key={option.value} disabled={option.disabled}>
          {option.label}
        </Radio>
      );
    });
  return (
    <RadioGroupContext.Provider
      value={{
        value: internalValue ? [internalValue] : [],
        disabled,
        onChange: (value, { e }) => {
          console.log('value: ', value);
          if (typeof props.onChange === 'function') {
            props.onChange(value, { e });
          }
          setInternalValue(value, { e });
        },
      }}
    >
      <div ref={groupRef} className={cname}>
        {children || renderOptions()}
      </div>
    </RadioGroupContext.Provider>
  );
};

export default RadioGroup;
