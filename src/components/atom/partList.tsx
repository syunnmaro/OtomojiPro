"use client";
import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {part} from "@/../prisma/generated/zod";
import AtomPart from "@/components/atom/AtomPart";
import {createPart, deletePart} from "@/lib/callApi";

const PartList = ({ partsData, workId }: { partsData: part[]; workId: string }) => {
    const [parts, setParts] = useState(partsData)

    return (
        <>
            <div className="flex justify-between items-center py-4 font-bold">
                <p>パート一覧</p>
                <button
                    className="hover:rounded-s-sm hover:bg-gray-100 px-1"
                    onClick={async () => await createPart( workId).then((createdPart) => setParts([...parts, createdPart]))}
                >
                    <FontAwesomeIcon icon={faPlus} />
                </button>
            </div>
            <ul>
                {parts &&
                    parts.map((part) => (
                        <AtomPart
                            id={part.id}
                            name={part.name}
                            workId={workId}
                            key={part.id}
                            handleDeletePart={() => {
                                setParts((prevParts) => prevParts.filter((prevPart) => part.id !== prevPart.id))
                                deletePart(part.id)
                            }}
                        />
                    ))}
            </ul>
        </>
    );
};

export default PartList;