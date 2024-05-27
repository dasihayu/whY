/* eslint-disable @next/next/no-img-element */
import { handleVote } from "@/app/actions"
import { CommentsForm } from "@/app/components/CommentsForm"
import { CopyLink } from "@/app/components/CopyLink"
import { RenderToJson } from "@/app/components/RenderToJson"
import { DownVote, UpVote } from "@/app/components/SubmitButtons"
import prisma from "@/app/lib/db"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Cake, MessageCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import {unstable_noStore as noStore} from 'next/cache'

async function getData(id: string) {
    noStore()
    const data = await prisma.post.findUnique({
        where: {
            id: id,
        },
        select: {
            createdAt: true,
            title: true,
            imageString: true,
            textContent: true,
            id: true,
            User: {
                select: {
                    userName: true
                }
            },
            subName: true,
            Subwhy: {
                select: {
                    name: true,
                    createdAt: true,
                    description: true,
                }
            },
            Comment: {
                orderBy: {
                    createdAt: "desc"
                },
                select: {
                    id: true,
                    text: true,
                    User: {
                        select:{
                            userName: true,
                            imageUrl: true
                        }
                    }
                }
            },
            Vote: {
                select: {
                    userId: true,
                    voteType: true,
                    postId: true,
                }
            }
        }
    })

    if(!data) {
        return notFound()
    }
    return data
}

export default async function PostPage({params}: {params: {id: string}}) {
    const data = await getData(params.id)
    return (
        <div className="max-w-[1200px] px-4 mx-auto flex flex-col xl:flex-row gap-x-10 mt-4 mb-10">
            <Card className="xl:hidden mb-4">
                <div className="p-4">
                    <div className="flex items-center gap-x-3">
                        <Image src={`https://avatar.vercel.sh/${data?.subName}`} width={60} height={60} alt="Subwhy" className="rounded-full h-16 w-16" />
                        <Link href={`/w/${data?.subName}`} className="font-medium"><span className="text-primary">w/</span>{data?.subName}</Link>
                    </div>
                        <Separator className="my-5" />
                        <Button asChild className="w-full" variant="secondary">
                            <Link href={`/w/${data?.subName}/create`}>Create post</Link>
                        </Button>
                    </div>
                </Card>
            <div className="w-full xl:w-[70%] flex flex-col gap-y-5">
                <Card className="p-2 flex">
                    <div className="flex flex-col items-center gap-y-2 p-2">
                        <form action={handleVote}>
                            <input type="hidden" name="voteDirection" value="UP" />
                            <input type="hidden" name="postId" value={data.id} />
                            <UpVote />
                        </form>
                        {data.Vote.reduce((acc, vote) => {
                            if(vote.voteType === 'UP') return acc + 1
                            if(vote.voteType === 'DOWN') return acc - 1
                            return acc
                        }, 0)}
                        <form action={handleVote}>
                            <input type="hidden" name="voteDirection" value="DOWN" />
                            <input type="hidden" name="postId" value={data.id} />
                            <DownVote />
                        </form>
                    </div>
                    <div className="p-2 w-full">
                        <p className="text-xs text-muted-foreground">Posted by u/{data.User?.userName}</p>
                        <h1 className="font-semibold mt-1 text-lg">{data.title}</h1>
                        {data.textContent && (
                            <RenderToJson data={data.textContent} />
                        )}
                        {data.imageString && (
                            <Image src={data.imageString} alt="user image" width={500} height={400} className="w-full h-auto object-contain mt-2 rounded-xl" />
                        )}
                        <div className="flex gap-x-3 items-center m-3">
                            <div className="flex items-center gap-x-1">
                                <MessageCircle className="w-4 h-4 text-muted-foreground" />
                                <p className="text-muted-foreground text-xs font-medium">{data.Comment.length} Comments</p>
                            </div>
                            <CopyLink id={params.id}/>
                        </div>
                        <CommentsForm postId={params.id} />
                        <Separator className="my-5" />
                            <div className="flex flex-col gap-y-3">
                                {data.Comment.map((item) => (
                                    <Card key={item.id}>
                                        <div className="flex flex-col p-2">
                                            <div className="flex items-center gap-x-3">
                                                <img 
                                                    src={
                                                        item.User?.imageUrl
                                                        ? item.User?.imageUrl
                                                        : "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
                                                    }
                                                    className="w-7 h-7 rounded-full"
                                                    alt="user image"
                                                />
                                                <h3 className="text-sm font-semibold">{item.User?.userName}</h3>
                                            </div>
                                            <p className="ml-10 text-secondary-foreground text-sm tracking-wide">{item.text}</p>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                    </div>
                </Card>
            </div>
            <div className="hidden xl:block xl:w-[30%]">
                <Card>
                    <div className="bg-muted p-4 font-semibold">
                        About Community
                    </div>
                    <div className="p-4">
                        <div className="flex items-center gap-x-3">
                            <Image src={`https://avatar.vercel.sh/${data?.subName}`} width={60} height={60} alt="Subwhy" className="rounded-full h-16 w-16" />
                            <Link href={`/w/${data?.subName}`} className="font-medium"><span className="text-primary">w/</span>{data?.subName}</Link>
                        </div>
                            <p className="text-sm font-normal text-secondary-foreground mt-2">{data?.Subwhy?.description}</p>
                        <div className="flex items-center gap-x-2 mt-2">
                            <Cake className="h-5 w-5 text-muted-foreground" />
                            <p className="text-muted-foreground font-medium text-sm">
                                {new Date(data?.createdAt as Date).toLocaleDateString('en-us', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                            })}</p>
                        </div>
                        <Separator className="my-5" />
                        <Button asChild className="w-full" variant="secondary">
                            <Link href={`/w/${data?.subName}/create`}>Create post</Link>
                        </Button>
                    </div>
                </Card>
            </div>
        </div>
    )
}