'use client'

import { useState } from 'react'
import { Check, FileText, X, MoreHorizontal } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { createFileRoute } from '@tanstack/react-router'
import ModalUpload from '@/components/custom/modal-upload'

export const Route = createFileRoute('/_authenticated/frequency-portal-aluno')({
  component: FrenquencyPortalAluno,
})

interface Student {
  id: string
  initial: string
  name: string
  attendance: Array<'present' | 'absent' | 'justified' | null>
  average: number
}

type AttendanceStatus = 'present' | 'absent' | 'justified' | null

function AttendanceDropdown({ onJustify }: { onJustify: () => void }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghostBlack" className="h-8 w-8 p-0">
          <span className="sr-only">Abrir menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={onJustify}>Justificar falta</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default function FrenquencyPortalAluno() {
  const [openModal, setOpenModal] = useState<boolean>(false)

  const [students, setStudents] = useState<Student[]>([
    {
      id: '1',
      initial: 'R',
      name: 'Ronald Richards',
      attendance: ['absent', 'justified', 'absent', 'present', 'present'],
      average: 82,
    },
  ])

  const getInitialColor = (initial: string) => {
    const colors: Record<string, string> = {
      R: 'bg-red-500',
      M: 'bg-orange-500',
      J: 'bg-blue-500',
      K: 'bg-yellow-500',
    }
    return colors[initial] || 'bg-gray-500'
  }

  const getAttendanceIcon = (status: AttendanceStatus) => {
    switch (status) {
      case 'present':
        return <Check className="h-5 w-5 text-green-500" />
      case 'absent':
        return <X className="h-5 w-5 text-red-500" />
      case 'justified':
        return <FileText className="h-5 w-5 text-gray-400" />
      default:
        return null
    }
  }

  const handleJustify = () => {
    setOpenModal(true)
  }

  return (
    <div className="min-h-screen flex flex-col ">
      <main className="flex-grow">
        <h1 className="font-bold text-blue-950 text-4xl">Frequencia</h1>
        <div>
          <div className="py-6 sm:px-0">
            <div className="rounded-lg border bg-white overflow-hidden">
              <div className="overflow-x-auto">
                <ModalUpload open={openModal} onOpenChange={setOpenModal} hasInput={true} />
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[250px]">Nome</TableHead>
                      {Array(5)
                        .fill(0)
                        .map((_, i) => (
                          <TableHead key={i} className="text-center">
                            20/07
                          </TableHead>
                        ))}
                      <TableHead className="text-center">Ver mais...</TableHead>
                      <TableHead className="text-center w-[200px]">
                        <div className="text-center">
                          Média geral de
                          <br />
                          frequência em AOO
                        </div>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {students.map((student, index) => (
                      <TableRow key={student.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div
                              className={`${getInitialColor(
                                student.initial,
                              )} w-8 h-8 rounded-full flex items-center justify-center text-white font-medium`}
                            >
                              {student.initial}
                            </div>
                            {student.name}
                          </div>
                        </TableCell>
                        {student.attendance.map((status, i) => (
                          <TableCell key={i} className="text-center">
                            <div className="flex justify-center items-center">
                              {getAttendanceIcon(status)}
                              {status === 'absent' && <AttendanceDropdown onJustify={() => handleJustify()} />}
                            </div>
                          </TableCell>
                        ))}
                        <TableCell />
                        <TableCell>
                          <div className={`text-center py-1 rounded ${index % 2 === 0 ? 'bg-blue-100' : 'bg-red-100'}`}>
                            {student.average}%
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
