import { createFileRoute } from "@tanstack/react-router"
import { useQuery } from '@tanstack/react-query'
import { collection, getDocs } from "firebase/firestore"; 
import { firestore } from "@/services/firebase";
import { useState } from "react";

export const Route = createFileRoute('/password-changes')({
    component: ChangedPasswordRequests,
}) 
export function ChangedPasswordRequests(){
    const result = useQuery({
        queryKey: ['changed-password-requests'],
         queryFn: async() => {
        const PasswordRequestsRef = collection(firestore, "studentPasswordChangeRequests");
        const docSnap = await getDocs(PasswordRequestsRef); 

        return docSnap.docs.map((doc) => doc.data())
    }}) 

    console.log(result.data)

    return(
        <>
            <h1>olaadfasfas</h1>
        </>
    )}