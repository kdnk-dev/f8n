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
import { loginWithMagicLink } from "@/app/actions-auth";

const { Form, Schema } = kdnkForm({
  email: z.string().email(),
});

export type MagicLinkSignInFormT = KdnkFormTypes<typeof Schema>;

export default Form()
  .withSubmitAction(loginWithMagicLink)
  .withChildComponent(FormContents);

function FormContents({
  actionLastInvocationStatus,
}: KRenderProps<MagicLinkSignInFormT>) {
  return (
    <Card className="mx-auto p-6 w-3/4 max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-semibold text-2xl">
          Sign in with Magic Link
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
              render={KdInputField("email", "me@email.com")}
            />
            <KdSubmitButton>Get Magic Link</KdSubmitButton>
          </>
        )}
      </CardContent>
    </Card>
  );
}
