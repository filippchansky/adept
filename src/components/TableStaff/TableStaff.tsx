import React from "react";
import style from "./style.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { TableItem } from "../TableCompany/TableItem/TableItem";

interface TableStaffProps {}

export const TableStaff: React.FC<TableStaffProps> = ({}) => {
  const staffState = useSelector((state: RootState) => state.staff);
  const companiesId = useSelector(
    (state: RootState) => state.companies.selectedCompaniesIds
  );
  const staff = staffState.filter((item) =>
    companiesId.includes(item.companyId)
  );

  if (companiesId.length === 0) {
    return null;
  }

  return (
    <table className={style.table}>
      <thead>
        <tr>
          <th>
            <input type="checkbox" />
            Выделить всех
          </th>
          <th>Фамилия</th>
          <th>Имя</th>
          <th>Должность</th>
        </tr>
      </thead>
      <tbody>
        {staff.map((item) => (
          <tr>
            <td>
              <input type="checkbox" name="" id="" />
            </td>
            <td>
              <TableItem value={item.lastName} id={item.id} />
            </td>
            <td>
              <TableItem value={item.firstName} id={item.id} />
            </td>
            <td>
              <TableItem value={item.position} id={item.id} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
