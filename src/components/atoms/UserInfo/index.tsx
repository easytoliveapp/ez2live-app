"use client";

import React from "react";
import { useSession } from "next-auth/react";

const UserInfo = () => {
  const { data: session } = useSession();

  return (
    <pre>
      <code>{JSON.stringify(session, null, 2)}</code>
    </pre>
  );
};

export default UserInfo;
