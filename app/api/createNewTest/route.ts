import type { NextApiRequest, NextApiResponse } from 'next'

import {Prisma, PrismaClient} from "@prisma/client"
import { getCookies, getCookie, setCookies, removeCookies } from 'cookies-next';
import { cookies } from 'next/headers'
import * as bcrypt from "bcrypt";
import * as jsonwebtoken from "jsonwebtoken"
import { NextResponse } from 'next/server';
import { Cookies } from 'react-cookie';
import uniqid from "uniqid";

type accountData = {
    userId: string
}

const prisma = new PrismaClient()

export async function GET(request: Request){

    const newTestToken = await uniqid.process() as string

    const leftPitch = (Math.floor(Math.random()*4) * 0.25) + 0.5; 
    const rightPitch = (Math.floor(Math.random()*4) * 0.25) + 0.5; 


    const test = await prisma.test.create
    ({
        data: {
            codeId: newTestToken,
            right: rightPitch,
            left: leftPitch
        },
    });

   
    try
    {
        
        cookies().set(
            {
                name: "currentTest",
                value:JSON.stringify({
                    codeId: newTestToken,
                    right: rightPitch,
                    left: leftPitch
                }) ,
                path:"/",
                maxAge:20000
            }
        )

        return NextResponse.json({"fail":false,right: rightPitch,
        left: leftPitch}); 
    }
    catch(e)
    {
        console.log(e)
        return NextResponse.json({"fail":true, msg: "something went wrong"}); 
    }
}