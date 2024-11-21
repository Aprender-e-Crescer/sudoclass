'use client'

import { useState } from 'react'
import { Check, FileText, X, MoreHorizontal } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { createFileRoute } from '@tanstack/react-router'
import ModalJustification from '@/components/custom/modal-justification'
import { boolean } from 'zod'

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
      attendance: ['present', null, null, null, null],
      average: 82,
    },
    {
      id: '2',
      initial: 'M',
      name: 'Marvin McKinney',
      attendance: ['absent', null, null, null, null],
      average: 95,
    },
    {
      id: '3',
      initial: 'J',
      name: 'Jerome Bell',
      attendance: ['justified', null, null, null, null],
      average: 30,
    },
    {
      id: '4',
      initial: 'K',
      name: 'Kathryn Murphy',
      attendance: [null, null, null, null, null],
      average: 62,
    },
    {
      id: '5',
      initial: 'J',
      name: 'Jacob Jones',
      attendance: [null, null, null, null, null],
      average: 75,
    },
    {
      id: '6',
      initial: 'K',
      name: 'Kristin Watson',
      attendance: [null, null, null, null, null],
      average: 69,
    },
    {
      id: '7',
      initial: 'K',
      name: 'Kristin Watson',
      attendance: [null, null, null, null, null],
      average: 84,
    },
    {
      id: '8',
      initial: 'K',
      name: 'Kristin Watson',
      attendance: [null, null, null, null, null],
      average: 46,
    },
    {
      id: '9',
      initial: 'K',
      name: 'Kristin Watson',
      attendance: [null, null, null, null, null],
      average: 91,
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

  const handleJustify = (studentId: string, attendanceIndex: number) => {
    setOpenModal(true)
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="rounded-lg border bg-white overflow-hidden">
              <div className="overflow-x-auto">
                <ModalJustification open={openModal} onOpenChange={setOpenModal} hasInput={true} />
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
                              {status === 'absent' && (
                                <AttendanceDropdown onJustify={() => handleJustify(student.id, i)} />
                              )}
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
