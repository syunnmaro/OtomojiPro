import prisma from "@/lib/prisma";
import {ulid} from "ulid";
import {revalidateTag} from "next/cache";
import rateLimit from "@/lib/rateLimit";
import {getServerSession} from "next-auth/next";
import {OPTIONS} from "@/lib/authOptions";
import {NextResponse} from "next/server";

export async function GET() {
    const session = await getServerSession(OPTIONS);
    if (!session || !session.user) {
        return Response.json({message: 'Unauthorized'}, {status: 401})
    }
    const limiter = rateLimit({
        interval: 60 * 1000,
        uniqueTokenPerInterval: 500,
    })
    await limiter.check(5, session.user.id)
    const works = await prisma.work.findMany({
        where : {
            author_id:session.user.id
        }
    })
    return Response.json(works);
}



export async function POST(req:Request,res:NextResponse) {
    const session = await getServerSession(OPTIONS);
    if (!session || !session.user) {
        return Response.json({message: 'Unauthorized'}, {status: 401})
    }
    const limiter = rateLimit({
        interval: 60 * 1000,
        uniqueTokenPerInterval: 500,
    })
    await limiter.check(5, session.user.id)
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const date = now.getDate();
    const result = await prisma.work.create({
        data:{
            id:ulid(),
            name:"新しい作品",
            created_at:`${year}年${month}月${date}日`,
            author_id: session.user.id,
        }
    })
    revalidateTag(`/api/works`)

    return Response.json(result)
}