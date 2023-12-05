import {Header} from "@/components/atom/Header";
import Link from "next/link";
import WorkTable from "@/components/blocks/workTable";
import React from "react";
import {cookies, headers} from "next/headers";
import {work} from "@/../prisma/generated/zod"
import {Error} from "@/components/atom/Error";


const SelectWorkPage   = async () => {
    const headersInstance = headers()
    const response = await fetch(`${process.env.NEXT_PUBLIC_VERCEL_URL}/api/works`
        ,{headers: { Cookie: cookies().getAll().map(({ name, value }) => `${name}=${value}`).join(";") }});
    if (!response.ok){
        const jsonResponse = await response.json()
        return (
            <Error status={response.status} statusText={response.statusText} message={jsonResponse.message}></Error>
        )
    }
    const works:work[] = await response.json();
    return (
        <>
            <Header>
                <div className="flex justify-between">
                    <Link href={"/"} className="text-3xl text-white ">Otomoji</Link>
                </div>
            </Header>
            <div className="font-medium text-gray-600 max-w-screen-xl mx-auto " >
                <WorkTable worksData={works}/>
            </div>
        </>

    );
};

export default SelectWorkPage;
