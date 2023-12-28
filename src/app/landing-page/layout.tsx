import React from "react";

const LandingPageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div className="landing-page-layout__container">{children}</div>
    </div>
  );
};

export default LandingPageLayout;
