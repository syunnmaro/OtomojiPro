import React, {useState} from 'react';
import * as Popover from "@radix-ui/react-popover";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowDownUpAcrossLine, faGauge, faVolumeHigh} from "@fortawesome/free-solid-svg-icons";
import * as Slider from "@radix-ui/react-slider";
import {block} from "@/../prisma/generated/zod";

export const SpeedPopover = ({block,updateSpeed}:{block:block,updateSpeed:(speed:number)=>void}) => {
    const [sliderValue , setSliderValue] = React.useState(block.speed);
    const [title, setTitle] = React.useState(block.speed);
    const changeTitle = (value:number)=>{
        setTitle(value)
    }
    return (
        <>
            <Popover.Root >
                <Popover.Trigger asChild>
                    <button type="button" className="px-3 text-xs font-medium text-center bg-white text-gray-600  rounded-3xl  hover:bg-gray-200 mx-1"><FontAwesomeIcon icon={faGauge} />X{title}</button>
                </Popover.Trigger>
                <Popover.Portal >
                    <Popover.Content className="PopoverContent bg-white rounded-xl shadow-2xl" sideOffset={5} >
                        <div className="">
                            <div className="py-2.5">
                                <span>速度</span>
                                <input type="text" inputMode="numeric" pattern="\d*" value={sliderValue} className="outline-none outline-gray-100 w-10 " onChange={(e)=>setSliderValue(Number(e.target.value))} onBlur={(e)=>changeTitle(Number(e.target.value))}/>
                            </div>
                            <Slider.Root
                                className="relative flex items-center select-none touch-none w-[200px] h-5 py-5"
                                min={0.25}
                                max={4.0}
                                step={0.01}
                                value={[sliderValue]}
                                onValueChange={(vol)=>setSliderValue(vol[0])}
                                onValueCommit={(vol)=> {
                                    changeTitle(vol[0])
                                    updateSpeed(vol[0])
                                }}
                            >
                                <Slider.Track className="bg-gray-200 relative grow rounded-full h-[5px]">
                                    <Slider.Range className="absolute bg-teal-400 rounded-full h-full" />
                                </Slider.Track>

                                <Slider.Thumb
                                    className="block w-5 h-5 bg-teal-400 rounded-[10px] "
                                    aria-label="Volume"
                                />
                            </Slider.Root>
                            <hr className="h-0.5 border-t-0 bg-neutral-200 opacity-100" />
                            <div className="text-gray-500 font-medium text-2xl p-2">
                                <button onClick={()=> {
                                    setSliderValue(1.2)
                                    changeTitle(1.2)
                                    updateSpeed(1.2)
                                }} >
                                    <p　className=" ">高校標準程度</p>
                                </button>
                            </div>
                            <div className="text-gray-500 font-medium text-2xl p-2">
                                <button onClick={()=> {
                                    setSliderValue(1.2)
                                    changeTitle(1.2)
                                    updateSpeed(1.2)
                                }} >
                                    <p　className=" ">中学標準程度</p>
                                </button>
                            </div>
                        </div>
                    </Popover.Content>
                </Popover.Portal>
            </Popover.Root>

        </>




    );
};


export const VolumePopover = ({block,updateVolume}:{block:block,updateVolume:(volume:number)=>void}) => {
    const [title, setTitle] = useState(block.volume);
    const [value, setValue] = useState(block.volume);

    const changeValue = (value: number)=>{
        setValue(value)
    }
    const changeTitle = (value:number)=>{
        setTitle(value)
    }


    return (
        <Popover.Root >
            <Popover.Trigger asChild>
                <button type="button" className="px-3 text-xs font-medium text-center bg-white text-gray-600  rounded-3xl  hover:bg-gray-200 mx-1"><FontAwesomeIcon icon={faVolumeHigh} />
                    {title}%</button>
            </Popover.Trigger>
            <Popover.Portal >
                <Popover.Content className="PopoverContent bg-white rounded-xl shadow-2xl" sideOffset={5}>
                    <div className="">
                        <div className="py-2.5">
                            <span>音量</span>
                            <input type="text" inputMode="numeric" pattern="\d*" value={value} className="outline-none outline-gray-100 w-10" onChange={(e)=>changeValue(Number(e.target.value))} onBlur={(e)=>changeTitle(Number(e.target.value))}/>
                        </div>
                        <hr
                            className="h-0.5 border-t-0 bg-neutral-200 opacity-100 dark:opacity-50" />
                        <Slider.Root
                            className="relative flex items-center select-none touch-none w-[200px] h-5 py-5"
                            min={0}
                            max={100}
                            step={1}
                            value={[value]}
                            onValueChange={(vol)=>changeValue(vol[0])}
                            onValueCommit={(vol)=> {
                                changeTitle(vol[0])
                                updateVolume(vol[0])
                            }}
                        >
                            <Slider.Track className="bg-gray-200 relative grow rounded-full h-[5px]">
                                <Slider.Range className="absolute bg-teal-400 rounded-full h-full" />
                            </Slider.Track>

                            <Slider.Thumb
                                className="block w-5 h-5 bg-teal-400 rounded-[10px] "
                                aria-label="Volume"
                            />
                        </Slider.Root>
                    </div>
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>




    );
};
export const PitchPopover = ({block,updatePitch}:{block:block,updatePitch:(pitch:number)=>void}) => {
    const [value, setValue] = React.useState(block.pitch);
    const [title, setTitle] = React.useState(block.pitch);

    const changeValue = (value:number)=>{
        setValue(value)
    }
    const changeTitle = (value:number)=>{
        setTitle(value)
    }


    return (
        <Popover.Root >
            <Popover.Trigger asChild>
                <button type="button" className="px-3 text-xs font-medium text-center bg-white text-gray-600  rounded-3xl  hover:bg-gray-200 mx-1">
                    <FontAwesomeIcon icon={faArrowDownUpAcrossLine} />
                    {title}
                </button>
            </Popover.Trigger>
            <Popover.Portal >
                <Popover.Content className="PopoverContent bg-white rounded-xl shadow-2xl" sideOffset={5}>
                    <div className="">
                        <div className="py-2.5">
                            <span>ピッチ</span>
                            <input type="text" inputMode="numeric" pattern="\d*" value={value} className="outline-none outline-gray-100 w-10" onChange={(e)=>changeValue(Number(e.target.value))} onBlur={(e)=>changeTitle(Number(e.target.value))}/>
                        </div>
                        <hr
                            className="h-0.5 border-t-0 bg-neutral-200 opacity-100 dark:opacity-50" />
                        <Slider.Root
                            className="relative flex items-center select-none touch-none w-[200px] h-5 py-5"
                            min={-20}
                            max={20}
                            step={1}
                            value={[value]}
                            onValueChange={(vol)=>changeValue(vol[0])}
                            onValueCommit={(vol)=> {
                                changeTitle(vol[0])
                                updatePitch(vol[0])
                            }}
                        >
                            <Slider.Track className="bg-gray-200 relative grow rounded-full h-[5px]">
                                <Slider.Range className="absolute bg-teal-400 rounded-full h-full" />
                            </Slider.Track>

                            <Slider.Thumb
                                className="block w-5 h-5 bg-teal-400 rounded-[10px] "
                                aria-label="Volume"
                            />
                        </Slider.Root>
                    </div>
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>




    );
};

