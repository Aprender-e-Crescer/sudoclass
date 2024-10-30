import { Button } from "@/components/ui/button"
import React from "react"
import { 
    Toast, 
    ToastTitle, 
    ToastDescription, 
    ToastClose, 
    ToastViewport
} from "@/components/ui/toast"







export function AdminRegistration(){
const [toastOpen, setToastOpen] = React.useState(false)


const handleShowToast = () => {
    setToastOpen(true)
    setTimeout(() => {
        setToastOpen(false)
    },3000)
}

    return(
        <div>
        <Button onClick={handleShowToast}>teste</Button>
        <Toast open={toastOpen} onOpenChange={setToastOpen}>
            <ToastTitle>titulo</ToastTitle>
            <ToastDescription>descriçãoooooooooooooooo</ToastDescription>
            <ToastClose />
        </Toast>



        <ToastViewport />
        </div>
    )
}
