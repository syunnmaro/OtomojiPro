import rateLimit from "@/lib/rateLimit";
import {getServerSession} from "next-auth/next";
import {OPTIONS} from "@/lib/authOptions";
import prisma from "@/lib/prisma";
import {assert, number, object} from "superstruct";
import {revalidatePath} from "next/cache";

export async function PUT(req: Request, {params}:{params:{blockId:string}}) {
    const limiter = rateLimit({
        interval: 60 * 1000,
        uniqueTokenPerInterval: 500,
    })
    await limiter.check( 10, 'CACHE_TOKEN')

    const session = await getServerSession(OPTIONS);
    if (!session || !session.user) {
        return Response.json({message: 'Unauthorized'},{status: 401})
    }
    const requestedDuration = object({
        duration: number(),

    })
    const body = await req.json()
    try {
        assert(body, requestedDuration)
    }catch (error){
        return Response.json({message: 'Bad Request'},{status: 400})
    }
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
        return Response.json({message: 'Forbidden'},{status: 403})
    }
    console.log(body.duration)
    const result = await prisma.block.update({
        where : {
            id:params.blockId
        },
        data:{
            duration:body.duration
        }
    })
    revalidatePath("/", 'layout')
    return Response.json(result)
}