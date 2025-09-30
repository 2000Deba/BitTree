import { Suspense } from "react"
import ResetPasswordPage from "./ResetPasswordClient"

export default function ResetPasswordPage() {
    return (
        <Suspense fallback={<p className="text-center p-10">Loading reset password...</p>}>
            <ResetPasswordClient />
        </Suspense>
    )
}
