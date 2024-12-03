"use client";

import React, { PropsWithChildren } from "react";
import { AuthToken } from "@/utils/supabase/authorization";
import {
  FeatureGateCtx,
  FeatureGateCtxProvider,
  getToken,
} from "@kdnk.dev/f8n-utils";
import { createClient } from "@/utils/supabase/supabaseClient-browser";
import {Database} from "@/utils/supabase/database";
import { Session, AuthError } from "@supabase/auth-js";

type GetSessionResponse =
    { data: { session: Session; }; error: null; } | { data: { session: null; }; error: AuthError; } | { data: { session: null; }; error: null; }

const authTokenContext: React.Context<AuthToken | null> =
    React.createContext<AuthToken | null>(null);

const authTokenProvider = (setContextFn: (token: AuthToken) => void) => {
    createClient<Database>()
        .auth.getSession()
        .then((value:GetSessionResponse) => getToken<AuthToken>(value))
    .then(setContextFn);
};

export const FeatureGateTokenCtxProvider = (props: PropsWithChildren<{}>) => {
  return FeatureGateCtxProvider({
    reactContext: authTokenContext,
    contextProvider: authTokenProvider,
    children: props.children,
  });
};

export const FeatureGateTokenCtx = (props: {
  predicates: ((ctx: AuthToken | null) => boolean)[];
  children: React.JSX.Element | React.JSX.Element[];
}) =>
  FeatureGateCtx<AuthToken | null>({
    context: authTokenContext,
    predicates: props.predicates,
    children: props.children,
  });
