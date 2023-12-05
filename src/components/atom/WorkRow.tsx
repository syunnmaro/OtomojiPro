"use client"
import {useRouter} from "next/navigation";
import {PartAndWorkDropdown} from "@/components/atom/PartAndWorkDropdown"
import React from "react";
import {updateWorkName} from "@/lib/callApi";

type Props = {
    name: string,
    id: string,
    created_at: string,
    handleDeleteWork: () => void
}
 const WorkRow = ({name,id,created_at,handleDeleteWork}:Props)=> {
     const router = useRouter()
     const [isEditing, setIsEditing] = React.useState(false);
     const [title, setTitle] = React.useState(name);
     const editHandler = ()=>{
         setIsEditing(!isEditing)
     }

     return (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-200 font-medium text-gray-900 z-0" key={id}>
            {isEditing
                ?
                <td className="px-6 py-4  whitespace-nowrap dark:text-white"  onBlur={()=> {
                    updateWorkName(id,title)
                    console.log(title)
                    editHandler()
                }}>
                    <input type="text" defaultValue={title} value={title} onChange={(e)=> {
                        setTitle(e.target.value)
                        console.log(title)
                    }} className="focus:outline-none border-2 border-teal-600 p-0.5"/>
                </td>

                :
                <td className="px-6 py-4  whitespace-nowrap dark:text-white" onClick={() => router.push(id)}>
                    {title}
                </td>
            }

            <td className="px-6 py-4" onClick={() => router.push(id)}>
                {created_at}
            </td>
            <td>
                <PartAndWorkDropdown handleDeleteWork={()=>handleDeleteWork()} editHandler={() => editHandler()}/>
            </td>

        </tr>
    )
}

export default WorkRow;
