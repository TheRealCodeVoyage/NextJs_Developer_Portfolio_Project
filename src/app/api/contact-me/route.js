import { Resend } from 'resend';
import { NextResponse } from "next/server"
import { z } from "zod"

export const MessageFormSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Enter a valid email"),
    message: z.string().min(1, "Message cannot be empty"),
})

const methodNotAllowed = (method) =>
    NextResponse.json(
        { message: `${method} is not allowed. Use POST.` },
        { status: 405, headers: { Allow: "POST" } },
    )

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
    const formData = await request.formData()
    const values = Object.fromEntries(formData)

    const parsed = MessageFormSchema.safeParse(values)
    if (!parsed.success) {
        return NextResponse.json(
            {
                message: "Invalid input",
                errors: parsed.error.flatten().fieldErrors,
            },
            { status: 422 }
        )
    }

    const { name, email, message } = parsed.data


    const { data, error } = await resend.emails.send({
        from: `nulljuju.dev@resend.dev`,
        to: 'nulljuju.dev@gmail.com',
        bcc: `${email}`,
        subject: `Message from ${name} via Contact Form`,
        html: `${email} \n ${message}`
    });

    const respose_message = error ? `Failed to send email: ${error.message}` : 'Email sent successfully';

    console.log(respose_message, data);

    return Response.json({ message: `${respose_message}` }, { status: error ? 510 : 200 });
}



export const GET = () => methodNotAllowed("GET")
export const PUT = () => methodNotAllowed("PUT")
export const PATCH = () => methodNotAllowed("PATCH")
export const DELETE = () => methodNotAllowed("DELETE")
export const HEAD = () => methodNotAllowed("HEAD")
