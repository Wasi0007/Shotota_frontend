'use client' 

import { useEffect } from 'react'
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])
 
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <h1 style={{ fontWeight: 'bold', fontSize: '4rem' }}>Something went wrong!</h1>
    </div>

  )
}