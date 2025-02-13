'use client'

import { useState } from 'react'
import { X, Loader2, CheckIcon } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { createFileRoute } from '@tanstack/react-router'
import ModalUpload from '@/components/custom/modal-upload'
// import { useGetUserQuery } from '@/queries/use-get-user-query'
import { useCurrentUserQuery } from '@/queries/use-current-user-query'
import { GenericTable } from '@/components/custom/generic-table'
import { useGetStudentAttendance } from '@/queries/use-get-student-attendance-query'
import { SelectInput } from '@/components/custom/select-input'
import { InputLabel } from '@mui/material'
import { useGetSubjectsByStudentQuery } from '@/queries/use-get-subjects-by-student-query'

export const Route = createFileRoute('/_authenticated/frequency-portal-aluno')({
  component: FrenquencyPortalAluno,
})

function AttendanceDropdown({ onJustify }: { onJustify: () => void }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <X color="red" className="cursor-pointer" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={onJustify}>Justificar falta</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default function FrenquencyPortalAluno() {
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null)
  const [selectedAttendanceId, setSelectedAttendanceId] = useState<number | null>(null)

  const currentUser = useCurrentUserQuery()
  const { data: userData } = useGetUserQuery(currentUser?.data?.uid)

  const { data: studentAttendance, isLoading, isError } = useGetStudentAttendance(userData?.idStudent)
  const { data: subjectsData } = useGetSubjectsByStudentQuery(userData?.idStudent)

  const handleJustify = (id_chamada: number) => {
    setSelectedAttendanceId(id_chamada)
    setOpenModal(true)
  }

  const options = [
    { selectOption: 'Todas', label: 'Todas' },
    ...(subjectsData?.map((item) => ({
      selectOption: item.name,
      label: item.name,
    })) || []),
  ]

  const columns = [
    {
      header: 'Data',
      accessor: 'data',
      Cell: (row: any) => {
        const date = new Date(row.data)
        return date.toLocaleDateString('pt-BR')
      },
    },
    {
      header: 'Status',
      accessor: 'status',
      Cell: (row: any) =>
        row.status ? (
          <CheckIcon color="green" />
        ) : (
          <AttendanceDropdown onJustify={() => handleJustify(row.id_chamada)} />
        ),
    },
  ]

  const filteredAttendance =
    selectedSubject && selectedSubject !== 'Todas'
      ? studentAttendance?.filter((attendance: any) => attendance.subject === selectedSubject)
      : studentAttendance

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin h-8 w-8 text-gray-500" />
      </div>
    )
  }

  if (isError) {
    return <p className="text-red-500 text-center">Erro ao carregar os dados.</p>
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <h1 className="font-bold text-blue-950 text-4xl">Frequência</h1>

        <InputLabel id="disciplinas-select">Matérias</InputLabel>
        <SelectInput
          label="Matérias"
          optionsSelectItem={options}
          onChange={(value) => {
            setSelectedSubject(value)
          }}
        />

        <div>
          <div className="py-6 sm:px-0">
            <div className="rounded-lg border bg-white overflow-hidden">
              <div className="overflow-x-auto">
                <ModalUpload
                  open={openModal}
                  onOpenChange={setOpenModal}
                  hasInput={true}
                  id_chamada={selectedAttendanceId}
                  userId={currentUser?.data?.uid}
                />
                <GenericTable data={filteredAttendance ?? []} columns={columns} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
