import React from "react";

export default function BrandsSlider({ fullWidth = false, typeClass = "" }) {
  return (
    <div className="themesFlat">
      <div className={!fullWidth ? "container" : ""}>
        <div className="line-bt line-tp">
          <div className="infiniteslide_wrap" style={{ overflow: "hidden" }}>
            <div
              className={`infiniteslide tf-brand ${typeClass}`}
              style={{
                display: "flex",
                flexFlow: "row",
                alignItems: "center",
                animation:
                  "16s linear 0s infinite normal none running infiniteslider",
              }}
            >
              <div
                className="brand-item"
                style={{ flex: "0 0 auto", display: "block" }}
              >
                <img
                  alt="brand"
                  src="/images/brand/amazon.png"
                  width={159}
                  height={100}
                />
              </div>
              <div
                className="brand-item"
                style={{ flex: "0 0 auto", display: "block" }}
              >
                <img
                  alt="brand"
                  src="/images/brand/canon.png"
                  width={159}
                  height={100}
                />
              </div>
              <div
                className="brand-item"
                style={{ flex: "0 0 auto", display: "block" }}
              >
                <img
                  alt="brand"
                  src="/images/brand/fujifilm.png"
                  width={159}
                  height={100}
                />
              </div>
              <div
                className="brand-item"
                style={{ flex: "0 0 auto", display: "block" }}
              >
                <img
                  alt="brand"
                  src="/images/brand/google.png"
                  width={159}
                  height={100}
                />
              </div>
              <div
                className="brand-item"
                style={{ flex: "0 0 auto", display: "block" }}
              >
                <img
                  alt="brand"
                  src="/images/brand/ibm.png"
                  width={159}
                  height={100}
                />
              </div>
              <div
                className="brand-item"
                style={{ flex: "0 0 auto", display: "block" }}
              >
                <img
                  alt="brand"
                  src="/images/brand/intel.png"
                  width={159}
                  height={100}
                />
              </div>
              <div
                className="brand-item"
                style={{ flex: "0 0 auto", display: "block" }}
              >
                <img
                  alt="brand"
                  src="/images/brand/microsoft.png"
                  width={159}
                  height={100}
                />
              </div>
              <div
                className="brand-item"
                style={{ flex: "0 0 auto", display: "block" }}
              >
                <img
                  alt="brand"
                  src="/images/brand/netflix.png"
                  width={159}
                  height={100}
                />
              </div>
              <div
                className="brand-item infiniteslide_clone"
                style={{ flex: "0 0 auto", display: "block" }}
              >
                <img
                  alt="brand"
                  src="/images/brand/nikon.png"
                  width={159}
                  height={100}
                />
              </div>
              <div
                className="brand-item infiniteslide_clone"
                style={{ flex: "0 0 auto", display: "block" }}
              >
                <img
                  alt="brand"
                  src="/images/brand/panasonic.png"
                  width={159}
                  height={100}
                />
              </div>
              <div
                className="brand-item infiniteslide_clone"
                style={{ flex: "0 0 auto", display: "block" }}
              >
                <img
                  alt="brand"
                  src="/images/brand/sony.png"
                  width={159}
                  height={100}
                />
              </div>
              <div
                className="brand-item infiniteslide_clone"
                style={{ flex: "0 0 auto", display: "block" }}
              >
                <img
                  alt="brand"
                  src="/images/brand/starbucks.png"
                  width={159}
                  height={100}
                />
              </div>
              <div
                className="brand-item infiniteslide_clone"
                style={{ flex: "0 0 auto", display: "block" }}
              >
                <img
                  alt="brand"
                  src="/images/brand/walmart.png"
                  width={159}
                  height={100}
                />
              </div>
              <div
                className="brand-item infiniteslide_clone"
                style={{ flex: "0 0 auto", display: "block" }}
              >
                <img
                  alt="brand"
                  src="/images/brand/orient.png"
                  width={159}
                  height={100}
                />
              </div>
              <div
                className="brand-item infiniteslide_clone"
                style={{ flex: "0 0 auto", display: "block" }}
              >
                <img
                  alt="brand"
                  src="/images/brand/shure.svg"
                  width={159}
                  height={100}
                />
              </div>
              <div
                className="brand-item infiniteslide_clone"
                style={{ flex: "0 0 auto", display: "block" }}
              >
                <img
                  alt="brand"
                  src="/images/brand/rode.png"
                  width={159}
                  height={100}
                />
              </div>
              <div
                className="brand-item infiniteslide_clone"
                style={{ flex: "0 0 auto", display: "block" }}
              >
                <img
                  alt="brand"
                  src="/images/brand/olympus.png"
                  width={159}
                  height={100}
                />
              </div>
              <div
                className="brand-item infiniteslide_clone"
                style={{ flex: "0 0 auto", display: "block" }}
              >
                <img
                  alt="brand"
                  src="/images/brand/kodak.png"
                  width={159}
                  height={100}
                />
              </div>
              <div
                className="brand-item infiniteslide_clone"
                style={{ flex: "0 0 auto", display: "block" }}
              >
                <img
                  alt="brand"
                  src="/images/brand/akg.svg"
                  width={159}
                  height={100}
                />
              </div>
              <div
                className="brand-item infiniteslide_clone"
                style={{ flex: "0 0 auto", display: "block" }}
              >
                <img
                  alt="brand"
                  src="/images/brand/samsung.png"
                  width={159}
                  height={100}
                />
              </div>
              <div
                className="brand-item infiniteslide_clone"
                style={{ flex: "0 0 auto", display: "block" }}
              >
                <img
                  alt="brand"
                  src="/images/brand/philips.png"
                  width={159}
                  height={100}
                />
              </div>
              <div
                className="brand-item infiniteslide_clone"
                style={{ flex: "0 0 auto", display: "block" }}
              >
                <img
                  alt="brand"
                  src="/images/brand/sigma.svg"
                  width={159}
                  height={100}
                />
              </div>
              <div
                className="brand-item infiniteslide_clone"
                style={{ flex: "0 0 auto", display: "block" }}
              >
                <img
                  alt="brand"
                  src="/images/brand/rode.png"
                  width={159}
                  height={100}
                />
              </div>
              <div
                className="brand-item infiniteslide_clone"
                style={{ flex: "0 0 auto", display: "block" }}
              >
                <img
                  alt="brand"
                  src="/images/brand/casio.png"
                  width={159}
                  height={100}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
