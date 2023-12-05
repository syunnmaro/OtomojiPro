"use client"
import React, {useState} from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import {Button} from "@radix-ui/themes";
import {
    faClock,
    faEllipsisV,
    faGear,
    faPen,
    faRightFromBracket,
    faTrash,
    faXmark,
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {signOut} from "next-auth/react";
import {ChevronRightIcon} from "@radix-ui/react-icons";
import {block} from "@/../prisma/generated/zod";
import * as Dialog from '@radix-ui/react-dialog';
import {updateDuration} from "@/lib/callApi";

export const PartAndWorkDropdown = ({handleDeleteWork,editHandler}:{handleDeleteWork:()=>void,editHandler:()=>void}) => {

    return (
        <DropdownMenu.Root >
            <DropdownMenu.Trigger>
                <Button variant="soft" className="p-0.5 hover:bg-gray-100 rounded-full">
                    <FontAwesomeIcon icon={faEllipsisV} />
                </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content className="z-40 bg-white text-xl shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] rounded-xl w-40">
                <DropdownMenu.Item className="px-7 py-1.5 hover:bg-gray-100 hover:outline-none rounded-2xl m-1 text-center font-bold text-gray-600 flex items-center justify-between"
                    onClick={()=>editHandler()}
                >
                    <FontAwesomeIcon icon={faPen} style={{color:"#475569"}}/>
                    <p>編集</p>
                </DropdownMenu.Item>
                <DropdownMenu.Item className="px-7 py-1.5 hover:bg-gray-100 hover:outline-none rounded-2xl m-1 text-center font-bold text-gray-600 flex items-center justify-between"
                                    onClick={()=> handleDeleteWork()}
                >
                    <FontAwesomeIcon icon={faTrash} style={{color:"#f87171"}}/>
                    <p className="text-red-400">削除</p>
                </DropdownMenu.Item>
            </DropdownMenu.Content>
        </DropdownMenu.Root>
    );
};

export const UserDropdown = ({userIconURL}: { userIconURL:string | null | undefined }) => {
    return (
        <DropdownMenu.Root >
            <DropdownMenu.Trigger className="mx-5  text-center text-gray-600   select-none flex items-center">
                    <img src={`${userIconURL}`} alt="userIcon" className="rounded-full w-12  hover:opacity-70"/>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content className="z-10 bg-white text-xl shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] rounded-xl w-40">
                <DropdownMenu.Item className="px-7 py-1.5 hover:bg-gray-100 hover:outline-none rounded-2xl m-1 text-center font-bold text-gray-600 flex items-center justify-between">
                    <Button variant="soft" className="p-0.5 outline-none " >
                        <div className="flex justify-between items-center">
                            <FontAwesomeIcon icon={faGear} size="xl"/>
                            <p className="text-center">設定</p>

                        </div>
                    </Button>
                </DropdownMenu.Item>
                <DropdownMenu.Item className="px-7 py-1.5 hover:bg-gray-100 hover:outline-none rounded-2xl m-1 text-center font-bold text-gray-600 flex items-center justify-between" onClick={() => signOut()}>
                    <FontAwesomeIcon icon={faRightFromBracket} style={{color:"#f87171"}} />
                    <p className="text-red-400">ログアウト</p>
                </DropdownMenu.Item>
            </DropdownMenu.Content>
        </DropdownMenu.Root>
    );
};

export const BlockDropdown = ({handleDelete}:{handleDelete:()=>void}) => {

    return (
        <DropdownMenu.Root >
            <DropdownMenu.Trigger className="p-0.5">
                    <FontAwesomeIcon icon={faEllipsisV} />
            </DropdownMenu.Trigger>
            <DropdownMenu.Content className="z-10 bg-white text-xl shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] rounded-xl w-40">
                <DropdownMenu.Item className="px-7 py-1.5 hover:bg-gray-100 hover:outline-none rounded-2xl m-1 text-center font-bold text-gray-600 flex items-center justify-between"
                    onClick={()=>handleDelete()}
                >
                    <FontAwesomeIcon icon={faTrash} style={{color:"#f87171"}}/>
                    <p className="text-red-400">削除</p>
                </DropdownMenu.Item>
            </DropdownMenu.Content>
        </DropdownMenu.Root>
    );
};

const jpStandardSpeaker = [
    "ja-JP-Standard-A",
    "ja-JP-Standard-B",
    "ja-JP-Standard-C",
    "ja-JP-Standard-D",
]
const usStandardSpeaker = [
    "en-US-Standard-A",
    "en-US-Standard-B",
    "en-US-Standard-C",
    "en-US-Standard-D",
    "en-US-Standard-E",
    "en-US-Standard-F",
    "en-US-Standard-G",
    "en-US-Standard-H",
    "en-US-Standard-I",
    "en-US-Standard-J",
]

export const SpeakerDropDown = ({block,updateSpeaker}: { block:block,updateSpeaker:(speaker:string)=>void }) => {
    const [speaker, setSpeaker] = useState(block.speaker);
    return (
        <DropdownMenu.Root >
            <DropdownMenu.Trigger className={"px-3 text-xs font-medium text-center bg-white text-gray-600  rounded-3xl hover:bg-gray-200 mx-1"}>
                    <p>{speaker}</p>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content className="z-10 bg-white text-xl shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] rounded-xl w-40">
                <DropdownMenu.Sub>
                    <DropdownMenu.SubTrigger className="group text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[state=open]:bg-violet4 data-[state=open]:text-violet11 data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1 data-[highlighted]:data-[state=open]:bg-violet9 data-[highlighted]:data-[state=open]:text-violet1 ">
                        日本語
                        <div className="ml-auto pl-[20px] text-mauve11 group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8 ">
                            <ChevronRightIcon />
                        </div>
                    </DropdownMenu.SubTrigger>
                    <DropdownMenu.Portal>
                        <DropdownMenu.SubContent
                            className="min-w-[220px] bg-white rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
                            sideOffset={2}
                            alignOffset={-5}
                        >
                            {jpStandardSpeaker.map((speakerName:string,index:number)=>{
                                return(
                                    <DropdownMenu.Item key={index} className="px-7 py-1.5 hover:bg-gray-100 hover:outline-none rounded-2xl m-1 text-center font-bold text-gray-600 flex items-center justify-between"
                                                       onClick={()=> {
                                                           setSpeaker(speakerName)
                                                           updateSpeaker(speakerName)
                                                       }}
                                    >
                                        <p>{speakerName.split("-")[3]}</p>
                                    </DropdownMenu.Item>
                                )

                            })}

                        </DropdownMenu.SubContent>
                    </DropdownMenu.Portal>
                </DropdownMenu.Sub>
                <DropdownMenu.Sub>
                    <DropdownMenu.SubTrigger className="group text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[state=open]:bg-violet4 data-[state=open]:text-violet11 data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1 data-[highlighted]:data-[state=open]:bg-violet9 data-[highlighted]:data-[state=open]:text-violet1 ">
                        アメリカ英語
                        <div className="ml-auto pl-[20px] text-mauve11 group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8 ">
                            <ChevronRightIcon />
                        </div>
                    </DropdownMenu.SubTrigger>
                    <DropdownMenu.Portal>
                        <DropdownMenu.SubContent
                            className="min-w-[220px] bg-white rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
                            sideOffset={2}
                            alignOffset={-5}
                        >
                            {usStandardSpeaker.map((speakerName:string,index:number)=>{
                                return(
                                    <DropdownMenu.Item key={index} className="px-7 py-1.5 hover:bg-gray-100 hover:outline-none rounded-2xl m-1 text-center font-bold text-gray-600 flex items-center justify-between"
                                                       onClick={()=> {
                                                           setSpeaker(speakerName)
                                                           updateSpeaker(speakerName)
                                                           console.log(speakerName)
                                                       }}
                                    >
                                        <p>{speakerName.split("-")[3]}</p>
                                    </DropdownMenu.Item>
                                )

                            })}

                        </DropdownMenu.SubContent>
                    </DropdownMenu.Portal>
                </DropdownMenu.Sub>


            </DropdownMenu.Content>
        </DropdownMenu.Root>
    );
};
export const DurationDialog = ({block}:{block:block}) => {
    const [duration, setDuration] = useState(block.duration)


    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>
                {duration!==0?(
                    <button className="bg-white rounded-3xl border-2 border-teal-500 text-teal-500 font-bold py-2 px-4  opacity-0 group-hover:opacity-100">
                        {duration}s
                    </button>
                ):(
                    <button className="bg-white rounded-3xl border-2 border-teal-500 text-teal-500 font-bold py-2 px-4  opacity-0 group-hover:opacity-100">
                        間隔を指定
                    </button>
                )

                }
            </Dialog.Trigger>
            <Dialog.Overlay className="bg-opacity-80 bg-gray-600 data-[state=open]:animate-overlayShow fixed inset-0 " />
            <Dialog.Portal>
                <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0 " />
                <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none"
                >
                    <Dialog.Title className="text-mauve12 m-0 text-[17px] font-bold text-gray-600">
                        ブロック間の間隔を追加
                    </Dialog.Title>
                    <DropdownMenu.Separator className="h-[1px] bg-gray-400 m-[5px]" />
                    <div className="">
                        <Dialog.Close asChild>
                            <div className="py-1.5 hover:bg-gray-100 hover:outline-none rounded-2xl m-1 text-center font-bold text-gray-600 flex items-center"
                                 onClick={(e)=> {
                                     setDuration(1)
                                     updateDuration(block, 1)
                                 }}
                            >
                                <FontAwesomeIcon icon={faClock} style={{color:"#475569"}} size="lg"/>
                                <p className="text-xl px-2">1s</p>
                            </div>
                        </Dialog.Close>
                        <Dialog.Close asChild>
                            <div className="py-1.5 hover:bg-gray-100 hover:outline-none rounded-2xl m-1 text-center font-bold text-gray-600 flex items-center"
                                 onClick={(e)=> {
                                     setDuration(5)
                                     updateDuration(block, 5)
                                 }}
                            >
                                <FontAwesomeIcon icon={faClock} style={{color:"#475569"}} size="lg"/>
                                <p className="text-xl px-2">5s</p>
                            </div>
                        </Dialog.Close>
                        <Dialog.Close asChild>
                            <div className="py-1.5 hover:bg-gray-100 hover:outline-none rounded-2xl m-1 text-center font-bold text-gray-600 flex items-center"
                                 onClick={(e)=> {
                                     setDuration(10)
                                     updateDuration(block, 10)
                                 }}                            >
                                <FontAwesomeIcon icon={faClock} style={{color:"#475569"}} size="lg"/>
                                <p className="text-xl px-2">10s</p>
                            </div>
                        </Dialog.Close>
                        <Dialog.Close asChild>
                            <div className="py-1.5 hover:bg-gray-100 hover:outline-none rounded-2xl m-1 text-center font-bold text-gray-600 flex items-center"
                                 onClick={(e)=> {
                                     setDuration(15)
                                     updateDuration(block, 15)
                                 }}                            >
                                <FontAwesomeIcon icon={faClock} style={{color:"#475569"}} size="lg"/>
                                <p className="text-xl px-2">15s</p>
                            </div>
                        </Dialog.Close>


                    </div>
                    <DropdownMenu.Separator className="h-[1px] bg-gray-400 m-[5px]" />
                    <div>
                        <p className="font-bold text-gray-600 py-2">カスタム</p>
                        <div className="flex">
                            <input type="number"  className="border-[2px] border-gray-200 w-64 h-10 focus:outline-none focus:border-teal-500 rounded-xl" onChange={(e)=>setDuration(Number(e.target.value))}/>
                            <Dialog.Close asChild>
                                <button className="bg-white rounded-xl border-2 border-teal-500 text-teal-500 font-bold py-2 px-4  h-10 mx-4"
                                onClick={()=>updateDuration(block,duration)}
                                >
                                    追加
                                </button>
                            </Dialog.Close>

                        </div>
                    </div>
                    
                    <Dialog.Close asChild>
                        <button
                            className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[20px] right-[20px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
                            aria-label="Close"
                        >
                            <FontAwesomeIcon icon={faXmark} />
                        </button>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}

