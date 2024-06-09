import React from 'react'
import style from "./style.module.scss"

interface TableCompanyProps {
    
}

const TableCompany:React.FC<TableCompanyProps> = ({}) => {
    
    return (
        <table className={style.table}>
	<thead>
		<tr>
			<th>First Name</th>
			<th>Last Name</th>
			<th>ZIP</th>
			<th>Birthday</th>
			<th>Points</th>
			<th>Average</th>
			<th>Amount</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>Gloria</td>
			<td>Reeves</td>
			<td>67439</td>
			<td>10/18/1985</td>
			<td>4</td>
			<td>0.1</td>
			<td>$50</td>
		</tr>
		...
	</tbody>
</table>
    )
}
export default TableCompany;