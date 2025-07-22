'use client';
import Loading from "@/shared/components/commons/loading/loading";
import useAuth from "../hooks/use-auth";
import LoginForm from "./login-form";

const LoginPage = () => {
    const {
        code,
        email,
        expired,
        verified,
        errorSso,
        typeForm,
        handleType,
    } = useAuth()

    const descriptionColor = expired === "true" || errorSso === "true"
    ? "text-red-500"
    : verified === "true"
      ? "text-green-500"
      : "text-gray-600 dark:text-gray-300"

    return(
        <div>
        {code ? (
            <Loading />
        ) : (
            <div className="max-w-md mx-auto w-full shadow-md border p-6 md:shadow-none md:border-none md:p-0 md:bg-transparent ">
                <h1 className="md:text-3xl text-2xl font-bold mb-2">{email ? "Add Your Identity" : typeForm.title}</h1>
                {email ? "" : <p className="text-gray-600 mb-2">Welcome back! Select method to log in.</p> }
                
                <p className={`mb-5 text-base ${descriptionColor}`}> {typeForm.description} </p>          
                {/* <LoginForm /> */}
                {email ? "Login SSO" : <LoginForm onTypeChange={handleType} />}
                    
            </div>
        )}
        </div>
    );
};

export default LoginPage;