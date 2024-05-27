import { Card } from "@/components/ui/card";
import Image from "next/image";
import pfp from '../../public/dino.png'
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ImageDown, Link2 } from "lucide-react";

export function CreatePostCard() {
    return (
            <Card className="px-4 py-2 flex items-center gap-x-4">
                <Image src={pfp} alt="pfp" className="h-12 w-fit" />
                <Link href="/w/dasihayu/create" className="w-full">
                    <Input placeholder="What is happening today?" disabled />
                </Link>

                <div className="flex items-center gap-x-2">
                    <Button variant="outline" size="icon" asChild>
                        <Link href="/w/dasihayu/create">
                            <ImageDown className="w-4 h-4" />
                        </Link>
                    </Button>

                    <Button variant="outline" size="icon" asChild>
                        <Link href='/w/dasihayu/create'>
                            <Link2 className="w-4 h-4" />
                        </Link>
                    </Button>
                </div>
            </Card>
    )
}