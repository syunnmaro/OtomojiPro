import textToSpeech from '@google-cloud/text-to-speech'
import {NextResponse} from "next/server";
import {getServerSession} from "next-auth/next";
import {OPTIONS} from "@/lib/authOptions";
import rateLimit from "@/lib/rateLimit";
import {assert, enums, number, object, size, string} from "superstruct";
import {synthesizeText} from "@/lib/utilsServer";

export async function POST(req: Request, res: NextResponse) {
    const session = await getServerSession(OPTIONS);
    if (!session || !session.user) {
        return Response.json({message: 'Unauthorized'}, {status: 401})
    }
    const limiter = rateLimit({
        interval: 60 * 1000,
        uniqueTokenPerInterval: 500,
    })
    await limiter.check(10, session.user.id)
    const request = object({
        text:string(),
        speaker:string(),
        pitch:size(number(), -20, 20),
        speed:size(number(), 0.25, 4.0),
        volume:size(number(), 0, 100),
    })
    const body = await req.json()
    try {
        assert(body, request)

    }catch (error){
        return Response.json({message: 'Bad Request'},{status: 400})
    }
    const buffer= await synthesizeText(body.text,body.speaker,body.pitch,body.volume,body.speed,0)
    return new Response(buffer,{status:200})
}