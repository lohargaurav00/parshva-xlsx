import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import data from '../dockets.json'

type Docket = {
  name: string
  startTime: string
  endTime: string
  noOfHoursWorked: string
  ratePerHour: string
  suppliers: string
  purchaseOrder: string
  description: string
}

export function DocketTable() {
  return (
    <Table>
      <TableHeader>
        
        <TableRow>
          <TableHead className="w-[100px]">Name</TableHead>
          <TableHead>Start Time</TableHead>
          <TableHead>End Time</TableHead>
          <TableHead>No. of Hour Worked</TableHead>
          <TableHead>Rate Per Hour</TableHead>
          <TableHead>Suppliers</TableHead>
          <TableHead>PO Number</TableHead>
          <TableHead>Description</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {
          data.map((docket: Docket, index: any) => (
            <TableRow key={index}>
              <TableCell >{docket.name}</TableCell>
              <TableCell >{docket.startTime}</TableCell>
              <TableCell >{docket.endTime}</TableCell>
              <TableCell >{docket.noOfHoursWorked}</TableCell>
              <TableCell >{docket.ratePerHour}</TableCell>
              <TableCell >{docket.suppliers}</TableCell>
              <TableCell >{docket.purchaseOrder}</TableCell>
              <TableCell >{docket.description}</TableCell>
            </TableRow>
          ))

        }
        
      </TableBody>
      <TableCaption>❗!!Due to some reasons excel file wont work in production was working in development due to lack of time i didnt solve that!! ❗</TableCaption>
      <TableCaption>Please refer code, also verify in local environment</TableCaption>
    </Table>
  )
}
