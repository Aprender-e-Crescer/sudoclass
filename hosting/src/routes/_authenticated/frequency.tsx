import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/frequency')({
  component: Frenquency,
})

export function Frenquency() {
  const students: Student[] = [
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
  ]

  const getInitialColor = (initial: string) => {
    const colors: Record<string, string> = {
      R: 'bg-red-500',
      M: 'bg-orange-500',
      J: 'bg-blue-500',
      K: 'bg-yellow-500',
    }
    return colors[initial] || 'bg-gray-500'
  }

  const getAttendanceIcon = (
    status: 'present' | 'absent' | 'justified' | null,
  ) => {
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
  return (
    <>
      <div className="rounded-lg border bg-white">
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
                    <div className="flex justify-center">
                      {getAttendanceIcon(status)}
                    </div>
                  </TableCell>
                ))}
                <TableCell />
                <TableCell>
                  <div
                    className={`text-center py-1 rounded ${
                      index % 2 === 0 ? 'bg-blue-100' : 'bg-red-100'
                    }`}
                  >
                    {student.average}%
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  )
}
import { Check, FileText, X } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

interface Student {
  id: string
  initial: string
  name: string
  attendance: Array<'present' | 'absent' | 'justified' | null>
  average: number
}
