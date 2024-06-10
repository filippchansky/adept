import React, { useRef, useState } from "react";
import style from "./style.module.scss";
import { Company } from "../../../store/slices/companySlice";

interface DropDownProps {
  active: boolean;
  setActive: Function;
  list: Company[];
  onChange: (value: number) => void
}

const DropDown: React.FC<DropDownProps> = ({ active, setActive, list, onChange }) => {
    const [value, setValue] = useState(list[0].name)
  const ref = useRef<HTMLDivElement>(null);


  return (
    <div ref={ref} className={style.wrapper}>
      <label>Компания</label>
      <div className={style.input} onClick={() => setActive(!active)}>{value}</div>
      <ul className={active ? [style.active, style.list].join(' ') : style.list}>
        {list.map((item) => (
          <li className={style.item} key={item.id} onClick={() => {
            onChange(item.id)
            setValue(item.name)
            setActive(false)
          }}>{item.name}</li>
        ))}
      </ul>
      
    </div>
  );
};
export default DropDown;
