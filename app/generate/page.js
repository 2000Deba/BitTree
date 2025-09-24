import { Suspense } from "react"
import GenerateClient from "./GenerateClient"

const Generate = () => {
  return (
    <Suspense fallback={<p className="text-center p-10">Loading...</p>}>
      <GenerateClient />
    </Suspense>
  )
}

export default Generate
