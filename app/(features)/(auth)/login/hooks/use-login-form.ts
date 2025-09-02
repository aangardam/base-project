'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { toast } from '@/shared/hooks/use-toast';
import { useLogin } from './use-login';
import { useGoogleLogin, useGoogleOneTapLogin } from '@react-oauth/google';
import { AuthTypeForm } from '../interfaces/auth.interface';

export type TypeForm = {
  title: string;
  description?: string;
  type: string;
};

export function useLoginForm(onTypeChange: (type: TypeForm) => void) {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [recaptchaValue, setRecaptchaValue] = useState(false);
  const isEnabledRecapthca = process.env.NEXT_PUBLIC_ENABLE_CAPTCHA;

  useEffect(() => {
    if (isEnabledRecapthca === 'true') setRecaptchaValue(true);
  }, [isEnabledRecapthca]);

  const [typeForm, setTypeForm] = useState<TypeForm>({
    title: 'Login',
    description: 'Welcome back! Please sign in.',
    type: 'login',
  });

  const formSchema = z
    .object({
      email: token ? z.string().optional() : z.string().email(),
      password:
        typeForm.type === AuthTypeForm.LOGIN && !token
          ? z.string().refine((value) => !!value.trim(), {
              message: 'Password is required',
            })
          : z.string().optional(),
      new_password: token
        ? z
            .string()
            .regex(/[a-z]/, { message: 'Password must contain lowercase letters' })
            .regex(/[A-Z]/, { message: 'Password must contain uppercase letters' })
            .regex(/\d/, { message: 'Password must contain numbers' })
        : z.string().optional(),
      confirm_password: z.string().optional(),
      captcha:
        typeForm.type === AuthTypeForm.FORGOT_PASSWORD ||
        typeForm.type === AuthTypeForm.RESEND_VERIFICATION_EMAIL ||
        token ||
        process.env.NEXT_PUBLIC_ENABLE_CAPTCHA !== 'true'
          ? z.string().optional()
          : z.string().refine((value) => !!value?.trim(), {
              message: 'Captcha is required',
            }),
    })
    .refine((data) => (token ? data.new_password === data.confirm_password : true), {
      message: "Password confirmation doesn't match",
      path: ['confirm_password'],
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      captcha: '',
    },
  });

  const { mutateAsync: login, isPending: isLoginPending } = useLogin();
  
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    if (typeForm.type === AuthTypeForm.LOGIN && !token) {
      login(data);
    }
  };

  useGoogleOneTapLogin({
    onSuccess: (data) => {
      console.log(data);
    },
    auto_select: true,
  });

  const onGoogleLogin = useGoogleLogin({
    onSuccess: (data) => {
      console.log(data);
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Google login failed',
        variant: 'destructive',
      });
    },
  });

  const isLoginForm = typeForm.type === AuthTypeForm.LOGIN;

  const toggleFormType = () => {
    const newTypeForm = isLoginForm
      ? { title: 'Login with Single Sign On', type: 'sso' }
      : { title: 'Login', type: 'login' };

    setTypeForm(newTypeForm);
    onTypeChange(newTypeForm);
  };

  const handleForgotPassword = () => {
    const newTypeForm = {
      title: 'Forgot Password',
      description: `Don${"'"}t worry. Enter your registered email and we will send you temporary password to sign in.`,
      type: 'forgot_password',
    };
    setTypeForm(newTypeForm);
    onTypeChange(newTypeForm);
  };

  const handleResendVerificationEmail = () => {
    const newTypeForm = {
      title: 'Resend Verification Email',
      type: 'resend_verification_email',
      description: 'Enter your email address to receive a new verification email',
    };
    setTypeForm(newTypeForm);
    onTypeChange(newTypeForm);
  };

  const backToLogin = () => {
    const newTypeForm = {
      title: "Sign In to your account",
      type: "login",
      description: "Welcome back! Please sign in.",
    };
    setTypeForm(newTypeForm);
    onTypeChange(newTypeForm);
  };

  return {
    form,
    formSchema,
    recaptchaValue,
    setRecaptchaValue,
    isEnabledRecapthca,
    typeForm,
    isLoginForm,
    isLoginPending,
    onSubmit,
    onGoogleLogin,
    toggleFormType,
    handleForgotPassword,
    handleResendVerificationEmail,
    token,
    backToLogin,
  };
}
