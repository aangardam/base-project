import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

type TypeForm = {
    title: string
    description?: string
    type: string
    message?: string
  }
  
const useAuth = () =>{
    const searchParams = useSearchParams()
    const code = searchParams.get("code")
    const email = searchParams.get("email")
    const expired = searchParams.get("sessionExpired")
    const verified = searchParams.get("emailVerified")
    const errorSso = searchParams.get("isErrorSso")
  
    const [typeForm, setTypeForm] = useState<TypeForm>({
      title: "Sign In to your account",
      type: "login",
      description: "Welcome back! Please sign in.",
    })
  
    const handleType = (type: TypeForm) => {
      setTypeForm(type)
    }
  
    // Setup description message jika ada parameter tertentu
    useEffect(() => {
      if (expired === "true") {
        setTypeForm({
          message: "Session Expired, please login again",
          title: "Login Settler Web App",
          type: "login",
        })
      } else if (verified === "true") {
        setTypeForm({
          message: "Email has been verified, please login",
          title: "Login Settler Web App",
          type: "login",
        })
      } else if (errorSso === "true") {
        setTypeForm({
          message: "Login SSO failed, please contact your administrator",
          title: "Login Settler Web App",
          type: "login",
        })
      }
    }, [errorSso, expired, verified])

    return {
        code,
        email,
        expired,
        verified,
        errorSso,
        typeForm,
        handleType,
    }
}

export default useAuth;