"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { z } from "zod";
import {
  KdFormField,
  KdInputField,
  kdnkForm,
  KdnkFormTypes,
  KdSubmitButton,
  KRenderProps,
} from "@kdnk.dev/forms";
import { forgotPassword } from "@/app/actions-auth";

const { Form, Schema } = kdnkForm({
  email: z.string().email(),
});

export type ForgotPasswordFormT = KdnkFormTypes<typeof Schema>;

export default Form()
  .withSubmitAction(forgotPassword)
  .withChildComponent(FormContents);

function FormContents({
  actionLastInvocationStatus,
}: KRenderProps<ForgotPasswordFormT>) {
  return (
    <Card className="mx-auto p-6 w-3/4 max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-semibold text-2xl">
          Forgot Password
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {actionLastInvocationStatus === "success" ? (
          <div>Please check your email for next steps</div>
        ) : (
          <>
            <KdFormField
              name="email"
              label="Your Email Address"
              renderField={KdInputField("email", "me@email.com")}
            />
            <KdSubmitButton>Reset Password</KdSubmitButton>
          </>
        )}
      </CardContent>
    </Card>
  );
}
