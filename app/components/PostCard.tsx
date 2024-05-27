import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowDown, ArrowUp, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CopyLink } from "./CopyLink";
import { handleVote } from "../actions";
import { DownVote, UpVote } from "./SubmitButtons";
import { RenderToJson } from "./RenderToJson";

interface iAppProps {
    title: string,
    jsonContent: any,
    id: string,
    subName: string,
    userName: string,
    imageString: string | null,
    voteCount: number,
    commentCount: number
}

export default function PostCard({id, title, jsonContent, subName, userName, imageString, voteCount, commentCount}: iAppProps) {
    return (
        <Card className="flex relative overflow-hidden">
            <div className="flex flex-col items-center gap-y-2 bg-muted p-2">
                <form action={handleVote}>
                    <input type="hidden" name="voteDirection" value="UP" />
                    <input type="hidden" name="postId" value={id} />
                    <UpVote />
                </form>
                {voteCount}
                <form action={handleVote}>
                    <input type="hidden" name="voteDirection" value="DOWN" />
                    <input type="hidden" name="postId" value="id" />
                    <DownVote />
                </form>
            </div>
            <div>
                <div className="flex items-center gap-x-2 p-2">
                    <Link href={`/w/${subName}`} className="font-semibold text-xs">
                        w/{subName}
                    </Link>
                    <p className="text-xs text-muted-foreground">
                    Posted by : <span className="hover:text-primary">u/{userName}</span>
                    </p>
                </div>
                <div>
                    <div className="px-2">
                        <Link href={`/post/${id}`}>
                            <h1 className="font-semibold mt-1 text-lg">
                                {title}
                            </h1>
                        </Link>
                    </div>
                    <div className="max-h-[300px] overflow-hidden">
                        {imageString ? (
                            <Image src={imageString} alt="post image" width={600} height={300} className="h-full w-full mt-2 rounded-xl p-2"/>
                        ) : (
                            <RenderToJson data={jsonContent} />
                        )}
                    </div>
                    <div className="m-3 flex items-center gap-x-3">
                        <div className="flex items-center gap-x-1">
                            <MessageCircle className="w-4 h-4 text-muted-foreground" />
                            <Link href={`/post/${id}`} className="text-muted-foreground text-xs font-medium">{commentCount} Comments</Link>
                        </div>
                        <CopyLink id={id}/>
                    </div>
                </div>
            </div>
        </Card>
    )
}