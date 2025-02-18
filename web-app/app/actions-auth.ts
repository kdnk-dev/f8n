"use server";

import { createClient } from "@/utils/supabase/supabaseClient-server";
import { KActionState, KFormData } from "@kdnk.dev/forms";
import { LoginFormT } from "@/components/login-form";
import { Database } from "@/utils/supabase/database";
import { SetPasswordFormT } from "@/components/set-password-form";
import { SignupFormT } from "@/components/signup-form";
import { ForgotPasswordFormT } from "@/components/forgot-password-form";
import { MagicLinkSignInFormT } from "@/components/magic-link-form";

const publicUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

export async function loginWithEmailPassword(
  loginFormData: KFormData<LoginFormT>,
): Promise<KActionState<LoginFormT>> {
  const supabase = createClient<Database>();

  const { error } = await supabase.auth.signInWithPassword({
    email: loginFormData.email,
    password: loginFormData.password,
  });

  if (error) {
    return {
      lastInvocationStatus: "error",
      error: {
        fieldErrors: {
          password: "Unknown user or incorrect password",
          email: "Unknown user or incorrect password",
        },
      },
    };
  } else {
    return {
      lastInvocationStatus: "success",
    };
  }
}

export async function loginWithMagicLink(
  loginFormData: KFormData<MagicLinkSignInFormT>,
): Promise<KActionState<MagicLinkSignInFormT>> {
  const client = createClient();
  const { error } = await client.auth.signInWithOtp({
    email: loginFormData.email,
    options: {
      shouldCreateUser: false,
      emailRedirectTo: `${publicUrl}/magic-link-callback`,
    },
  });

  return error === null
    ? { lastInvocationStatus: "success" }
    : {
        lastInvocationStatus: "error",
        error:
          error.code === "otp_disabled"
            ? {
                fieldErrors: {
                  email: "Unknown user",
                },
              }
            : { rootError: JSON.stringify(error) },
      };
}

export async function signupWithEmail(
  signupFormData: KFormData<SignupFormT>,
): Promise<KActionState<SignupFormT>> {
  if (signupFormData.password !== signupFormData.password_confirm) {
    return {
      lastInvocationStatus: "error",
      error: { fieldErrors: { password_confirm: "Passwords do not match" } },
    };
  }

  const supabase = createClient<Database>();

  const { error } = await supabase.auth.signUp({
    email: signupFormData.email,
    password: signupFormData.password,
    options: { emailRedirectTo: `${publicUrl}/signup-callback` },
  });

  if (error) {
    return {
      lastInvocationStatus: "error",
      error:
        error.code === "email_exists"
          ? {
              fieldErrors: { email: "Email already registered" },
            }
          : { rootError: `Signup failed: ${error.code}` },
    };
  } else {
    return {
      lastInvocationStatus: "success",
    };
  }
}

export async function signOut() {
  const supabase = createClient<Database>();
  return (await supabase.auth.signOut()).error === null;
}

export async function setPassword(
  formData: KFormData<SetPasswordFormT>,
): Promise<KActionState<SetPasswordFormT>> {
  if (formData.password != formData.password_confirm) {
    return {
      lastInvocationStatus: "error",
      error: { fieldErrors: { password_confirm: "Passwords do not match" } },
    };
  }

  const supabase = createClient();

  const updateResp = await supabase.auth.updateUser({
    password: formData.password,
  });

  if (updateResp.error) {
    return {
      lastInvocationStatus: "error",
      error:
        updateResp.error.code === "same_password"
          ? {
              fieldErrors: { password: "Must not re-use previous password." },
            }
          : { rootError: JSON.stringify(updateResp.error) },
    };
  } else {
    return { lastInvocationStatus: "success" };
  }
}

export async function forgotPassword(
  formData: KFormData<ForgotPasswordFormT>,
): Promise<KActionState<ForgotPasswordFormT>> {
  const client = createClient();

  const response = await client.auth.resetPasswordForEmail(formData.email, {
    redirectTo: `${publicUrl}/password-reset-callback`,
  });

  return response.error === null
    ? { lastInvocationStatus: "success" }
    : {
        lastInvocationStatus: "error",
        error: { rootError: JSON.stringify(response.error) },
      };
}
