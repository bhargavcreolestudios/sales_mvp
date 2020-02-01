import React from 'react';
import { Button as AntdButton } from 'antd';
import './style.css';

const Button = ({ children, className, ...props }) => (
  <AntdButton className={`btnMain ${className ? className : ''}`} {...props}>
    <span>{children}</span>
    <div className={'dropDownIcon'} />
  </AntdButton>
);
export default Button;
