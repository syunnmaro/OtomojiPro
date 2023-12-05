"use client"
import React, {PropsWithChildren} from 'react';
import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import * as Dialog from "@radix-ui/react-dialog";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import {Cross2Icon} from "@radix-ui/react-icons";
import Image from 'next/image'


export const Header = (props:PropsWithChildren) => {
    return (
        <>
            <header>
                <nav className="border-b border-color-black py-4 bg-gray-600">
                    <div className="flex mx-auto max-w-screen-xl">
                        {props.children}
                    </div>
                </nav>
            </header>
        </>




);
};

export const EditorHeader = ({ workId }: { workId: string }) => {
    const [value, setValue] = React.useState('left');

    return (
        <nav className="border-b border-color-black py-2.5 ">
            <header>
                <div className="flex">
                    <Link className="py-3 hover:bg-gray-200 items-center font-bold text-lg mx-5" href={"/works"}>
                        <FontAwesomeIcon icon={faArrowLeft} size={"2xl"} />
                        <span className=" text-gray-600">作品一覧に戻る</span>
                    </Link>
                    <div className="ml-auto flex items-center">
                        <Dialog.Root >
                            <Dialog.Trigger asChild>
                                <button type="button" className="px-6 py-3.5 font-bold text-teal-500  focus:ring-4 focus:outline-none rounded-lg text-center border-2 border-teal-500">
                                    音声をエクスポート
                                </button>
                            </Dialog.Trigger>
                            <Dialog.Portal >
                                <Dialog.Overlay className="bg-opacity-80 bg-gray-600 fixed inset-0 " />
                                <Dialog.Content className=" fixed font-bold text-lg text-gray-700 top-[50%] left-[50%]  translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">

                                    <Dialog.Title className=" text-2xl ">
                                        音声をエクスポートする
                                    </Dialog.Title>
                                    <div className="">
                                        <p className="text-gray-600 mt-8">分割方法</p>
                                        <ToggleGroup.Root
                                            className="inline-flex bg-mauve6 rounded space-x-2"
                                            type="single"
                                            value={value}
                                            defaultValue="left"
                                            aria-label="Text alignment"
                                            onValueChange={(value)=>setValue(value)}
                                        >
                                            <ToggleGroup.Item className=" border-gray-300 border-2  radix-state-on:border-teal-600 rounded-xl" value="left" aria-label="center aligned ">
                                                <div className=" shadow-lg p-5 ">
                                                    <Image width="224" height="252" className="w-full" src="/noSeparatePart.webp" alt="Sunset in the mountains"/>
                                                    < p className="font-medium">パートごとに分割しない</p>
                                                </div>
                                            </ToggleGroup.Item>
                                            <ToggleGroup.Item className=" border-gray-300 border-2  radix-state-on:border-teal-600 rounded-xl" value="center" aria-label="center aligned ">
                                                <div className=" shadow-lg p-5 ">
                                                    <Image width="224" height="252" className="w-full" src="/separatePart.webp" alt="Sunset in the mountains"/>
                                                    < p className="font-medium">パートごとに分割する</p>
                                                </div>
                                            </ToggleGroup.Item>
                                        </ToggleGroup.Root>
                                    </div>
                                    <div className="mt-[25px] flex justify-end">
                                        <Link className="btn bg-teal-600 inline-flex h-[35px] items-center justyfy-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none"
                                              href={`${process.env.NEXT_PUBLIC_VERCEL_URL}/api/works/${workId}/synthesize?separate=${value==="left" ?"no" :"yes" }`} rel="noopener noreferrer" target="_blank"
                                        >
                                              <p className="text-white text-2xl font-bold ">音声を作成する</p>
                                        </Link>
                                    </div>
                                    <Dialog.Close asChild>
                                        <button
                                            className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
                                            aria-label="Close"
                                        >
                                            <Cross2Icon />
                                        </button>
                                    </Dialog.Close>
                                </Dialog.Content>
                            </Dialog.Portal>
                        </Dialog.Root>
                    </div>
                </div>
            </header>
        </nav>




    );
};
