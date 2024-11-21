'use client'

import * as React from 'react'
import { Upload, XCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'

interface ModalJustificationProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  hasInput: boolean
}

export default function ModalJustification({ open, onOpenChange, hasInput }: ModalJustificationProps) {
  const [files, setFiles] = React.useState<File[]>([])
  const [isDragging, setIsDragging] = React.useState(false)

  const allowedFormats = ['image/jpeg', 'image/png', 'image/gif', 'video/mp4', 'application/pdf']

  const handleFiles = (incomingFiles: FileList | File[]) => {
    const validFiles = Array.from(incomingFiles).filter((file) => allowedFormats.includes(file.type))
    setFiles((prev) => [...prev, ...validFiles])
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    handleFiles(e.dataTransfer.files)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files)
    }
  }

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex justify-between items-center">Upload</DialogTitle>
        </DialogHeader>

        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`border-2 rounded-lg p-6 flex flex-col items-center gap-2 ${
            isDragging ? 'border-blue-500 bg-blue-50' : 'border-dashed'
          }`}
        >
          <Upload className="h-10 w-10 text-blue-500" />
          <div className="text-center">
            <p>
              <label htmlFor="file-upload" className="text-blue-500 cursor-pointer underline pr-2">
                clique aqui para selecionar arquivos
              </label>
            </p>
            <input id="file-upload" type="file" onChange={handleFileChange} multiple className="hidden" />
            <p className="text-sm text-muted-foreground mt-1">Formatos suportados: JPEG, PNG, GIF, MP4, PDF</p>
          </div>
        </div>

        {hasInput ? (
          <div className="mt-4">
            <label className="text-sm font-medium">Justificativa</label>
            <Textarea placeholder="Insira sua justificativa..." className="mt-1.5" />
          </div>
        ) : null}

        <div className="mt-4 space-y-2">
          {files.map((file, index) => (
            <div key={index} className="flex items-center justify-between bg-muted p-2 rounded-md">
              <span className="text-sm truncate">{file.name}</span>
              <Button variant="ghostWhite" size="small" className="h-6 w-6" onClick={() => removeFile(index)}>
                <XCircle className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          ))}
        </div>

        <Button className="w-full mt-4 bg-blue-500 hover:bg-blue-600">ENVIAR</Button>
      </DialogContent>
    </Dialog>
  )
}
