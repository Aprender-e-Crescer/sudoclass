import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { ChartArea, CheckCircle2Icon, Plus, Send, Star, Text, Trash } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTitle, TextField, Checkbox, InputLabel } from '@mui/material'
import { CardFormStars } from '@/components/custom/card-form-stars'
import { QuestionForm } from '@/components/custom/question-form'
import { CardFormTextArea } from '@/components/custom/card-form-text-area'

export const Route = createFileRoute('/new-form')({
  component: () => NewForm(),
})

export function NewForm() {
  const [selectedType, setSelectedType] = useState('multiple-choice')
  const [openDialogTittle, setOpenDialogTittle] = useState(false)
  const [openDialogQuestion, setOpenDialogQuestion] = useState(false)
  const [titleForm, setTitleForm] = useState('Novo Formulario')
  const [descriptionForm, setDescriptionForm] = useState('')
  const [questions, setQuestions] = useState([])
  const [newQuestion, setNewQuestion] = useState({
    title: '',
    type: 'multiple-choice',
    options: [''],
    required: false,
  })

  const handleAddOption = () => {
    setNewQuestion((prev) => ({
      ...prev,
      options: [...prev.options, ''],
    }))
  }

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...newQuestion.options]
    updatedOptions[index] = value
    setNewQuestion((prev) => ({
      ...prev,
      options: updatedOptions,
    }))
  }

  const handleRemoveOption = (index) => {
    const updatedOptions = newQuestion.options.filter((_, i) => i !== index)
    setNewQuestion((prev) => ({
      ...prev,
      options: updatedOptions,
    }))
  }

  const handleSaveQuestion = () => {
    setQuestions([...questions, newQuestion])
    setOpenDialogQuestion(false)
    setNewQuestion({
      title: '',
      type: 'multiple-choice',
      options: [''],
      required: false,
    })
  }

  const handleTitleChange = (e) => {
    setTitleForm(e.target.value)
  }

  const handleDescriptionChange = (e) => {
    setDescriptionForm(e.target.value)
  }

  const saveTitle = () => {
    setOpenDialogTittle(false)
  }

  return (
    <div className="flex flex-col items-center w-full min-h-screen p-6 bg-gray-100">
      <div className="flex items-center justify-between w-full max-w-3xl p-4">
        <h1 className="text-2xl font-semibold">Novo formulário</h1>
        <div className="flex gap-4">
          <Button variant="ghostBlack" icon={<Send />}>
            Enviar
          </Button>
          <Button variant="ghostBlack" icon={<ChartArea />}>
            Respostas
          </Button>
        </div>
      </div>
      <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-md border-t-4 border-blue-600">
        <button onClick={() => setOpenDialogTittle(true)} className="text-2xl font-bold mb-4">
          {titleForm}
        </button>
        <Dialog open={openDialogTittle} onClose={() => setOpenDialogTittle(false)}>
          <DialogContent>
            <div className="mb-5">
              <InputLabel>Título do Formulario</InputLabel>
              <TextField
                value={titleForm}
                onChange={handleTitleChange}
                name="title"
                placeholder="Título do Formulario"
                id="title"
              />

              <InputLabel>Descrição</InputLabel>
              <TextField
                value={descriptionForm}
                onChange={handleDescriptionChange}
                name="descriptionForm"
                placeholder="Descrição do Formulario"
                id="descriptionForm"
              />
            </div>
            <Button onClick={saveTitle} variant="blueButton" color="primary" className="mt-4">
              Salvar
            </Button>
          </DialogContent>
        </Dialog>

        <div className="flex flex-col gap-4 justify-center w-full">
          {questions.map((question, index) => (
            <div key={index}>
              {question.type === 'multiple-choice' && (
                <div>
                  <QuestionForm question={question.title} options={question.options} radioId={`question-${index}`} />
                </div>
              )}
              {question.type === 'text' && (
                <div>
                  <CardFormTextArea title={question.title} id="Text" key="Text" />
                </div>
              )}
              {question.type === 'rating' && (
                <div>
                  <CardFormStars title={question.title} />
                </div>
              )}
            </div>
          ))}
        </div>

        <button onClick={() => setOpenDialogQuestion(true)} className="flex items-center gap-2 text-blue-500 mt-4">
          <Plus />
          Nova pergunta
        </button>

        <Dialog open={openDialogQuestion} onClose={() => setOpenDialogQuestion(false)}>
          <DialogTitle>Nova Pergunta</DialogTitle>
          <DialogContent>
            <div className="flex gap-2 mb-4">
              <button
                className={`flex items-center gap-2 border p-2 rounded ${selectedType === 'multiple-choice' ? 'border-blue-600' : 'border-gray-300'}`}
                onClick={() => {
                  setSelectedType('multiple-choice')
                  setNewQuestion({ ...newQuestion, type: 'multiple-choice' })
                }}
              >
                <CheckCircle2Icon />
                Opção
              </button>
              <button
                className={`flex items-center gap-2 border p-2 rounded ${selectedType === 'rating' ? 'border-blue-600' : 'border-gray-300'}`}
                onClick={() => {
                  setSelectedType('rating')
                  setNewQuestion({ ...newQuestion, type: 'rating' })
                }}
              >
                <Star />
                Classificação
              </button>
              <button
                className={`flex items-center gap-2 border p-2 rounded ${selectedType === 'text' ? 'border-blue-600' : 'border-gray-300'}`}
                onClick={() => {
                  setSelectedType('text')
                  setNewQuestion({ ...newQuestion, type: 'text' })
                }}
              >
                <Text />
                Texto
              </button>
            </div>
            <div className="mb-5">
              <TextField
                onChange={(e) => setNewQuestion({ ...newQuestion, title: e.target.value })}
                name="title"
                placeholder="Título da pergunta"
                id="title"
              />
            </div>
            {newQuestion.type === 'multiple-choice' && (
              <>
                {newQuestion.options.map((option, index) => (
                  <div key={index} className="flex items-center gap-2 mb-2">
                    <TextField
                      value={option}
                      onChange={(e) => handleOptionChange(index, e.target.value)}
                      label={`Opção ${index + 1}`}
                    />
                    <Button variant="ghostBlack" onClick={() => handleRemoveOption(index)}>
                      <Trash />
                    </Button>
                  </div>
                ))}
                <Button onClick={handleAddOption} className="mb-4">
                  Adicionar Opção
                </Button>
              </>
            )}
            <div className="flex items-center gap-2">
              <Checkbox
                checked={newQuestion.required}
                onChange={(e) => setNewQuestion({ ...newQuestion, required: e.target.checked })}
              />
              <span>Obrigatória</span>
            </div>
            <Button onClick={handleSaveQuestion} variant="blueButton" color="primary" className="mt-4">
              Salvar Pergunta
            </Button>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
