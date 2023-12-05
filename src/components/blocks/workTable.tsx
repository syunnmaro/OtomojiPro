"use client"

import React from 'react';
import WorkRow from "@/components/atom/WorkRow";
import {work} from "@/../prisma/generated/zod"
import {createWork, deleteWork} from "@/lib/callApi";

const WorkTable = ({worksData}:{worksData:work[]}) => {
    const [works, setWorks] = React.useState(worksData);

    const handleDelete = (id:string) => {
        setWorks((prevWorks) => prevWorks.filter((prevWork) => id !== prevWork.id))
        deleteWork(id)
    }

    const handleCreate = () => {
        createWork().then((createdWork)=>{
            const newWorks = [...works, createdWork];
            setWorks(newWorks)
        });
    }

    return (
        <div className="mx-auto flex flex-col py-5">
            <div className="flex items-center justify-end py-5">
                <button
                    className="btn btn-md bg-teal-500 text-white items-center text-2xl py-3.5 px-6 font-bold mt-6 rounded-full"
                    onClick={()=>handleCreate()}
                >
                    新規作成
                </button>
            </div>
            <div className="flex flex-col">
                <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500 ">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                        <tr>
                            <th className="px-6 py-3">タイトル</th>
                            <th className="px-6 py-3">作成日</th>
                            <th className="px-6 py-3"></th>
                        </tr>
                        </thead>
                        <tbody>
                        {works && works.map((work) => (
                            <WorkRow
                                key={work.id}
                                name={work.name}
                                id={work.id}
                                created_at={work.created_at}
                                handleDeleteWork={() => handleDelete(work.id)}
                            />
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default WorkTable;