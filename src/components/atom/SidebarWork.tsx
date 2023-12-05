"use client"
import React, {useState} from "react";
import {work} from "@/../prisma/generated/zod";

const SidebarWork = ({work}:{work:work}) => {
    const [name,setName] = useState(work.name);
    const updatePartName = async (newName:string) => {
        try {
            const workData:{name:string} = {
                name:newName
            }
            const response = await fetch(`${process.env.NEXT_PUBLIC_VERCEL_URL}/api/works/${work.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(workData),

            });
            if (response.ok) {
                const res=await response.json()
                setName(res.name)
            }
        } catch (error) {
            console.error("Failed to create work:", error);
        }
    }
    return (
        <input className="text-3xl p-2 outline-none hover:outline-gray-300 w-full" defaultValue={name} onBlur={()=>updatePartName(name)} onChange={(e)=>setName(e.target.value)}/>
    )
}

export default SidebarWork