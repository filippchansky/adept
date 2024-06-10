import React from "react";
import style from "./style.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import {
  deleteCompanies,
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
  console.log(staff);

  return (
    <>
      <table className={style.table}>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={selectedCompaniesIds.length === companies.length}
                onChange={handleSelectAll}
              />
              Выделить всё
            </th>
            <th>Название компании</th>
            <th>Кол-во сотрудников</th>
            <th>Адрес</th>
          </tr>
        </thead>
        <tbody>
          {companies.map((item) => (
            <tr
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
                <TableItem id={item.id} value={item.name} field="name" />
              </td>
              <td>
                {
                  staff.filter((staffItem) => staffItem.companyId === item.id)
                    .length
                }
              </td>
              <td>
                <TableItem id={item.id} value={item.address} field="address" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button  className={selectedCompaniesIds.length > 0 ? style.deleteBtn : style.btnDisabled} onClick={handleDeleteCompanies}>delete</button>
    </>
  );
};
export default TableCompany;
