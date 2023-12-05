"use client";

import {signIn, signOut} from "next-auth/react";
import Link from "next/link";

// ログインボタン
export const LoginButton = () => {
    return (
        <button className="btn btn-lg btn-accent leading-2 flex flex-col items-center py-2 px-6 md:px-20 normal-case shadow-xl" onClick={() => signIn("google",{callbackUrl:"http://localhost:3000/works"})}>
            Sign in
        </button>
    );
};

// ログアウトボタン
export const LogoutButton = () => {
    return (
        <button style={{marginRight: 10}} onClick={() => signOut()}>
            Sign Out
        </button>
    );
};

export const WorksButton = () => {
    return (
        <div className="bg-teal-500 hover:bg-emerald-700 text-white font-bold py-2 px-6 rounded btn-lg md:px-20 text-2xl">
            <Link href="/works">エディターに行く</Link>

        </div>
    );
};