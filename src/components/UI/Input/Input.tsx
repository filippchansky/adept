import React from "react";
import style from "./style.module.scss";

interface InputProps {
  text: string;
  onChange: (any: any) => void
}

const Input: React.FC<InputProps> = ({ text, onChange }) => {
  return (
    <div className={style.wrapper}>
      <label className={style.label} htmlFor={text}>{text}</label>
      <input type="text" className={style.input} id={text} onChange={onChange} />
    </div>
  );
};
export default Input;
