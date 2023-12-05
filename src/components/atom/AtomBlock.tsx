"use client"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import '@fortawesome/fontawesome-svg-core/styles.css'
import React, {useState} from 'react';
import {faPlay} from "@fortawesome/free-solid-svg-icons";
import {PitchPopover, SpeedPopover, VolumePopover} from "@/components/atom/Popover"
import {BlockDropdown, DurationDialog, SpeakerDropDown} from "@/components/atom/PartAndWorkDropdown";
import {block} from "@/../prisma/generated/zod";
import {synthesize} from "@/lib/utils";
import {updatePitch, updateSpeaker, updateSpeed, updateTexts, updateVolume} from "@/lib/callApi";


const AtomBlock = ({blockData,handleDelete,moveBlockDown,moveBlockUp}:{blockData:block,handleDelete:()=>void,moveBlockDown:()=>void,moveBlockUp:()=>void} ) => {
    const [block , setBlock] = useState(blockData);
    const [isLoading, setIsLoading] = useState(false); // Add this line

    return (
        <div className="shadow-xl mt-10">
            <div className="bg-gray-300 p-4">
                <div className="flex mr-8">
                    <SpeakerDropDown block={block} updateSpeaker={async (speaker: string) => {
                        setBlock({...block, speaker: speaker})
                        await updateSpeaker(speaker, block)
                    }}/>
                    <VolumePopover block={block} updateVolume={async (volume: number) => {
                        setBlock({
                            ...block,
                            volume: volume
                        })
                        await updateVolume(volume, block)
                    }}/>
                    <SpeedPopover block={block} updateSpeed={async (speed: number) => {
                        setBlock({
                            ...block,
                            speed: speed
                        })
                        await updateSpeed(speed, block)
                    }}/>
                    <PitchPopover block={block} updatePitch={async (pitch: number) => {
                        setBlock({
                            ...block,
                            pitch: pitch
                        })
                        await updatePitch(pitch, block)
                    }}/>

                    <div className="ml-auto">
                        <BlockDropdown handleDelete={()=>handleDelete()} ></BlockDropdown>
                    </div>
                </div>
            </div>
            <div>
                <ul>
                    <li key={block.id} className="bg-white z-0">
                        <div className="flex ml-8 mr-8">
                            <textarea
                                className="w-full outline-none"
                                onBlur={async () => {
                                    await updateTexts(block)
                                }}
                                onChange={(e) => {
                                    setBlock({...block, texts: e.target.value })
                                }}
                                value={block.texts}
                            />
                            {
                                isLoading? (
                                    <div className="animate-spin h-5 w-5 border-4 border-blue-500 rounded-full border-t-transparent"></div>
                                ):(
                                    <button onClick={()=> {
                                        setIsLoading(true)
                                        synthesize(block.texts, block.pitch, block.speaker, block.volume, block.speed).then(audio => {
                                            setIsLoading(false)
                                            audio?.play()
                                        })
                                    }}>
                                        <FontAwesomeIcon icon={faPlay} className="ml-auto p-0.5 hover:bg-gray-200" />
                                    </button>
                                )
                            }
                        </div>
                    </li>
                </ul>
                <div className="justify-center flex bg-white w-full group ">
                    <DurationDialog block={block} />
                </div>
            </div>
        </div>


    )};

export default AtomBlock;