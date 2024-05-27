"use client"

import { Textarea } from "@/components/ui/textarea"
import { SaveButton } from "./SubmitButtons"
import { updateSubwhyDesc } from "../actions"
import { useFormState } from "react-dom";
import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

interface iAppProps {
    subName: string;
    description: string | null | undefined
}

const initialState = {
    message: "",
    status: ""
}

export function SubDescForm({description, subName}: iAppProps) {
    const [state, formAction] = useFormState(updateSubwhyDesc, initialState)
    const {toast} = useToast()

    useEffect(() => {
        if(state.status === 'green') {
            toast({
                title: 'Succesfull',
                description: state.message
            })
        } else if(state.status === 'error') {
            toast({
                title: 'Error',
                description: state.message,
                variant: 'destructive'
            })
        }
    }, [state, toast])
    return (
        <form action={formAction} className="mt-3">
            <input type="hidden" name="subName" value={subName} />
            <Textarea placeholder="Create your custom description" maxLength={100} name="description" defaultValue={description ?? undefined} />
            <SaveButton />
        </form>
    )
}