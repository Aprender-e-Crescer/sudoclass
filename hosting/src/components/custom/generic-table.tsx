import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

export const GenericTable = ({ data, columns }: { data: any; columns: any }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((col: any, index: number) => (
            <TableHead key={index} className="font-semibold text-black">
              {col.header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row: any, rowIndex: number) => (
          <TableRow key={rowIndex}>
            {columns.map((col: any, colIndex: number) => (
              <TableCell key={colIndex}>
                {col.Cell ? (
                  col.Cell(row)
                ) : col.tooltip ? (
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
                )}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
