
import FormInput from "@/shared/components/form/form-input";
import useLogin from "../hooks/use-login"
import { Button } from "@/shared/components/ui/button";

import { Form } from "@/shared/components/ui/form";


const FormLogin = () => {
    const { 
        form,
        handleLogin,
        isLoginLoading,
    } = useLogin();
    
    return (
        <Form {...form}>
            <form 
                onSubmit={form.handleSubmit(handleLogin)}
                className="space-y-8"
            >
                <FormInput 
                    name="email" 
                    label="Email"
                    placeholder="@mail" 
                    control={form.control}
                />
                <FormInput 
                    name="password" 
                    label="Password"
                    isPassword={true} 
                    // token={token} 
                    // handleForgotPassword={handleForgotPassword} 
                    type="password"
                    placeholder="p4ssW0rD123_" 
                    control={form.control}
                />
                <div className="flex flex-col">
                    <Button
                        type="submit"
                        className="w-full bg-green-700 hover:bg-green-800"
                        isLoading={isLoginLoading}
                    >
                        {isLoginLoading ? "Loading..." : "Login"}
                    </Button>
                </div>
            </form>
        </Form>
    )
}

export default FormLogin;