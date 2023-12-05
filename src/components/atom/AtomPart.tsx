"use client"
import React from 'react';
import Link from "next/link";
import {PartAndWorkDropdown} from "./PartAndWorkDropdown";
import {useRouter, useSelectedLayoutSegment} from "next/navigation";
import {updatePart} from "@/lib/callApi";

const AtomPart = ({id,name,workId,handleDeletePart}:{id:string,name:string,workId:string,handleDeletePart:()=>void}) => {
    const [isEditing, setIsEditing] = React.useState(false);
    const [title, setTitle] = React.useState(name);
    const selectedPartId = useSelectedLayoutSegment()
    const editHandler = ()=>{
        setIsEditing(!isEditing)

    }


    return (
        <div className={`flex relative p-2 items-center ${selectedPartId===id ?"bg-gray-100" :"bg-white"}`} key={id}>
            {isEditing ?
                <li className="text-2xl my-2 flex items-center w-auto" key={id} onBlur={async () => {
                    editHandler()
                    await updatePart(id, title)
                }}>
                    <input type="text" defaultValue={name} aria-selected={"true"} value={title} onChange={(e)=>setTitle(e.target.value)} className="focus:outline-none border-2 border-teal-600 w-64"/>
                </li>
                :
                <Link href={`/${workId}/${id}`} className="flex-1 hover:bg-gray-100">
                    <li className="text-2xl my-2 flex items-center w-auto" key={id}>
                        <span>{title}</span>
                    </li>
                </Link>
            }

            <PartAndWorkDropdown handleDeleteWork={() => handleDeletePart()} editHandler={() => editHandler()} />
        </div>





    );
};

export default AtomPart;
