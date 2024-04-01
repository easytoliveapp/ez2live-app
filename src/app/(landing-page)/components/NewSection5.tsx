import React from "react";

const NewSection5 = () => {
  return (
    <div className="text-white flex flex-wrap gap-20 lg:grid lg:grid-cols-2 justify-between items-center container">
      <h2 className="text-2xl md:text-3xl font-bold">
        Veja como é fácil resgatar seu cupom preferido <br />
        <span className="text-primary-main">dentro da easy to live!</span>
      </h2>
      <iframe
        className="w-full h-full max-w-lg min-h-[300px] m-auto"
        allowFullScreen={false}
        allow="autoplay; encrypted-media"
        name="youtube embed EasyToLive"
        src="https://www.youtube.com/embed/cpIILAED-Mo?si=akxyHHBUxmFuFBPi?autoplay=1&mute=1"
        title="YouTube video player"
        loading="lazy"
      ></iframe>
    </div>
  );
};

export default NewSection5;
