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
import { setPassword } from "@/app/actions-auth";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const { Form, Schema } = kdnkForm({
  password: z.string().min(1),
  password_confirm: z.string().min(1),
});

export type SetPasswordFormT = KdnkFormTypes<typeof Schema>;

export default Form()
  .withSubmitAction(setPassword)
  .withChildComponent(FormContents);

function FormContents({
  actionLastInvocationStatus,
}: KRenderProps<SetPasswordFormT>) {
  return (
    <Card className="mx-auto p-6 w-3/4 max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-semibold text-2xl">
          Set Password
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {actionLastInvocationStatus === "success" ? (
          <div className="flex flex-col gap-4">
            <div>Success!</div>
            <Link href="/home">
              <Button className="w-20">Continue</Button>
            </Link>
          </div>
        ) : (
          <>
            <KdFormField
              name="password"
              label="New Password"
              renderField={KdInputField("password", "")}
            />
            <KdFormField
              name="password_confirm"
              label="Confirm New Password"
              renderField={KdInputField("password", "")}
            />
            <KdSubmitButton>Set Password</KdSubmitButton>
          </>
        )}
      </CardContent>
    </Card>
  );
}
