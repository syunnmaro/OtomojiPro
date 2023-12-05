import {NextApiRequest, NextApiResponse} from "next";
import prisma from "@/lib/prisma";
import {revalidatePath} from "next/cache";
import rateLimit from "@/lib/rateLimit";
import {getServerSession} from "next-auth/next";
import {OPTIONS} from "@/lib/authOptions";
import {NextRequest} from "next/server";
import {assert, object, string} from "superstruct";

export async function GET(req: NextRequest, {params}:{params:{workId:string}}) {
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
    const work  = await prisma.work.findUnique({
        where : {
            id:params.workId
        }
    })
    if (!work){
        return Response.json({message: 'Not Found'},{status:404})
    }
    if (work.author_id !== userId) {
        return Response.json({message: 'Forbidden'},{status:403})
    }
    return Response.json(work);
}

export async function DELETE(req: Request, {params}:{params:{workId:string}}) {
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
    const work = await prisma.work.findUnique({
        where : {
            id:params.workId
        },select:{
            author_id:true
        }
    })
    if (!work){
        return Response.json({message: 'Not Found'},{status:404})
    }
    if (work.author_id !== userId) {
        return Response.json({message: 'Forbidden'},{status:403})
    }
    const result = await prisma.work.delete({
        where : {
            id:params.workId
        }
    })
    revalidatePath('/', 'layout')
    return Response.json(result)
}

export async function PUT(req: Request, {params}:{params:{workId:string}}) {
    const limiter = rateLimit({
        interval: 60 * 1000, // 60 seconds
        uniqueTokenPerInterval: 500, // Max 500 users per second
    })
    await limiter.check(5, 'CACHE_TOKEN') // 10 requests per minute
    const session = await getServerSession(OPTIONS);
    if (!session || !session.user) {
        return Response.json({message: 'Unauthorized'}, {status: 401})
    }
    const userId = session?.user.id;
    const requestedWork = object({
        name:string()
    })
    const body = await req.json()
    try {
        assert(body, requestedWork)

    }catch (error){
        return Response.json({message: 'Bad Request'},{status: 400})
    }
    const work = await prisma.work.findUnique({
        where : {
            id:params.workId
        },select:{
            author_id:true
        }
    })
    if (!work){
        return Response.json({message: 'Not Found'},{status:404})
    }

    if (work.author_id !== userId) {
        return Response.json({message: 'Forbidden'},{status:403})
    }
    const result = await prisma.work.update({
        where : {
            id:params.workId
        },
        data:{
            name:body.name
        }
    })
    revalidatePath('/', 'layout')
    return Response.json(result)
}

