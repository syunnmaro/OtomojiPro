import textToSpeech from "@google-cloud/text-to-speech";
import {number, string} from "superstruct";

export const synthesize = async (text: string,pitch:number,speaker:string,volume:number,speed:number)=>{
    const data:{ text: string,pitch:number,speaker:string,volume:number,speed:number } = {
        text:text,
        pitch:pitch,
        speaker:speaker,
        volume:volume,
        speed:speed
    }
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_VERCEL_URL}/api/synthesize`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        });
        if (response.ok){
            const body = await response.text()
            return new Audio("data:audio/wav;base64," + body)
        }
    } catch (error) {
        throw error
    }

}



