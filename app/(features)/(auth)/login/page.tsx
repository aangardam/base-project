"use client"
import { Button } from "@/shared/components/ui/button";
import { FaGoogle } from "react-icons/fa";
import FormLogin from "./components/form-login";

const LoginPage = () => {
  return(
    <div className="max-w-md mx-auto w-full mt-20">
      <div className="flex items-center gap-2 mb-10">
        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">S</div>
        <span className="text-lg">Base Project Web App</span>
      </div>

      <h1 className="text-3xl font-bold mb-2">Login</h1>
      <p className="mb-6">Welcome back! Select method to log in.</p>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-5">
        <Button
          variant="outline"
          className="w-full flex items-center justify-center"
          size="lg"
          type="button"
        >
          <FaGoogle className="mr-2" /> Google
        </Button>
      </div>

      <div className="flex item-center my-4">
        <div className="border-b flex-1 mr-4"></div>
        <span className="text-gray-500 text-sm">Or Sign in with</span>
        <div className="border-b flex-1 ml-4"></div>
      </div>

      <div>
        <FormLogin />
      </div>

    </div>
  );
};

export default LoginPage;