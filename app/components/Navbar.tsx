import Image from "next/image";
import Link from "next/link";
import why from "../../public/why.svg";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import {RegisterLink, LoginLink} from "@kinde-oss/kinde-auth-nextjs/components";
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import { UserDropwdown } from "./UserDropdown";

export async function Navbar() {
    const {getUser} = getKindeServerSession()
    const user = await getUser()
    return (
        <nav className="h-[10vh] w-full flex items-center border-b px-5 lg:px-14 justify-between">
            <Link href='/' className="flex items-center gap-x-2">
                <Image src={why} alt="why logo" className="h-10 xl:h-16 w-fit" />
            </Link>
            <div className="flex items-center gap-x-4">
                <ThemeToggle />
                {user ? (
                    <UserDropwdown userImage={user.picture} />
                ) : (
                    <div className="flex items-center gap-x-4"  >
                        <Button variant="secondary" asChild><RegisterLink>Sign up</RegisterLink></Button>
                        <Button asChild><LoginLink>Sign in</LoginLink></Button>
                    </div>
                )}
            </div>
        </nav>
    )
}