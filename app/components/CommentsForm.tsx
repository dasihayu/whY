"use client"

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SubmitButtons } from "./SubmitButtons";
import { CreateComment } from "../actions";
import { useRef } from "react";

interface iAppProps {
    postId: string
}

export function CommentsForm({postId}: iAppProps) {
    const ref = useRef<HTMLFormElement>(null)
    return (
        <div>
            <form action={async (formData) => {
                await CreateComment(formData);
                ref.current?.reset()
            }} className="mt-5" ref={ref}>
                <input type="hidden" name="postId" value={postId} />
                <Label>
                    Comment right here
                </Label>
                <Textarea placeholder="What do you think?" className="w-full mt-1 mb-2" name="comment" />
                <SubmitButtons text="Post" />
            </form>
        </div>
    )
}