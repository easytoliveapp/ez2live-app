import React from "react";

const NewSection5 = () => {
  return (
    <div className="text-white flex flex-wrap gap-20 justify-between items-center container">
      <h2 className="text-2xl md:text-3xl font-bold">
        Veja como é fácil resgatar seu cupom preferido <br />
        <span className="text-primary-main">dentro da easy to live!</span>
      </h2>
      <div>
        <iframe
          allowFullScreen={false}
          width={360}
          height={280}
          src="https://www.youtube.com/embed/cpIILAED-Mo?si=akxyHHBUxmFuFBPi"
          title="YouTube video player"
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

export default NewSection5;
