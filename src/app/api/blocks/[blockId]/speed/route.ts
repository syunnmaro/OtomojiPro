import {assert, number, object, size} from "superstruct";
import prisma from "@/lib/prisma";
import {revalidatePath} from "next/cache";
import rateLimit from "@/lib/rateLimit";
import {getServerSession} from "next-auth/next";
import {OPTIONS} from "@/lib/authOptions";

export async function PUT(req: Request, {params}:{params:{blockId:string}}) {
    const session = await getServerSession(OPTIONS);
    if (!session || !session.user) {
        return Response.json({message: 'Unauthorized'}, {status: 401})
    }
    const limiter = rateLimit({
        interval: 60 * 1000,
        uniqueTokenPerInterval: 500,
    })
    await limiter.check(5, session.user.id)
    const requestedSpeed = object({
        speed: size(number(), 0.25, 4.0),
    })
    const body = await req.json()
    try {
        assert(body, requestedSpeed)
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
        return Response.json({error: 'Forbidden'},{status: 403})
    }

    const result = await prisma.block.update({
        where : {
            id:params.blockId
        },
        data:{
            speed:body.speed
        }
    })
    revalidatePath('/', 'layout')
    return Response.json(result)
}