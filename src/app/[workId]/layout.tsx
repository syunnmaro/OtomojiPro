import '@fortawesome/fontawesome-svg-core/styles.css'
import {UserDropdown} from "@/components/atom/PartAndWorkDropdown";
import React from "react";
import PartList from "@/components/atom/partList";
import SidebarWork from "@/components/atom/SidebarWork";
import {EditorHeader} from "@/components/atom/Header";
import {part, work} from "@/../prisma/generated/zod";
import {cookies, headers} from "next/headers";
import {Error} from "@/components/atom/Error";
import {getServerSession} from "next-auth/next";

export default async function DashboardLayout({children,params}: { children: React.ReactNode, params: { workId: string} }) {
    let response = await fetch(`${process.env.NEXT_PUBLIC_VERCEL_URL}/api/works/${params.workId}/parts`,{headers: { Cookie: cookies().getAll().map(({ name, value }) => `${name}=${value}`).join(";") }});
    if (!response.ok){
        const jsonResponse = await response.json()
        return (
            <Error status={response.status} statusText={response.statusText} message={jsonResponse.message}></Error>
        )
    }
    const parts:part[] = await response.json()
    response = await fetch(`${process.env.NEXT_PUBLIC_VERCEL_URL}/api/works/${params.workId}`, {headers: { Cookie: cookies().getAll().map(({ name, value }) => `${name}=${value}`).join(";") }});
    if (!response.ok){
        const jsonResponse = await response.json()
        return (
            <Error status={response.status} statusText={response.statusText} message={jsonResponse.message}></Error>
        )
    }
    const work:work = await response.json()
    const session = await getServerSession();
    if (!session){
        return (
            <Error status={401} statusText={"Unauthorized"} message={"You are not authorized to access this page"}></Error>
        )
    }
    return (

        <div className="h-screen">

            <header >
                <EditorHeader workId={work.id}/>
            </header>

            <div className="text-gray-600 font-medium text-2xl  flex bg-gray-50 h-full">

                <div className="flex">
                    <aside className={`w-80 bg-white border-r h-auto font-medium text-gray-600P`}>
                        <div className="p-5 bg-white  rtl:border-r-0 rtl:border-l ">
                            <nav >
                                <SidebarWork work={work}></SidebarWork>

                                <p className="border-b pt-5 "></p>
                                <PartList partsData={parts} workId={params.workId} ></PartList>
                            </nav>
                        </div>
                        <div className="mt-auto">
                            <UserDropdown userIconURL={session.user.image}/>
                        </div>
                    </aside>
                </div>
                {children}

            </div>
        </div>


    )
}