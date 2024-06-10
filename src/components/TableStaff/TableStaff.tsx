import React, {  useState } from "react";
import style from "./style.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { TableItem } from "../TableCompany/TableItem/TableItem";
import {
  Staff,
  createStaff,
  deleteStaff,
  editStaff,
  selectAllStaff,
  selectStaff,
  unselectAllStaff,
} from "../../store/slices/staffSlice";
import ModalAddStaff from "../ModalAddStaff/ModalAddStaff";
import Input from "../UI/Input/Input";
import DropDown from "../UI/DropDown/DropDown";

interface TableStaffProps {}

export const TableStaff: React.FC<TableStaffProps> = ({}) => {
  const [newUser, setNewUser] = useState<Staff>({
    companyId: 0,
    firstName: "",
    id: Date.now(),
    lastName: "",
    position: "",
  });
  const [dropDown, setDropDown] = useState(false);
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch();
  const { selectedStaffIds, staff } = useSelector(
    (state: RootState) => state.staff
  );
  const companiesId = useSelector(
    (state: RootState) => state.companies.selectedCompaniesIds
  );
  const companies = useSelector(
    (state: RootState) => state.companies.companies
  );
  const filterStaff = staff.filter((item) =>
    companiesId.includes(item.companyId)
  );

  const handleEdit = (id: number, field: string, newValue: string) => {
    dispatch(
      editStaff({
        id: id,
        field: field,
        value: newValue,
      })
    );
  };

  const handleSelectAll = () => {
    if (selectedStaffIds.length === staff.length) {
      dispatch(unselectAllStaff());
    } else {
      dispatch(selectAllStaff());
    }
  };

  const handleSelect = (id: number) => {
    dispatch(selectStaff(id));
  };

  const handleDelete = () => {
    dispatch(deleteStaff(selectedStaffIds));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(createStaff(newUser));
    setModal(false);
  };

  if (companiesId.length === 0) {
    return null;
  }

  return (
    <>
      <ModalAddStaff active={modal} setActive={setModal}>
        <form className={style.modalContent} onSubmit={onSubmit}>
          <Input
            text="Имя"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setNewUser((prev) => ({
                ...prev,
                firstName: event.target.value,
              }));
            }}
          />
          <Input
            text="Фамилия"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setNewUser((prev) => ({
                ...prev,
                lastName: event.target.value,
              }));
            }}
          />
          <Input
            text="Должность"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setNewUser((prev) => ({
                ...prev,
                position: event.target.value,
              }));
            }}
          />
          <DropDown
            onChange={(value) =>
              setNewUser((prev) => ({
                ...prev,
                companyId: value,
              }))
            }
            active={dropDown}
            setActive={setDropDown}
            list={companies}
          />
          {newUser.companyId !== 0 &&
            newUser.firstName.length > 0 &&
            newUser.lastName.length > 0 &&
            newUser.id !== 0 &&
            newUser.position.length > 0 && (
              <button className={style.addBtn} type="submit">
                Добавить
              </button>
            )}
        </form>
      </ModalAddStaff>
      <button
        className={
          selectedStaffIds.length > 0 ? style.deleteBtn : style.btnDisabled
        }
        onClick={handleDelete}
      >
        Удалить
      </button>
      <button className={style.addBtn} onClick={() => setModal(true)}>
        Добавить
      </button>
      <table className={style.table}>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                onChange={handleSelectAll}
                checked={selectedStaffIds.length === staff.length}
              />
            </th>
            <th>Фамилия</th>
            <th>Имя</th>
            <th>Должность</th>
          </tr>
        </thead>
        <tbody>
          {filterStaff.map((item) => (
            <tr key={item.id}>
              <td>
                <input
                  type="checkbox"
                  name=""
                  id=""
                  onChange={() => handleSelect(item.id)}
                  checked={selectedStaffIds.includes(item.id)}
                />
              </td>
              <td>
                <TableItem
                  value={item.lastName}
                  id={item.id}
                  onEdit={handleEdit}
                  field="lastName"
                />
              </td>
              <td>
                <TableItem
                  value={item.firstName}
                  id={item.id}
                  onEdit={handleEdit}
                  field="firstName"
                />
              </td>
              <td>
                <TableItem
                  value={item.position}
                  id={item.id}
                  onEdit={handleEdit}
                  field="position"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
