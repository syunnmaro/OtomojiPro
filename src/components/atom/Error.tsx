import React from "react";

export const Error = ({status,statusText,message}:{status:number,statusText:string,message:string}) => {
    return (
        <div role="alert">
            <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                {status +" "+statusText}
            </div>
            <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                <p>{message}</p>
                <p>Contact us </p>
            </div>
        </div>
    );
};