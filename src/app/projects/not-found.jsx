"use client"

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useParams } from 'next/navigation'


export default function NotFound() {
  const params = useParams();
  return (
    <div className='flex justify-center items-center bg-stone-500 min-h-[50vh]'>
      <Card className='font-mono flex flex-col gap-8 p-8 items-center'>
        <div className='text-4xl'>🚫404🚫</div>
        <p>{`Project ${params.slug} not found`}</p>
        <Button variant="outline" asChild>
          <Link href="/">
            Return Home
          </Link>
        </Button>
      </Card>
    </div>
  )
}