import { Form, FormField, FormItem, FormMessage } from "@/shared/components/ui/form";
import FormInput from "@/shared/components/form/form-input";
import { Button } from "@/shared/components/ui/button";
// import { Separator } from "@/shared/components/ui/separator";
// import * as FaIcons from 'react-icons/fa';
import { useLoginForm } from "../hooks/use-login-form";
import { toast } from "@/shared/hooks/use-toast";
import ReCAPTCHA from "react-google-recaptcha";
import { DialogAction } from "@/shared/components/ui/dialog-action";



type PropTypes = {
  onTypeChange: (type: TypeForm) => void;
};

type TypeForm = {
  title: string;
  description?: string;
  type: string;
};

export default function FormLogin({ onTypeChange }: PropTypes) {
  const {
    form,
    recaptchaValue,
    setRecaptchaValue,
    typeForm,
    isLoginPending,
    onSubmit,
    // onGoogleLogin,
    handleForgotPassword,
    handleResendVerificationEmail,
    token,
    toggleFormType,
  } = useLoginForm(onTypeChange);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* <div className="flex justify-between gap-x-5">
            <Button
                className=" w-full"
                variant="secondary"
                type="button"
                onClick={() => onGoogleLogin()}
            >
                <FaIcons.FaGoogle className="mr-2" /> Google
            </Button>
            <Button
                className="w-full"
                variant="secondary"
                type="button"
                onClick={() =>
                (window.location.href = `${process.env.NEXT_PUBLIC_SSO_AUTH_URL}?client_id=${process.env.NEXT_PUBLIC_SSO_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_SSO_LOGOUT_REDIRECT_URI}&response_type=code&scope=openid&state=240321`)
                }
            >
                <FaIcons.FaKey className="mr-2" /> SSO
            </Button>
        </div>
        <div className="flex items-center w-full gap-2 my-2">
          <Separator className="flex-1 my-4" />
          <span className="text-sm text-gray-500 whitespace-nowrap">Or sign in with</span>
          <Separator className="flex-1 my-4" />
        </div> */}

        {/* Form Input Fields */}
        {!token ? (
          <>
            <FormInput name="email" label="Email" placeholder="@mail" control={form.control} />
            <FormInput
              name="password"
              label="Password"
              isPassword={true}
              token={token}
              type="password"
              placeholder="p4ssW0rD123_"
              control={form.control}
            />
          </>
        ) : (
          <>
            <FormInput
              name="new_password"
              label="New Password"
              isPassword={true}
              type="password"
              placeholder="p4ssW0rD123_"
              control={form.control}
            />
            <FormInput
              name="confirm_password"
              label="Confirm New Password"
              isPassword={true}
              type="password"
              placeholder="p4ssW0rD123_"
              control={form.control}
            />
          </>
        )}

        {/* ReCAPTCHA */}
        {!token && process.env.NEXT_PUBLIC_ENABLE_CAPTCHA === 'true' && (
            <FormField
                control={form.control}
                name="captcha"
                render={({ field }) => (
                    <FormItem>
                        <div className="flex justify-center w-full">
                        <ReCAPTCHA
                            hl="en"
                            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? ''}
                            onChange={(e) => {
                            field.onChange(e);
                            setRecaptchaValue(false);
                            }}
                            onExpired={() => (field.value = '')}
                            onError={() =>
                            toast({
                                title: 'Error',
                                description: 'Captcha error',
                                variant: 'destructive',
                            })
                            }
                        />
                        </div>
                        <FormMessage />
                    </FormItem>
                )}
            />
        )}

        {/* Submit Button */}
        <div className="flex flex-col gap-2">
            <Button
                type="submit"
                className="w-full bg-green-700 hover:bg-green-800"
                disabled={(recaptchaValue && typeForm.type !== 'forgot_password') || isLoginPending}
            >
                {typeForm.type === 'forgot_password' || typeForm.type === 'resend_verification_email'
                ? 'Send'
                : 'Login'}
            </Button>

            <DialogAction
                trigger={
                    <p
                      className="text-end text-sm text-gray-500 mt-2 cursor-pointer"
                      onClick={handleForgotPassword}
                    >
                      Forgot Password?
                    </p>
                }
                title={typeForm.title}
                description={typeForm.description}
                onOpenChange={(open) => {
                    if (!open) toggleFormType(); 
                }}
                footer={
                <Button 
                    type="button" 
                    className="w-full bg-blue-700 hover:bg-green-800"
                    onClick={form.handleSubmit(onSubmit)}
                >
                    Send Email
                </Button>
                }
            >
                <FormInput
                    isRequired={false}
                    name="email"
                    label="Email"
                    placeholder="@mail"
                    control={form.control}
                />
            </DialogAction>

            <div className="flex justify-center items-baseline mt-5">
              <span className="text-gray-500 text-sm">Don{"'"}t have an account? <b> Contact admin settler </b></span>
            </div>
            {/* Resend Verification */}
            <div className="flex justify-center items-baseline mt-2">
              
                <span className="text-gray-500 text-sm">Email verification not received?</span>
                <p
                onClick={handleResendVerificationEmail}
                className="text-sm font-bold cursor-pointer ml-1"
                >
                Resend
                </p>
            </div>
        </div>
      </form>
    </Form>
  );
}
