import { createFileRoute, Link } from '@tanstack/react-router'
import { Check, ClipboardListIcon, X } from 'lucide-react'
import { Else, If, Then, When } from 'react-if'
import { format } from 'date-fns'
import { useLessonPlanViewController } from '@/controllers/use-lesson-plan-view-controller'
import { Box, Button, Modal } from '@mui/material'
import { useState } from 'react'

export const Route = createFileRoute(
  '/_authenticated/courses/$idCourse/classes/$idClass/subjects/$idSubject/mural/_mural/lesson-plan/lesson-plan-view',
)({
  component: LessonPlanView,
})

export function LessonPlanView() {
  const { idCourse, idClass, idSubject } = Route.useParams()

  const {
    lessonPlanningsList,
    hasPermissionToEditLessonPlan,
    selectedDate,
    selectedIds,
    setSelectedIds,
    missings,
    handleCheckboxChange,
  } = useLessonPlanViewController(idCourse, idClass, idSubject)

  const [open, setOpen] = useState(false)
  const [modalStep, setModalStep] = useState<'default' | 'selectLessons'>('default')

  const handleOpen = () => {
    setModalStep('default')
    setOpen(true)
  }

  const handleClose = () => {
    setSelectedIds([])
    setOpen(false)
  }

  const handleMultipleClick = () => {
    setModalStep('selectLessons')
    setSelectedIds([])
  }

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    padding: 20,
    borderRadius: 6,
    p: 4,
  }

  return (
    <div className="overflow-x-auto p-4">
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="py-4 px-6 border-b w-1/12">Data</th>
            <th className="py-4 px-6 border-b w-1/12">Início</th>
            <th className="py-4 px-6 border-b w-1/12">Fim</th>
            <th className="py-4 px-6 border-b w-1/2">Plano de aula</th>
            <th className="py-4 px-6 border-b text-center">Ações</th>
          </tr>
        </thead>

        <tbody>
          {lessonPlanningsList?.map((item) => {
            const itemDate = format(new Date(item.startDate), 'dd/MM/yyyy')
            const isMissed = missings.some((missing) => missing.idLessonPlan === item.id)

            return (
              <tr key={item.id} className="border-b hover:bg-gray-100">
                <td className="py-4 px-6 border-b w-1/12">{itemDate}</td>
                <td className="py-4 px-6 border-b w-1/12">{format(new Date(item.startDate), 'HH:mm')}</td>
                <td className="py-4 px-6 border-b w-1/12">{format(new Date(item.endDate), 'HH:mm')}</td>
                <td className="py-4 px-6 border-b w-1/2 whitespace-normal break-words">
                  {item.teachingDetails.content}
                </td>
                <td className="py-4 px-6 border-b w-1/6 text-center">
                  <div className="flex justify-center items-center">
                    <If condition={hasPermissionToEditLessonPlan}>
                      <Then>
                        <If condition={item.isCallMade}>
                          <Then>
                            <button
                              disabled={true}
                              className="flex items-center gap-2 px-4 py-2 bg-gray-300 text-black font-semibold rounded-lg shadow-md hover:bg-gray-400 transition-all"
                            >
                              <ClipboardListIcon className="w-5 h-5" color="black" />
                              Chamada
                            </button>
                          </Then>
                          <Else>
                            <button
                              onClick={() => {
                                handleOpen()
                                selectedIds.push(item.id)
                              }}
                              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all"
                            >
                              <ClipboardListIcon className="w-5 h-5" />
                              Chamada
                            </button>
                          </Else>
                        </If>
                      </Then>
                      <Else>
                        <If condition={item.isCallMade}>
                          <Then>
                            <If condition={isMissed}>
                              <Then>
                                <X color="red" />
                              </Then>
                              <Else>
                                <Check color="green" />
                              </Else>
                            </If>
                          </Then>
                          <Else>
                            <p>chamada não realizada</p>
                          </Else>
                        </If>
                      </Else>
                    </If>
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>

      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          {modalStep === 'default' ? (
            <>
              <div className="mb-3">
                <h1 className="text-lg font-semibold">Tipo de chamada</h1>
                <p className="text-gray-500">Escolha o tipo de chamada que deseja realizar</p>
              </div>
              <div className="flex flex-col gap-3">
                <Link
                  to="/courses/$idCourse/classes/$idClass/subjects/$idSubject/mural/lesson-plan/$idsLessonPlan/call"
                  params={{
                    idCourse,
                    idClass,
                    idSubject,
                    idsLessonPlan: selectedIds,
                  }}
                  className="w-full"
                >
                  <Button
                    onClick={handleClose}
                    variant="contained"
                    className="w-full py-2 px-4 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
                  >
                    Chamada simples
                  </Button>
                </Link>
                <Button
                  onClick={handleMultipleClick}
                  variant="contained"
                  className="w-full py-2 px-4 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
                >
                  Chamada múltipla
                </Button>
              </div>
            </>
          ) : (
            <>
              <h1 className="text-lg font-semibold">Selecione as aulas para chamada múltipla</h1>
              <p className="text-gray-500">Escolha as aulas que compartilharão a mesma chamada</p>
              <div className="border rounded-lg p-4">
                {lessonPlanningsList?.map((item) => {
                  const itemDate = format(new Date(item.startDate), 'dd/MM/yyyy')

                  return (
                    <When condition={!item.isCallMade}>
                      <div key={item.id} className="flex flex-1">
                        <div className="px-6 text-center">
                          <input
                            type="checkbox"
                            className="w-6 h-6 accent-blue-600 cursor-pointer"
                            checked={selectedIds.includes(item.id)}
                            onChange={() => handleCheckboxChange(item.id, item.startDate)}
                            disabled={selectedDate !== null && selectedDate !== itemDate}
                          />
                        </div>
                        <div className="px-6">{format(new Date(item.startDate), 'dd/MM/yyyy')}</div>
                        <div className="px-6">
                          {format(new Date(item.startDate), 'HH:mm')} às {format(new Date(item.endDate), 'HH:mm')}
                        </div>
                      </div>
                    </When>
                  )
                })}
              </div>
              <div className="flex my-4 gap-3">
                <button
                  onClick={() => {
                    handleClose()
                  }}
                  className="p-2 font-semibold w-1/2 rounded-lg bg-gray-200 text-gray-600 hover:bg-gray-300 transition"
                >
                  Cancelar
                </button>
                <Link
                  to="/courses/$idCourse/classes/$idClass/subjects/$idSubject/mural/lesson-plan/$idsLessonPlan/call"
                  params={{
                    idCourse,
                    idClass,
                    idSubject,
                    idsLessonPlan: selectedIds,
                  }}
                  className="w-1/2"
                >
                  <button
                    onClick={handleClose}
                    disabled={selectedIds.length === 0}
                    className="w-full h-full rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
                  >
                    Realizar chamada
                  </button>
                </Link>
              </div>
            </>
          )}
        </Box>
      </Modal>
    </div>
  )
}
