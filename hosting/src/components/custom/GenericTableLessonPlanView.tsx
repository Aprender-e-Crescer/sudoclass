import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, X, ChevronDown, ChevronUp } from "lucide-react";
import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog"; 

export const GenericTableLessonPlanView = ({
  data,
  columns,
  expandedRows,
  toggleRow,
}: {
  data: any;
  columns: any;
  expandedRows: number[];
  toggleRow: (index: number) => void;
}) => {
  const [dialogOpen, setDialogOpen] = useState(false); 
  const [selectedRowIndex, setSelectedRowIndex] = useState<number | null>(null);

  const handleDelete = () => {
    if (selectedRowIndex !== null) {
      console.log(`Excluindo a linha ${selectedRowIndex}`);
      setDialogOpen(false); 
    }
  };

  return (
    <>  
      <div className="flex gap-4 pt-4 font-semibold text-[#787486] pb-2 border-b border-gray-300">
        <a className="cursor-pointer pl-16 max-sm:pl-2 hover:text-black" href="#">Mural</a>
        <a className="hover:text-black cursor-pointer" href="#">Frequencia</a>
        <a className="hover:text-black cursor-pointer" href="#">Notas</a>
        <a className="hover:text-black cursor-pointer" href="#">Plano de Aula</a>
      </div>
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            {columns.map((col: any, index: number) => (
              <TableHead
                key={index}
                className={`font-semibold text-black ${
                  col.accessor === "date" ? "max-sm:pl-24 sm:pl-32" : "hidden sm:table-cell"
                }`}
              >
                {col.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row: any, rowIndex: number) => (
            <React.Fragment key={rowIndex}>
              <TableRow>
                {columns.map((col: any, colIndex: number) => (
                  <TableCell key={colIndex} className="px-1 sm:py-2 sm:px-4">
                    {col.accessor === "actions" ? (
                      <div className="flex items-center space-x-0 sm:space-x-1 max-sm:-space-x-10">
                        <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghostWhite"
                              size="small"
                              className=""
                              onClick={() => {
                                setSelectedRowIndex(rowIndex); 
                                setDialogOpen(true);
                              }}
                            >
                              <X className="h-6 w-6 text-red-500" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent className="max-sm:max-w-[300px]">
                            <AlertDialogHeader className="pb-4">
                              <AlertDialogTitle className="flex justify-center max-sm:text-sm font-medium ">Você Deseja Excluir Esse Plano de Aula?</AlertDialogTitle>
                            </AlertDialogHeader>
                            <div className="flex justify-end max-sm:justify-center space-x-2">
                              <AlertDialogCancel>
                                <Button
                                  variant="lightTextBlack"
                                  className="font-medium size = small"
                                >
                                  Cancelar
                                </Button>
                              </AlertDialogCancel>
                              <AlertDialogAction>
                                <Button
                                  variant="blueButton"
                                  className="font-medium"
                                  onClick={handleDelete} 
                                >
                                  Continue
                                </Button>
                              </AlertDialogAction>
                            </div>
                          </AlertDialogContent>
                        </AlertDialog>
                        <Button variant="ghostWhite" className="sm:hidden" size="small" onClick={(e) => { e.stopPropagation(); toggleRow(rowIndex); }}>
                          {expandedRows.includes(rowIndex) ? (
                            <ChevronUp className="h-4 w-4 text-black" />
                          ) : (
                            <ChevronDown className="h-4 w-4 text-black" />
                          )}
                        </Button>
                      </div>
                    ) : col.accessor === "date" ? (
                      <div className="flex items-center max-sm:-space-x-5">
                        <Button variant="ghostWhite" size="small" className="max-sm:pr-10 hover:bg-transparent focus:outline-none">
                          <Edit className="h-4 w-4 text-black" />
                        </Button>
                        <span>{row[col.accessor]}</span>
                      </div>
                    ) : (
                      <span className="hidden sm:block">{row[col.accessor]}</span>
                    )}
                  </TableCell>
                ))}
              </TableRow>
              {expandedRows.includes(rowIndex) && (
                <TableRow className="sm:hidden">
                  <TableCell colSpan={columns.length} className="p-4">
                    <div className="py-1">
                      <p><strong>Início:</strong> {row.start}</p>
                      <p><strong>Fim:</strong> {row.end}</p>
                      <p><strong>Plano de Aula:</strong> {row.lessonPlan}</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </>
  );
};
