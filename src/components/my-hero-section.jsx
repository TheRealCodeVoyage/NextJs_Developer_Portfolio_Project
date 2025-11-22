import { Card } from "./ui/card";
import Image from "next/image";
import { Roboto_Mono } from "next/font/google";

const robotoMono = Roboto_Mono({
    weight: ["400", "700"],
    subsets: ["latin"],
    variable: "--font-roboto-mono",
});

export default function MyHero() {
    return (
        <div className="flex min-h-auto w-full flex-col items-stretch justify-center gap-4 bg-stone-500 p-4 lg:flex-row lg:gap-6 lg:p-8">
            <Card className="flex w-full flex-col items-center justify-center p-8 text-center lg:flex-[2]">
                <Image
                    src="/cvwi.jpeg"
                    alt="Iman Anooshehpour"
                    width={150}
                    height={150}
                    className="mx-auto mb-4 rounded-full"
                />
                <h1 className="mb-4 text-4xl font-bold">Iman Anooshehpour</h1>
                <p className="mb-6 text-lg text-gray-600 dark:text-gray-300">
                    Software Developer, Instructor, Youtuber, and Tech Content Creator
                </p>
            </Card>
            <Card className="flex w-full flex-col justify-center p-8 text-center lg:flex-[5]">
                <h2 className={robotoMono.className}>Hello! I'm Iman (pronounced /i:man/), a name that embodies 'faith', a quality deeply rooted in my personal and professional life. My journey in tech is driven by a love for crafting seamless interfaces and delivering exceptional user experiences, bridging the gap between human-centered design and the technical prowess of Full-stack Engineering. Fascinated by the power of technology to transform ideas into tangible solutions, I thrive in blending aesthetics with functionality to create digital experiences that resonate with users.
                    Let me know your software needs/ideas/problems; I'll take care of both Front-end and Back-end.</h2>
            </Card>
            
        </div>
    );
}
