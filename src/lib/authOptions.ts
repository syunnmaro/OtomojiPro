import {NextAuthOptions} from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import prisma from "@/lib/prisma";
import {ulid} from "ulid";

export const OPTIONS: NextAuthOptions = {

    session: {strategy: "jwt"},
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        }),
    ],
    callbacks: {
        //jwt作成時にCoockieに保存する内容を定義
        jwt: async ({token, user, account,trigger, profile}) => {


            if (user) {
                token.user = user;
                const result  = await prisma.user.findFirst({
                    where : {
                        google_id:user.id
                    },select:{
                        id:true
                    }
                })
                if (!result){
                    const result = await prisma.user.create({
                        data:{
                            id:ulid(),
                            google_id:user.id,
                            point:0,

                        }
                    })
                    token.id=result.id
                    token.GoogleId = user.id
                    return token;
                }
                token.id=result.id
                token.GoogleId = user.id
            }
            return token;
        },

        async session({ session, token, user }) {
            // @ts-ignore
            session.user.id = token.id
            // @ts-ignore
            session.user.googleId = token.GoogleId
            return session
        }
    }
}
