import prisma from "@/lib/prisma";
import {ulid} from "ulid";
import {revalidatePath} from "next/cache";
import rateLimit from "@/lib/rateLimit";
import {getServerSession} from "next-auth/next";
import {NextRequest} from "next/server";
import {OPTIONS} from "@/lib/authOptions";

export async function GET(req: NextRequest, {params}:{params:{workId:string}}) {
    const limiter = rateLimit({
        interval: 60 * 1000, // 60 seconds
        uniqueTokenPerInterval: 500, // Max 500 users per second
    })
    await limiter.check( 10, 'CACHE_TOKEN') // 10 requests per minute
    const session = await getServerSession(OPTIONS);
    const userId = session?.user.id;
    const parts = await prisma.part.findMany({
        where : {
            work_id:params.workId
            
        }
    })
    parts.map((part)=> {
        if (part.author_id !== userId){
            return Response.json({message: 'Forbidden'},{status: 403})
        }
    })
    return Response.json(parts);
}

export async function POST(req: Request, {params}:{params:{workId:string}}) {
    const limiter = rateLimit({
        interval: 60 * 1000, // 60 seconds
        uniqueTokenPerInterval: 500, // Max 500 users per second
    })
    await limiter.check( 5, 'CACHE_TOKEN') // 10 requests per minute
    const session = await getServerSession(OPTIONS); // this DOESN'T return null if the user is signed in
    const userId = session?.user.id;
    if (!session) {
        return Response.json({message: 'Unauthorized'},{status: 401})
    }
    const work = await prisma.work.findUnique({
        where:{
            id:params.workId
        },
        select:{
            author_id:true
        }
    })
    if (!work){
        return Response.json({message: 'Not Found'},{status:404})
    }
    if (work.author_id !== userId){
        return Response.json({message: 'Forbidden'},{status: 403})
    }
    const result = await prisma.part.create({
        data:{
            id:ulid(),
            name:"新しいパート",
            work_id: params.workId,
            author_id: userId,
        }
    })
    revalidatePath('/', 'layout')
    return Response.json(result)
}