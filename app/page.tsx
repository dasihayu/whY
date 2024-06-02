import { Card } from "@/components/ui/card";
import Image from "next/image";
import Banner from "../public/banner.png"
import HelloImage from "../public/dino.png"
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CreatePostCard } from "./components/CreatePostCard";
import prisma from "./lib/db";
import PostCard from "./components/PostCard";
import { Suspense } from "react";
import { SuspenseCard } from "./components/SuspenseCard";
import Pagination from "./components/Pagination";
import {unstable_noStore as noStore} from 'next/cache'

async function getData(searchParam: string) {
  noStore()
  const [count, data] = await prisma.$transaction([
    prisma.post.count(),
    prisma.post.findMany({
      take: 10,
      skip: searchParam ? (Number(searchParam) - 1) * 10 : 0 ,
      select: { 
        title: true,
        imageString: true,
        createdAt: true,
        textContent: true,
        id: true,
        Comment: {
          select: {
            id: true,
          }
        },
        User: {
          select: {
            userName: true
          }
        },
        subName: true,
        Vote: {
          select: {
            userId: true,
            voteType: true,
            postId: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
  ])

  return {data, count}
}

export default async function Home({searchParams} : {searchParams: {page: string}}) {
  
  return (
    <div className="max-w-[1000px] px-4 mx-auto flex gap-x-10 mt-4 scrollbar-none">
      <div className="w-full  xl:w-[65%] flex flex-col gap-y-5 mb-5">
        <CreatePostCard />  
        <Suspense fallback={<SuspenseCard />} key={searchParams.page}>
          <ShowItems searchParams={searchParams} />
        </Suspense>
      </div>
      <div className="xl:w-[35%] hidden xl:block">
        <Card>
          <Image src={Banner} alt="banner" />
          <div className="p-2">
            <div className="flex items-center">
              <Image src={HelloImage} alt="Hello" className="rounded-full h-24 w-16 -mt-8" />
              <h1 className="font-semibold pl-3">Home</h1>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Your Why frontpage. Come her to see your favorite communities.
            </p>
            <Separator className="my-5" />
            <div className="flex flex-col gap-y-3">
              <Button asChild variant='secondary'>
                <Link href='/w/dasihayu/create'>Create Post</Link>
              </Button>
              <Button>
                <Link href='/w/create'>Create Community</Link>
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

async function ShowItems({searchParams} : {searchParams: {page: string}}) {
  const {count, data} = await getData(searchParams.page)
  return (
    <>
      {data.map((post) => (
          <PostCard 
            key={post.id} 
            id={post.id}
            title={post.title}
            userName={post.User?.userName as string}
            subName={post.subName as string}
            imageString={post.imageString}
            jsonContent={post.textContent}
            commentCount={post.Comment.length}
            voteCount={post.Vote.reduce((acc, vote) => {
              if(vote.voteType === 'UP') return acc + 1
              if(vote.voteType === 'DOWN') return acc - 1
              return acc
            }, 0)}
          />
      ))}

      <Pagination totalPages={Math.ceil(count / 10)} />
    </>
  )
}