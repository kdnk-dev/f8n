import { createClient } from "@/utils/supabase/supabaseClient-server";
import { FeatureGateSrv, getToken } from "@kdnk.dev/f8n-utils";
import { AuthToken } from "@/utils/supabase/authorization";
import React from "react";

const getAuthTokenSrv = async () => {
  const supabase = createClient();
  return getToken<AuthToken>(await supabase.auth.getSession());
};

export const FeatureGateTokenSrv = (props: {
  predicates: ((ctx: AuthToken) => boolean)[];
  children: React.JSX.Element | React.JSX.Element[];
}) => FeatureGateSrv({ ...props, getContext: getAuthTokenSrv });
