import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "El servidor no tiene configurada la API key de Resend." },
        { status: 500 }
      );
    }

    const { name, email, description } = await req.json();

    if (!name || !email || !description) {
      return NextResponse.json({ error: "Empty fields" }, { status: 400 });
    }

    const resend = new Resend(apiKey);

    const { data, error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: "albertosoutullootero@gmail.com",
      subject: `ALERT!!! MESSAGE OF ${name}`,
      text: `Name: ${name} \n Email: ${email} \n Description: ${description}`,
    });

    if (error) {
      return NextResponse.json(
        { error: error.message || "Error al enviar el correo" },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}