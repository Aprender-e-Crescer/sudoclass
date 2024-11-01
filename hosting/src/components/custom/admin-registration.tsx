import { Button } from "@/components/ui/button";
import React from "react";
import { 
    Toast, 
    ToastTitle, 
    ToastClose, 
    ToastViewport 
} from "@/components/ui/toast";
import { IoCheckmarkDoneSharp } from "react-icons/io5";

export function AdminRegistration() {
  const [toastOpen, setToastOpen] = React.useState(false);

  const handleShowToast = () => {
    setToastOpen(true);
    setTimeout(() => {
      setToastOpen(false);
    }, 3000);
  };

  return (
    <div>
      <div className="flex justify-center">
        <Button onClick={handleShowToast} size="large">Cadastrar</Button>
      </div>
      <Toast open={toastOpen} onOpenChange={setToastOpen} variant="success" icon={<IoCheckmarkDoneSharp/>}>
        <ToastTitle>Admin cadastrado com sucesso</ToastTitle>
        <ToastClose />
      </Toast>
      <ToastViewport />
    </div>
  );
}
