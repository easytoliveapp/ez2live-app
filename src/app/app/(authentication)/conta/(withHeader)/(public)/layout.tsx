import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  const PublicRoutesRedirect = async () => {
    const session = await getServerSession(authOptions);

    if (session) {
      return redirect("/app");
    }
  };

  await PublicRoutesRedirect();

  return (
    <div className="auth-layout">
      <div className="auth-layout__container">{children}</div>
    </div>
  );
};

export default AuthLayout;
