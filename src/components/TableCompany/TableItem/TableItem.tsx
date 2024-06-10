import React, { useState } from "react";
import style from "./style.module.scss";
import editIcon from "/icons/edit.svg";
import doneIcon from "/icons/done.svg";

interface TableItemProps {
  value: string;
  id: number;
  field?: string;
  onEdit: (id: number, field: string, newValue: string) => void
}

export const TableItem: React.FC<TableItemProps> = ({ value, id, field, onEdit }) => {
  const [edit, setEdit] = useState(false);
  const [newValue, setNewValue] = useState(value);

  const handleEdit = () => {
    if (field) {
      onEdit(id, field, newValue)
    }
    setEdit(false);
  };

  return (
    <div className={style.content}>
      {edit ? (
        <input
          className={style.editInput}
          type="text"
          defaultValue={value}
          onChange={(e) => setNewValue(e.target.value)}
        />
      ) : (
        <p>{value}</p>
      )}
      {edit ? (
        <button onClick={handleEdit}>
          <img className={style.icon} src={doneIcon} alt="" />
        </button>
      ) : (
        <button onClick={() => setEdit(true)}>
          <img className={style.icon} src={editIcon} alt="" />
        </button>
      )}
    </div>
  );
};
