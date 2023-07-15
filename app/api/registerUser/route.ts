import type { NextApiRequest, NextApiResponse } from 'next'

import {Prisma, PrismaClient} from "@prisma/client"
import { getCookies, getCookie, setCookies, removeCookies } from 'cookies-next';
import { cookies } from 'next/headers'
import * as bcrypt from "bcrypt";
import * as jsonwebtoken from "jsonwebtoken"
import { NextResponse } from 'next/server';

import uniqid from "uniqid";

type accountData = {
    name: string,
    userId: string
}

const prisma = new PrismaClient()

export async function POST(request: Request){

    const {name,userId}: Partial<accountData> = await request.json();

    if(!name || !userId)
    {
        
        return NextResponse.json({"fail":true, msg:"Missing Data"}); 
    }
    const user = await prisma.user.findUnique
    ({
        where: {
            loginCode: userId
        },
    });

    if(user)
    {
        return NextResponse.json({"fail":true, msg:"You need a unique userId"}); 
    }

    try
    {
        const newUser = await prisma.user.create
        ({
            data: {
              name:name,
              loginCode:userId
    
            },
        })
        //login them in normally 

        const token = jsonwebtoken.sign({username:name!,userId:userId},process.env.TOKEN_SECRET!);
        
        cookies().set(
            {
                name: "username",
                value: token,
                path:"/",
                maxAge:300000
            }
        )

        return NextResponse.json({"fail":false}); 
    }
    catch(e)
    {
        console.log(e)
        return NextResponse.json({"fail":true, msg: "something went wrong"}); 
    }
}