"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import Link from "next/link";
import { updateUsername } from "../actions";
import { SubmitButtons } from "./SubmitButtons";
import { useFormState } from "react-dom";
import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

const initialState = {
    message: "",
    status: ""
};

export function SettingsForm({
    username,
}: {
    username: string | null | undefined;
}) {
    const [state,formAction] = useFormState(updateUsername, initialState)
    const {toast} = useToast()

    useEffect(() => {
        if(state?.status === "green") {
            toast ({
                title: 'Succesfull',
                description: state.message
            })
        } else if (state?.status === 'error') {
            toast({
                title: "Error",
                description: state.message,
                variant: "destructive"
            })
        }
    }, [state, toast])

    return (
        <form action={formAction}>
            <h1 className="text-3xl font-bold">Settings</h1>
            <Separator className="my-4" />
            <Label className="text-lg">Username</Label>
            <Input defaultValue={username ?? undefined} name="username" required className="mt-2" min={3} max={21} />

            <div className="full flex mt-5 gap-x-3 justify-end">
                <Button variant="secondary" asChild type="button">
                    <Link href='/'>Cancel</Link>
                </Button>
                <SubmitButtons text="Change Username" />
            </div>
        </form>
    )
}