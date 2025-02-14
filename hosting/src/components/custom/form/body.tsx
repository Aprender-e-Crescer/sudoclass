import { Button } from '@/components/ui/button'
import { Link } from '@tanstack/react-router'
import { Form, useFormikContext } from 'formik'
import { Loader2 } from 'lucide-react'
import { PropsWithChildren } from 'react'

interface Props {
    cancelTo: string
    action: 'create' | 'edit'
    title: string
}

export function FormBody({ cancelTo, action, title, children }: PropsWithChildren<Props>) {
    const { isSubmitting, isValid, touched } = useFormikContext()

    const isSomeFieldTouched = Object.values(touched).some(value => value === true)
    const isDisabled = isSubmitting || !isValid && isSomeFieldTouched

    return (
        <Form className='flex flex-col p-5 gap-8'>
            <div className="flex flex-col border border-gray-300 p-4 rounded-lg gap-2">
                <h3 className="text-lg">{title}</h3>
                {children}
            </div>
            <div className="flex flex-1 gap-x-3 justify-center">
                <Link to={cancelTo}>
                    <Button variant="outline" className="px-[72px] sm:px-[108px]" type="button">Cancelar</Button>
                </Link>
                <button className="pl-4 pr-10 sm:pl-12 sm:pr-20 flex gap-1 items-center rounded bg-blue-500 hover:bg-blue-600 active:bg-blue-700 disabled:bg-gray-400 text-sm font-bold text-white" type='submit' disabled={isDisabled}>
                    <Loader2 className='invisible data-[is-submitting=true]:visible w-6 h-6 animate-spin text-gray-200' data-is-submitting={isSubmitting} />
                    {action === 'create' ? 'Cadastrar' : 'Atualizar'}
                </button>
            </div>
        </Form>
    )
}