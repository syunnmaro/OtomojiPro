import prisma from "@/lib/prisma";
import {revalidatePath} from "next/cache";
import {assert, number, object, size} from "superstruct";
import rateLimit from "@/lib/rateLimit";
import {getServerSession} from "next-auth/next";
import {OPTIONS} from "@/lib/authOptions";

export async function PUT(req: Request, {params}:{params:{blockId:string}}) {
    const limiter = rateLimit({
        interval: 60 * 1000, // 60 seconds
        uniqueTokenPerInterval: 500, // Max 500 users per second
    })
    await limiter.check( 10, 'CACHE_TOKEN') // 10 requests per minute
    const session = await getServerSession(OPTIONS);
    if (!session || !session.user) {
        return Response.json({message: 'Unauthorized'},{status: 401})
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
    const requestedPitch = object({
        pitch: size(number(), -20, 20),

    })
    const body = await req.json()
    assert(body, requestedPitch)
    const result = await prisma.block.update({
        where : {
            id:params.blockId
        },
        data:{
            pitch:body.pitch
        }
    })
    revalidatePath("/", 'layout')
    return Response.json(result)
}