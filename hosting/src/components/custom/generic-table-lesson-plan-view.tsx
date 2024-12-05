
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, X, ChevronDown, ChevronUp } from "lucide-react";
import { Link } from "@tanstack/react-router";
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
import { useLessonPlanController } from "@/controllers/lesson-plan-controller"; // Import the controller
import { useQueryClient } from "@tanstack/react-query";
import { LESSON_PLAN_QUERY_KEY } from "@/constants/queries";

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

  // Get the deleteClass function from the controller
  const { deleteClass } = useLessonPlanController();
  
  const handleDelete = () => {
    if (selectedRowIndex !== null) {
      const row = data[selectedRowIndex];
      const lessonPlanId = row.idLessonPlan; // Adjust this field as needed
      deleteClass(lessonPlanId); // Trigger delete via the controller
      setDialogOpen(false); // Close dialog
    }
  };

  return (
    <>
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            {columns.map((col: any, index: number) => (
              <TableHead
                key={index}
                className={`font-semibold text-black ${
                  col.accessor === "data_aula" ? "max-sm:pl-20 sm:pl-28" : "hidden sm:table-cell"
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
                        {/* Delete Button */}
                        <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghostWhite"
                              size="small"
                              onClick={() => {
                                setSelectedRowIndex(rowIndex);
                                setDialogOpen(true);
                              }}
                            >
                              <X className="h-6 w-6 text-gray-400" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent className="max-sm:max-w-[300px]">
                            <AlertDialogHeader className="pb-4">
                              <AlertDialogTitle className="flex justify-center max-sm:text-sm font-medium">
                                Você Deseja Excluir Esse Plano de Aula?
                              </AlertDialogTitle>
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
                                  Continuar
                                </Button>
                              </AlertDialogAction>
                            </div>
                          </AlertDialogContent>
                        </AlertDialog>
                        <Button
                          variant="ghostWhite"
                          className="sm:hidden"
                          size="small"
                          onClick={(e) => { e.stopPropagation(); toggleRow(rowIndex); }}
                        >
                          {expandedRows.includes(rowIndex) ? (
                            <ChevronUp className="h-4 w-4 text-black" />
                          ) : (
                            <ChevronDown className="h-4 w-4 text-black" />
                          )}
                        </Button>
                      </div>
                    ) : col.accessor === "data_aula" ? (
                      <div className="flex items-center max-sm:-space-x-5">
                        <Link
                          to='/courses/$idCourse/classes/$idClass/school-matrice/subjects/$idSubject/lesson-plan/$idLessonPlan/update-lesson-plan'
                          params={{
                            idCourse: row.idCourse || "defaultIdCourse",
                            idClass: row.id_turma || "defaultIdClass",
                            idSubject: row.id_materia || "defaultIdSubject",
                            idLessonPlan: row.id_planoaula || "defaultIdLessonPlan",
                          }}
                          
                        >
                          <Button variant="ghostWhite" size="small" className="max-sm:pr-10 hover:bg-transparent focus:outline-none">
                            <Edit className="h-4 w-4 text-black" />
                          </Button>
                        </Link>
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
                      <p><strong>Início:</strong> {row.datainicio}</p>
                      <p><strong>Fim:</strong> {row.datafim}</p>
                      <p><strong>Plano de Aula:</strong> {row.detalhes}</p>
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






