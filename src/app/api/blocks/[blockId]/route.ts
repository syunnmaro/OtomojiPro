import prisma from "@/lib/prisma";
import {revalidatePath} from "next/cache";
import rateLimit from "@/lib/rateLimit";
import {getServerSession} from "next-auth/next";
import {OPTIONS} from "@/lib/authOptions";

export async function DELETE(req: Request, {params}:{params:{blockId:string}}) {
    const session = await getServerSession(OPTIONS);
    if (!session || !session.user) {
        return Response.json({message: 'Unauthorized'}, {status: 401})
    }
    const limiter = rateLimit({
        interval: 60 * 1000,
        uniqueTokenPerInterval: 500,
    })
    await limiter.check(5, session.user.id)

    const block = await prisma.block.findUnique({
        where:{
            id:params.blockId
        },
        select:{
            author_id:true
        }
    })
    if (!block){
        return Response.json({message: 'Not Found'},{status:404})
    }
    if (block.author_id !== session.user.id){
        return Response.json({error: 'Forbidden'},{status: 403})
    }
    const result = await prisma.block.delete({
        where : {
            id:params.blockId
        }
    })
    revalidatePath('/', 'layout')
    return Response.json(result)
}