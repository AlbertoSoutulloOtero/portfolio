import { error } from "console";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req:Request) {

    try{
        const{name, email, description} = await req.json();

        if(!name || !email || !description){
            return NextResponse.json({error: 'Empty fields'}, {status: 400});
        }

        //resend launch a package with the 2 posibilities.
        const {data, error} = await resend.emails.send({
            from: 'Portfolio Contact <onboarding@resend.dev>',
            to: 'albertosoutullootero@gmail.com',
            subject: `ALERT!!! MESSAGE OF ${name}`,
            text: `Name: ${name} \n Email: ${email} \n Description: ${description}`,
        });

        if(error){
            return NextResponse.json({error}, {status: 400});
        }

        return NextResponse.json({sucess: true, data});
    }catch(error){
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }

}