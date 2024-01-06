import Head from "next/head";
import React from "react";

const LandingPageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Head>
        <title>EasyToLive - Os melhores descontos da internet</title>
      </Head>
      <div>
        <div className="landing-page-layout__container">{children}</div>
      </div>
    </>
  );
};

export default LandingPageLayout;
