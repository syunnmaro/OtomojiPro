import '@fortawesome/fontawesome-svg-core/styles.css'
import React from 'react';
import Editor from "@/components/blocks/editor";
import {block} from "@/../prisma/generated/zod";
import {Error} from "@/components/atom/Error";
import {cookies, headers} from "next/headers";

const Page= async ({params}: { params: { workId: string, partId: string } }) => {
    const headersInstance = headers()
    let response = await fetch(`${process.env.NEXT_PUBLIC_VERCEL_URL}/api/parts/${params.partId}/blocks`,{headers: { Cookie: cookies().getAll().map(({ name, value }) => `${name}=${value}`).join(";") }});
    if (!response.ok){
        const jsonResponse = await response.json()
        return (
            <Error status={response.status} statusText={response.statusText} message={jsonResponse.message}></Error>
        )
    }
    const blocksData:block[] = await response.json()

    return (
        <Editor blocksData={blocksData} partId={params.partId}/>
    )
};

export default Page;





