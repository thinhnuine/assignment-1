import React from "react";
import { Slide } from "react-slideshow-image";
import "./SlideImg.css";
import { Image } from "antd";

const proprietes = {
  duration: 5000,
  transitionDuration: 500,
  infinite: true,
  indicators: true,
  arrows: true,
};
const SlideImg = (data) => {
  const uniqueColors = new Set();
  const filteredVariants = data.productById.variants.filter((variant) => {
    const color = variant.color;
    if (!uniqueColors.has(color)) {
      uniqueColors.add(color);
      return true;
    }
    return false;
  });

  console.log(filteredVariants)

  return (
    <div className="containerSlide">
      <Slide {...proprietes}>
        {filteredVariants && filteredVariants.map((variants, index) => (
          <div key={index} className="each-slide">
            <div>
              <Image.PreviewGroup items={filteredVariants.image}>
                <Image src={variants.image} />
              </Image.PreviewGroup>
            </div>
          </div>
        ))}
      </Slide>
    </div>
  );
};

export default SlideImg;
