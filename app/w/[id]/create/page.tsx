"use client"

import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import pfp from '../../../../public/profile.png'
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Film, Text } from "lucide-react";
import { Input } from "@/components/ui/input";
import TipTapEditor from "@/app/components/TipTabEditor";
import { SubmitButtons } from "@/app/components/SubmitButtons";
import { UploadDropzone } from "@/app/components/Uploadthing";
import { useState } from "react";
import { createPost } from "@/app/actions";
import { JSONContent } from "@tiptap/react";

const rules = [
    {
        id: 1,
        text: "No NSFW content",
    },
    {
        id: 2,
        text: "No Spam",
    },
    {
        id: 3,
        text: "No politics",
    },
    {
        id: 4,
        text: "No hate speech",
    },
    {
        id: 5,
        text: "No offensive language",
    }
]

export default function CreatePostRoute({params}: {params: {id: string}}) {
    const [imageUrl, setImageUrl] = useState<null | string>(null)
    const [json, setJson] = useState<null | JSONContent>(null)
    const [title, setTitle] = useState<null | string>(null)
    const createPostWhy = createPost.bind(null,{jsonContent: json})
    return(
        <div className="max-w-[1000px] px-4 mx-auto flex gap-x-10 mt-4">
            <div className="w-full xl:w-[65%] flex flex-col gap-y-5">
                <h1 className="font-semibold text-primary"><Link href={`/w/${params.id}`}>w/{params.id}</Link></h1>
                <Tabs defaultValue="post" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="post">
                            <Text className="h-4 w-4 mr-2" />
                            Post
                        </TabsTrigger>
                        <TabsTrigger value="image">
                            <Film className="h-4 w-4 mr-2" />
                            Image & Video
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="post">
                        <Card>
                            <form action={createPostWhy}>
                                <input type="hidden" name="imageUrl" value={imageUrl ?? undefined} />
                                <input type="hidden" name="subName" value={params.id} />
                                <CardHeader>
                                    <Input required name="title" placeholder="Title" value={title ?? ""} onChange={(e) => setTitle(e.target.value)} />
                                    <TipTapEditor setJson={setJson} json={json} />
                                </CardHeader>
                                <CardFooter>
                                    <SubmitButtons text="Create Post" />
                                </CardFooter>
                            </form>
                        </Card>
                    </TabsContent>
                    <TabsContent value="image">
                        <Card>
                            <CardHeader>
                                {imageUrl === null ? (
                                    <UploadDropzone endpoint="imageUploader" 
                                        onClientUploadComplete={(res) =>{
                                            setImageUrl(res[0].url)
                                        }}
                                        onUploadError={(error: Error) => {
                                            alert('Ukuran file terlalu besar')
                                        }}
                                        className="ut-button:bg-primary ut-button:ut-readying:bg-primary/50 yt-label:text-primary ut-button:ut-uploading:bg-primary/50 ut-utton:ut-uploading:afeter:bg-primary"
                                    />
                                ): (
                                    <Image src={imageUrl} alt="uploaded image" width={500} height={400} className="h-80 rounded-lg w-full object-contain" />
                                )}
                            </CardHeader>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
            <div className="xl:w-[35%] xl:block hidden">
                <Card className="flex flex-col p-4">
                    <div className="flex items-center gap-x-3">
                        <Image src={pfp} alt="profile" className="w-10 h-10" />
                        <h1 className="font-semibold">Post to Why</h1>
                    </div>
                    <Separator className="mt-2" />
                    <div className="flex flex-col gap-y-5 mt-5">
                        {rules.map((item) => (
                            <div key={item.id}>
                                <p className="text-sm font-medium">
                                    {item.id}. {item.text}
                                </p>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    )
}