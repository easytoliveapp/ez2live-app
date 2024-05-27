import { ButtonBasic, FormItem } from "@/components";
import useUserRoles from "@/hooks/useUserRoles";
import { getAccountType } from "@/utils/getAccountType";
import isPremiumUser from "@/utils/isPremiumUser";
import isTrialUser from "@/utils/isTrialUser";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import React from "react";

interface AccountProps {
  session: Session | null;
}

export const AccountTab: React.FC<AccountProps> = ({ session }) => {
  return (
    <div className="relative h-max flex flex-col mx-auto gap-4 w-full max-w-md">
      {!useUserRoles().isCommonUser() && (
        <div className=" bg-primary-main mb-4 rounded-2xl px-4 py-1 mx-auto text-white font-semibold">
          {session?.user.role}
        </div>
      )}

      <FormItem label="Nome">
        <div className="ml-2 text-lg font-medium text-neutral-600">
          {session?.user?.name}
        </div>
      </FormItem>
      <FormItem label="Email">
        <div className="ml-2 text-lg font-medium text-neutral-600">
          {session?.user?.email}
        </div>
      </FormItem>
      <FormItem label="Premium">
        <div className="ml-2 text-lg font-medium text-neutral-600">
          {getAccountType(isPremiumUser(session), isTrialUser(session))}
        </div>
      </FormItem>

      <ButtonBasic onClick={() => signOut({ redirect: true })}>
        Desconectar
      </ButtonBasic>
    </div>
  );
};
