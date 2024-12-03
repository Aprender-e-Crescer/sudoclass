import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { useCreateJustificationMutation } from '@/mutations/use-create-justifications-mutation'
import { Upload } from 'lucide-react'

interface ModalUploadProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  hasInput: boolean
  id_chamada: number | null
  userId: string | undefined
}

export default function ModalUpload({ open, onOpenChange, hasInput, id_chamada, userId }: ModalUploadProps) {
  const [justificativa, setJustificativa] = React.useState('')
  const [imageFiles, setImageFiles] = React.useState<File[]>([])

  const { mutate, isSuccess } = useCreateJustificationMutation(userId)

  const handleOnAddJustificationImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files)
      setImageFiles((prevFiles) => [...prevFiles, ...filesArray])
    }
  }

  const handleSubmit = () => {
    if (imageFiles.length > 0) {
      imageFiles.forEach((image) => {
        mutate({ id_chamada, justificativa, image })
      })
    } else {
      console.log('Nenhum arquivo selecionado')
    }
  }

  React.useEffect(() => {
    if (isSuccess) {
      setJustificativa('')
      setImageFiles([])
      onOpenChange(false)
    }
  }, [isSuccess, onOpenChange])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex justify-between items-center">Upload</DialogTitle>
        </DialogHeader>

        <div className={`border-2 rounded-lg p-6 flex flex-col items-center gap-2`}>
          <Upload className="h-10 w-10 text-blue-500" />
          <div className="text-center">
            <p>
              <label htmlFor="fileInput" className="text-blue-500 cursor-pointer underline pr-2">
                Clique aqui para selecionar arquivos
              </label>
            </p>
            <input
              type="file"
              id="fileInput"
              accept="image/*"
              onChange={handleOnAddJustificationImageChange}
              style={{ display: 'none' }}
              multiple
            />
            <p className="text-sm text-muted-foreground mt-1">Formatos suportados: JPEG, PNG, GIF, MP4, PDF</p>
          </div>
        </div>

        {imageFiles.length > 0 && (
          <div className="mt-4">
            <h3 className="font-medium">Arquivos selecionados:</h3>
            <ul className="list-disc pl-5 mt-2">
              {imageFiles.map((file, index) => (
                <li key={index} className="text-sm">
                  {file.name}
                </li>
              ))}
            </ul>
          </div>
        )}

        {hasInput ? (
          <div className="mt-4">
            <label className="text-sm font-medium">Justificativa</label>
            <Textarea
              placeholder="Insira sua justificativa..."
              value={justificativa}
              onChange={(e) => setJustificativa(e.target.value)}
              className="mt-1.5"
            />
          </div>
        ) : null}

        <Button className="w-full mt-4 bg-blue-500 hover:bg-blue-600" onClick={handleSubmit}>
          ENVIAR
        </Button>
      </DialogContent>
    </Dialog>
  )
}
