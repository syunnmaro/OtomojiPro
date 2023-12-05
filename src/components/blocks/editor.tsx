"use client"
import React, { useState } from "react";
import AtomBlock from "@/components/atom/AtomBlock";
import { GoogleSpeaker } from "@/components/types"
import { block } from "../../../prisma/generated/zod";
import { createBlock, deleteBlock } from "@/lib/callApi";

const Editor = ({ blocksData, partId }: { blocksData: block[], partId: string }) => {
    const [blocks, setBlocks] = useState(Array.isArray(blocksData) ? blocksData : []);


    const moveBlock = (index: number, direction: 'up' | 'down') => {
        if (direction === 'up' && index === 0) return;
        if (direction === 'down' && index === blocks.length - 1) return;
        const newBlocks = blocks;
        const swapIndex = direction === 'up' ? index - 1 : index + 1;
        const temp = newBlocks[swapIndex];
        newBlocks[swapIndex] = newBlocks[index];
        newBlocks[index] = temp;
        setBlocks(newBlocks);
    };

    return (
        <div className="bg-gray-50 w-full flex  justify-center mt-10 overflow-scroll">
            <div className="w-3/6 ">
                <div className="">
                    {blocks.map((block, index) => (
                        <AtomBlock
                            key={block.id}
                            blockData={block}
                            handleDelete={async () => {
                                setBlocks((blocks) => blocks.filter((oldBlock) => block.id !== oldBlock.id))
                                await deleteBlock(block.id)
                            }}
                            moveBlockDown={() => moveBlock(index, 'down')}
                            moveBlockUp={() => moveBlock(index, 'up')}
                        />
                    ))}
                </div>
                <div className="flex justify-center p-2">
                    <button className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
                        onClick={async () => await createBlock( partId).then((newBlock) => {
                            setBlocks([...blocks, newBlock]);
                        })}
                    >
                        ブロックを追加
                    </button>
                </div>

            </div>
        </div>
    );
};

export default Editor;
