import {block} from "../../prisma/generated/zod";

export const createBlock = async (partId:string) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_VERCEL_URL}/api/parts/${partId}/blocks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        if (response.ok){
            return await response.json()
        }
    } catch (error) {
        console.error("Failed to create work:", error);
    }
};

export const deleteBlock = async (id:string) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_VERCEL_URL}/api/blocks/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok){
            return true
        }
    } catch (error) {
        console.error("Failed to create work:", error);
        return false
    }
};

export const createPart = async (workId:string) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_VERCEL_URL}/api/works/${workId}/parts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        if (response.ok){
            return await response.json()
        }
    } catch (error) {
        console.error("Failed to create work:", error);
    }
};

export const deletePart = async (id:string) => {
    console.log("called")
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_VERCEL_URL}/api/parts/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok){
            return await response.json()
        }
    } catch (error) {
        console.error("Failed to create work:", error);
    }
};
export const updatePart = async (id:string,newName:string) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_VERCEL_URL}/api/parts/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name:newName
            }),
        });
        if (response.ok) {
            return await response.json()
        }
    } catch (error) {
        console.error("Failed to create work:", error);
    }

}

export const updateSpeed = async (speed: number,block:block) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_VERCEL_URL}/api/blocks/${block.id}/speed`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                speed: speed
            }),
        });
        if (response.ok) {
            return await response.json()
        }
    } catch (error) {
        console.error("Failed to create work:", error);
    }

}

export const updateVolume = async (volume:number,block:block) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_VERCEL_URL}/api/blocks/${block.id}/volume`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                volume: volume
            }),
        });
        if (response.ok) {
            return await response.json()
        }
    } catch (error) {
        console.error("Failed to create work:", error);
    }
}

export const updatePitch = async (pitch:number,block:block) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_VERCEL_URL}/api/blocks/${block.id}/pitch`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                pitch: pitch
            }),
        });
        if (response.ok) {
            return await response.json()
        }
    } catch (error) {
        console.error("Failed to create work:", error);
    }
}
export const updateSpeaker = async (speaker: string, block: block) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_VERCEL_URL}/api/blocks/${block.id}/speaker`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                speaker: speaker
            }),
        });
        if (response.ok) {
            return await response.json()
        }
    } catch (error) {
        console.error("Failed to create work:", error);
    }
}

export const updateTexts = async (block:block) => {
    try {
        const partData = {
            texts: block.texts
        }
        const response = await fetch(`${process.env.NEXT_PUBLIC_VERCEL_URL}/api/blocks/${block.id}/texts`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(partData),
        });
        if (response.ok) {
            return await response.json()
        }
    } catch (error) {
        console.error("Failed to create work:", error);
    }
}
export const updateDuration = async (block:block,duration:number) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_VERCEL_URL}/api/blocks/${block.id}/duration`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                duration: duration
            }),
        });
        if (response.ok) {
            return await response.json()
        }
    } catch (error) {
        console.error("Failed to create work:", error);
    }
}
export const createWork = async () => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_VERCEL_URL}/api/works`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        if (response.ok){
            return await response.json()
        }
    } catch (error) {
        console.error("Failed to create work:", error);
    }
};

export const deleteWork = async (id:string) => {

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_VERCEL_URL}/api/works/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok){
            return await response.json()
        }
    } catch (error) {
        console.error("Failed to create work:", error);
        return false
    }
};
export const updateWorkName = async (id:string,newName:string) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_VERCEL_URL}/api/works/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name:newName
            }),
        });
        if (response.ok) {
            return await response.json()
        }
    } catch (error) {
        console.error("Failed to create work:", error);
    }
}