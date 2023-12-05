import prisma from "@/lib/prisma";
import {revalidatePath} from "next/cache";
import rateLimit from "@/lib/rateLimit";
import {getServerSession} from "next-auth/next";
import {OPTIONS} from "@/lib/authOptions";
import {assert, object, string} from "superstruct";

export async function DELETE(req: Request, {params}:{params:{partId:string}}) {
    const session = await getServerSession(OPTIONS);
    if (!session || !session.user) {
        return Response.json({message: 'Unauthorized'}, {status: 401})
    }
    const limiter = rateLimit({
        interval: 60 * 1000,
        uniqueTokenPerInterval: 500,
    })
    await limiter.check(5, session.user.id)
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
    if (part.author_id !== session.user.id){
        return Response.json({error: 'Forbidden'},{status: 403})
    }
    const result = await prisma.part.delete({
        where : {
            id:params.partId
        }
    })
    revalidatePath('/', 'layout')
    return Response.json(result)
}
export async function PUT(req: Request, {params}:{params:{partId:string}}) {
    const session = await getServerSession(OPTIONS);
    if (!session || !session.user) {
        return Response.json({message: 'Unauthorized'}, {status: 401})
    }
    const limiter = rateLimit({
        interval: 60 * 1000,
        uniqueTokenPerInterval: 500,
    })
    await limiter.check(5, session.user.id)
    const body = await req.json()
    const requestedPart = object({
        name:string()
    })
    try {
        assert(body, requestedPart)

    }catch (error){
        return Response.json({message: 'Bad Request'},{status: 400})
    }
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
    if (part.author_id !== session.user.id){
        return Response.json({message: 'Forbidden'},{status: 403})
    }
    const result = await prisma.part.update({
        where : {
            id:params.partId
        },
        data:{
            name:body.name
        }
    })
    revalidatePath('/', 'layout')
    return Response.json(result)
}
