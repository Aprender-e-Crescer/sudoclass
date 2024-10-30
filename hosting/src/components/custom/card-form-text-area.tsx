import { useState } from 'react'
import { InputTextarea } from './textarea-input'
import { Form, Formik } from 'formik'

interface CardFormTextAreaProps {
  title: string
  id: string
}

export function CardFormTextArea({ title, id }: CardFormTextAreaProps) {
  const [value, setValue] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>, setFieldValue: any) => {
    const newValue = e.target.value
    setValue(newValue)
    setFieldValue(id, newValue)
  }

  return (
    <div>
      <Formik
        initialValues={{ [id]: '' }}
        onSubmit={(values) => {
          console.log('Form submitted', values)
        }}
      >
        {({ setFieldValue }) => (
          <Form>
            <div className="border-[#0C408F] border-2 rounded-xl h-auto flex flex-col items-center px-3 py-5 justify-between max-w-[620px]">
              <div className="w-full flex justify-start">
                <p className="text-xl font-semibold mb-2">{title}</p>
              </div>
              <hr className="w-full border-[#0C408F] mb-2" />
              <div className="w-full">
                <InputTextarea id={id} name={id} label={title} onChange={(e) => handleChange(e, setFieldValue)} />
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}
