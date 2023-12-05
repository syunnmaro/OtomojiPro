import prisma from "@/lib/prisma";
import {ulid} from "ulid";
import {revalidatePath} from "next/cache";
import {assert, number, object, size, string} from 'superstruct'
import rateLimit from "@/lib/rateLimit";
import {getServerSession} from "next-auth/next";
import {block} from "@/../prisma/generated/zod";
import {NextRequest} from "next/server";
import {OPTIONS} from "@/lib/authOptions";


export async function GET(req: NextRequest, {params}:{params:{partId:string}}) {
    const session = await getServerSession(OPTIONS);
    if (!session || !session.user) {
        return Response.json({message: 'Unauthorized'}, {status: 401})
    }
    const limiter = rateLimit({
        interval: 60 * 1000,
        uniqueTokenPerInterval: 500,
    })
    await limiter.check(5, session.user.id)
    const userId = session.user.id;
    const blocks:block[] = await prisma.block.findMany({
        where : {
            part_id:params.partId
        }
    })
    //partIDからPartのauthor_idを取得して検証する方法もあるが、パフォーマンスの都合上以下で対応
    blocks.map((block)=> {
        if (block.author_id !== userId){
            return Response.json({error: 'Forbidden'},{status: 403})
        }
    })

    return Response.json(blocks);
}

export async function POST(req: Request, {params}: { params: { partId: string } }) {
    const session = await getServerSession(OPTIONS);
    if (!session || !session.user) {
        return Response.json({message: 'Unauthorized'}, {status: 401})
    }
    const limiter = rateLimit({
        interval: 60 * 1000,
        uniqueTokenPerInterval: 500,
    })
    await limiter.check(5, session.user.id)
    const userId = session?.user.id;
    const part = await prisma.part.findUnique({
        where:{
            id:params.partId
        },
        select:{
            author_id:true
        }
    })
    if (!part){
        return Response.json({message: 'Not Found'},{status:404})
    }
    if (part.author_id !== userId){
        return Response.json({message: 'Forbidden'},{status: 403})
    }
    const result = await prisma.block.create({
        data:{
            id:ulid(),
            speed:1,
            speaker:"ja-JP-Standard-A",
            volume:50,
            pitch:0,
            texts:"",
            part_id:params.partId,
            duration:0,
            author_id: userId,
        }
    })
    revalidatePath('/', 'layout')
    return Response.json(result)
}