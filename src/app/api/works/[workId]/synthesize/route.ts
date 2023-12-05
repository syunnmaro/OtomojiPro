import {block} from "@/../prisma/generated/zod";
import prisma from "@/lib/prisma";
import admZip from 'adm-zip'
import {assert, enums} from "superstruct";
import rateLimit from "@/lib/rateLimit";
import {getServerSession} from "next-auth/next";
import {OPTIONS} from "@/lib/authOptions";
import {synthesizeText} from "@/lib/utilsServer";

export async function GET(req: Request, { params }: { params: { workId: string } }) {
    const session = await getServerSession(OPTIONS);
    if (!session || !session.user) {
        return Response.json({ message: 'Unauthorized' }, { status: 401 });
    }
    const limiter = rateLimit({
        interval: 60 * 1000 * 10,
        uniqueTokenPerInterval: 500,
    })
    await limiter.check(5, session.user.id);
    const url = new URL(req.url);
    const separate = url.searchParams.get("separate");
    const request = enums(['yes', 'no']);
    try {
        assert(separate, request);
    } catch (error) {
        return Response.json({ message: 'Bad Request' }, { status: 400 });
    }

    const parts = await prisma.part.findMany({
        where: {
            work_id: params.workId
        },select:{
            id:true,
            name:true,
        }
    });
    let audioPrtBufferArray: Buffer[] = [];
    let audioPartBufferArrays: Buffer[] = [];
    await Promise.all(parts.map(async (part: {id:string,name:string}) => {
        const blocks: block[] = await prisma.block.findMany({
            where: {
                part_id: part.id
            }
        });
        await Promise.all(blocks.map(async (block: block) => {
            const cacheBlock = {
                texts: block.texts,
                speaker: block.speaker,
                pitch: block.pitch,
                volume: block.volume,
                speed: block.speed,
                duration: block.duration,
            };

            if (block.texts.length === 0) return;
            let buffer: Buffer|undefined
            const speaker = block.speaker.split('-')[0]+"-"+ block.speaker.split('-')[1]+"-"+"Wavenet"+"-"+block.speaker.split('-')[3]
            console.log(speaker)
            const base64 = await synthesizeText(block.texts, speaker,block.pitch,block.volume,block.speed,block.duration);
            if (base64){
                buffer = Buffer.from(base64, 'base64');
            }
            if (buffer){
                audioPrtBufferArray.push(buffer)
            }
        }));
        const mergedBuffer = Buffer.concat(audioPrtBufferArray)
        audioPartBufferArrays.push(mergedBuffer);
        audioPrtBufferArray = []
    }));

    if (separate === 'yes') {
        const zip = new admZip();
        audioPartBufferArrays.map((audioPartBuffer, index) => {
            zip.addFile(`${parts[index].name}.mp3`, audioPartBuffer);
        });
        const partsAudioZip = zip.toBuffer();
        return new Response(partsAudioZip, { status: 200, headers: { 'Content-Type': 'application:zip', "Content-Disposition": "attachment; filename=audio.zip" } });
    }
    if (separate === 'no') {
        const mergedBuffer = Buffer.concat(audioPartBufferArrays);
        return new Response(mergedBuffer, { status: 200, headers: { 'Content-Type': 'audio/mpeg', "Content-Disposition": "attachment; filename=audio.mp3" } });
    }
}