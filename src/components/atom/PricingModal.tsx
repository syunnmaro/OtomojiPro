import React, {ReactElement} from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import {Cross2Icon} from '@radix-ui/react-icons';

const PricingModal = ({children}:{children:ReactElement}) => (
    <Dialog.Root >
        <Dialog.Trigger asChild>
            {children}
        </Dialog.Trigger>
        <Dialog.Portal >
            <Dialog.Overlay className="bg-opacity-80 bg-gray-600 data-[state=open]:animate-overlayShow fixed inset-0 " />
            <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%]  translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                <div>
                    <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl text-center">文字を購入する</h1>
                    <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 ">
                        購入したポイントはすべての作品で使用することができます。
                    </p>

                    <div className="flex ">
                        <div  className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">15分/800円</h5>
                            <p>500ポイントお得</p>
                            <p className="font-normal text-gray-700 dark:text-gray-400">おおよそ15分のテストを作成することができます。</p>
                            <form action="/api/checkout" method="POST">
                                <section>
                                    <button type="submit" role="link">
                                        Checkout
                                    </button>
                                </section>
                            </form>
                        </div>
                        <div  className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">60分/2400円</h5>
                            <p className="font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                        </div>
                        <div  className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow ">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">120分/4800円</h5>
                            <p className="font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                        </div>
                    </div>
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
);

export default PricingModal;