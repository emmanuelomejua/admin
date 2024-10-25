import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import React, { FC } from 'react';

interface ITbale {
  headcells: any;
  tableData: any;
}

const BasicTable:FC<ITbale> = ({headcells, tableData}) => {
  return (
    <TableContainer sx={{ boxShadow: "none", border: '1px solid #fafafa', borderRadius: '20px 20px 0 0'}}>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: '#6922D1', color: '#fff' }}>
          {headcells?.map((data: any, i: any) => (
							<TableCell key={i} sx={{ fontWeight: 500, fontSize: 14, color: '#fff' }}>
								{data?.name}
							</TableCell>
						))}
          </TableRow>
        </TableHead>

        <TableBody sx={{ backgroundColor: '#fafafa', color: '#000' }}>
        {tableData?.map((row: any, rowIndex: any) => (
						<TableRow key={rowIndex}>
							{headcells?.map((col: any, colIndex: any) => (
								<TableCell align="left" key={colIndex} sx={{ fontWeight: 400, fontSize: 13 }}>
									{
										row[col.key]
									}
								</TableCell>
							))}

						</TableRow>
					))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default BasicTable;
