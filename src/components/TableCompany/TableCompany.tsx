import React from "react";
import style from "./style.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import {
  deleteCompanies,
  editCompany,
  selectAllCompanies,
  selectCompany,
  unselectAllCompanies,
} from "../../store/slices/companySlice";
import { TableItem } from "./TableItem/TableItem";

interface TableCompanyProps {}

const TableCompany: React.FC<TableCompanyProps> = ({}) => {
  const dispatch = useDispatch();
  const { companies, selectedCompaniesIds } = useSelector(
    (state: RootState) => state.companies
  );
  const staff = useSelector((state: RootState) => state.staff);

  const handleSelectAll = () => {
    if (selectedCompaniesIds.length === companies.length) {
      dispatch(unselectAllCompanies());
    } else {
      dispatch(selectAllCompanies());
    }
  };

  const handleSelectCompany = (id: number) => {
    dispatch(selectCompany(id));
  };
  const handleDeleteCompanies = () => {
    dispatch(deleteCompanies(selectedCompaniesIds));
  };
  const handleEdit = (id: number, field: string, newValue: string) => {
    dispatch(
      editCompany({
        id: id,
        field: field,
        value: newValue,
      })
    );
  };
  console.log(staff);

  return (
    <>
      <button
        className={
          selectedCompaniesIds.length > 0 ? style.deleteBtn : style.btnDisabled
        }
        onClick={handleDeleteCompanies}
      >{`Удалить ${
        selectedCompaniesIds.length > 0 ? selectedCompaniesIds.length : ""
      }`}</button>
      <table className={style.table}>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={selectedCompaniesIds.length === companies.length}
                onChange={handleSelectAll}
              />
            </th>
            <th>Название компании</th>
            <th>Кол-во сотрудников</th>
            <th>Адрес</th>
          </tr>
        </thead>
        <tbody>
          {companies.map((item) => (
            <tr
            key={item.id}
              className={
                selectedCompaniesIds.includes(item.id)
                  ? style.border
                  : undefined
              }
            >
              <td>
                <input
                  type="checkbox"
                  checked={selectedCompaniesIds.includes(item.id)}
                  onChange={() => handleSelectCompany(item.id)}
                />
              </td>
              <td>
                <TableItem
                  id={item.id}
                  value={item.name}
                  field="name"
                  onEdit={handleEdit}
                />
              </td>
              <td>
                {
                  staff.staff.filter((staffItem) => staffItem.companyId === item.id)
                    .length
                }
              </td>
              <td>
                <TableItem
                  id={item.id}
                  value={item.address}
                  field="address"
                  onEdit={handleEdit}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
export default TableCompany;
