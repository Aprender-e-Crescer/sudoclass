'use client'

import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { useStudentsListQuery } from '@/queries/use-students-list-query'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Link } from '@tanstack/react-router'
import { Check, X, FileText } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export const Route = createFileRoute('/_authenticated/frequency')({
  component: StudentsListing,
})

export function StudentsListing() {
  const [students, setStudents] = useState<any[]>([])
  const { data: studentsList, isLoading, isError } = useStudentsListQuery()

  useEffect(() => {
    if (studentsList && Array.isArray(studentsList)) {
      setStudents(studentsList)
    }
  }, [studentsList])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="animate-spin text-gray-500">Carregando...</span>
      </div>
    )
  }

  if (isError) {
    return <p className="text-red-500 text-center">Erro ao carregar os dados.</p>
  }

  // Mock dates for the attendance columns
  const dates = Array(5).fill("20/07")

  return (
    <div className="flex flex-col flex-1 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Estudantes</h1>
        <Link to="/register/students" search={{ action: 'create' }}>
          <Button variant="blueButton" size="small">
            Cadastrar novo estudante
          </Button>
        </Link>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              {dates.map((date, index) => (
                <TableHead key={index}>{date}</TableHead>
              ))}
              <TableHead>Ver mais...</TableHead>
              <TableHead className="text-right">Média geral de frequência em AQO</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.map((student) => {
              // Generate random attendance status for demo
              const attendanceStatus = Array(5).fill(null).map(() => 
                Math.random() > 0.5 ? 'present' : Math.random() > 0.5 ? 'absent' : 'document'
              )
              const averageAttendance = Math.floor(Math.random() * 100)
              
              return (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={student.avatar} />
                        <AvatarFallback>
                          {(student.name || student.nome || "").charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <span>{student.name || student.nome || 'Nome não disponível'}</span>
                    </div>
                  </TableCell>
                  {attendanceStatus.map((status, index) => (
                    <TableCell key={index}>
                      {status === 'present' ? (
                        <Check className="text-green-500 h-5 w-5" />
                      ) : status === 'absent' ? (
                        <X className="text-red-500 h-5 w-5" />
                      ) : (
                        <FileText className="text-gray-500 h-5 w-5" />
                      )}
                    </TableCell>
                  ))}
                  <TableCell className="text-right">
                    <div 
                      className={`inline-block px-3 py-1 rounded-full text-sm ${
                        averageAttendance >= 70 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {averageAttendance}%
                    </div>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}