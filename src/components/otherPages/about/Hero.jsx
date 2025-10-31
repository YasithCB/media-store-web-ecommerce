import React from "react";

export default function Hero() {
  return (
    <section className="tf-sp-2">
      <div className="container">

          <div className="box-title">
              <h3 className="fw-semibold">Welcome to MediaStore</h3>
              <p className="product-title mb-1">
                  Where creativity meets technology — shaping the future of digital media.
              </p>
          </div>
          <div className="box-text">
              At <strong>MediaStore</strong>, we specialize in delivering innovative digital solutions that
              blend cutting-edge design with smart technology. With over 15 years of experience,
              we empower brands, creators, and businesses to stand out in today’s fast-moving digital world.
              <br className="d-none d-xl-block" />
              From media production and marketing to custom software and web development —
              we bring your vision to life with precision, passion, and purpose.
          </div>

          <div
          className="parallaxie parallax-style mt-3"
          style={{ background: 'url("/images/section/parallax-3.jpg")', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}
        />
      </div>
    </section>
  );
}
