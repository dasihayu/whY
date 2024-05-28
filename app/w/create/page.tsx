"use client"
import { createCommunity } from "@/app/actions";
import { SubmitButtons } from "@/app/components/SubmitButtons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import { useEffect } from "react";
import { useFormState } from "react-dom";

const initialState = {
    message: "",
    status: ""
}

export default function Subwhy() {
    const [state, formAction] = useFormState(createCommunity, initialState)
    const {toast} = useToast()
    useEffect(() => {
        if(state.status === 'error') {
            toast({
                title: "Error",
                description: state.message,
                variant: "destructive"
            })
        }
    }, [state, toast])
    return (
        <div className="max-w-[1000px] px-4 mx-auto flex flex-col mt-4">
            <form action={formAction}>
                <h1 className="text-3xl font-bold">Create Community</h1>
                <Separator className="my-4" />
                <Label className="text-lg">Name</Label>
                <p className="text-muted-foreground">Community names cannot be changes</p>
                <div className="relative mt-3">
                    <p className="absolute left-0 w-8 flex items-center justify-center h-full text-muted-foreground">
                        r/
                    </p>
                    <Input type="text" name="name" id="" required className="pl-6" minLength={6} maxLength={21} />
                </div>
                <div className="w-full flex mt-5 gap-x-3 justify-end">
                    <Button variant="secondary" asChild type="button">
                        <Link href='/'>Cancel</Link>
                    </Button>
                    <SubmitButtons text="Create" />
                </div>
            </form>
        </div>
    )
}