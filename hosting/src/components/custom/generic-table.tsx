import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

interface GenericTableProps {
  data: any[]
  columns: {
    header: string
    accessor?: string
    Cell?: (row: any) => JSX.Element
    tooltip?: string
  }[]
}

export const GenericTable = ({ data, columns }: GenericTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((col, index) => (
            <TableHead key={index} className="font-semibold text-black">
              {col.header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, rowIndex) => (
          <TableRow key={rowIndex}>
            {columns.map((col, colIndex) => (
              <TableCell key={colIndex}>
                {col.Cell ? (
                  col.Cell(row)
                ) : col.accessor ? (
                  col.tooltip ? (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span>{row[col.accessor]}</span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{col.tooltip}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ) : (
                    row[col.accessor]
                  )
                ) : null}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
