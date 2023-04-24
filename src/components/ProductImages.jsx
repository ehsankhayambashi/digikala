import React, { useState } from "react";
import { Box, IconButton, MobileStepper } from "@mui/material";
import { MdArrowForwardIos, MdArrowBackIos } from "react-icons/md";

function ProductImages({ mainImage, images: otherImages }) {
  const [imgSelectedId, setImgSelectedId] = useState(0);
  let allImages = [...otherImages];
  allImages.push(mainImage);
  const [images, setImages] = useState(allImages.reverse());
  const [buttonState, setButtonState] = useState({ aghab: true, jolo: true });

  // swipe detection
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const minSwipeDistance = 10;
  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };
  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
      handleJolo();
    }
    if (isRightSwipe) {
      handleAghab();
    }
  };
  // swipe detection

  const handleImgSelect = (index) => {
    setImgSelectedId(index);
    if (index > 0 && index < images.length - 1) {
      setButtonState({ aghab: true, jolo: true });
    }
  };

  const handleJolo = () => {
    let imgId = imgSelectedId;
    // const titleElement = document.getElementById(imgId);
    // titleElement.scrollIntoView({ behavior: "smooth" });
    if (imgId > 0) {
      imgId = imgId - 1;
      setImgSelectedId(imgId);
    }

    if (imgId === 0) {
      setButtonState((prevState) => {
        return {
          ...prevState,
          jolo: false,
        };
      });
    }

    setButtonState((prevState) => {
      return {
        ...prevState,
        aghab: true,
      };
    });
  };
  const handleAghab = () => {
    let imgId = imgSelectedId;
    // const titleElement = document.getElementById(imgId);
    // titleElement.scrollIntoView({ behavior: "smooth" });
    if (imgId < images.length - 1) {
      imgId = imgId + 1;
      setImgSelectedId(imgId);
    }

    if (images.length - 1 === imgId) {
      setButtonState((prevState) => {
        return {
          ...prevState,
          aghab: false,
        };
      });
    }

    setButtonState((prevState) => {
      return {
        ...prevState,
        jolo: true,
      };
    });
  };

  const nextButton = () => {
    return (
      <IconButton
        sx={{
          height: "fit-content",
          display: { xs: "none", sm: "flex" },
        }}
        aria-label="next"
        disabled={buttonState.jolo ? false : true}
        onClick={handleJolo}
      >
        <MdArrowForwardIos />
      </IconButton>
    );
  };

  const backButton = () => {
    return (
      <IconButton
        sx={{
          height: "fit-content",
          display: { xs: "none", sm: "flex" },
        }}
        disabled={buttonState.aghab ? false : true}
        aria-label="next"
        onClick={handleAghab}
      >
        <MdArrowBackIos />
      </IconButton>
    );
  };

  return (
    <Box display="flex" flexDirection="column">
      <Box display="flex" justifyContent="space-around" alignItems="center">
        {nextButton()}
        <Box
          sx={{ width: { xs: "100%", sm: "80%" } }}
          component="img"
          draggable={false}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          src={images[imgSelectedId]}
          alt="akse asli"
        />
        {backButton()}
      </Box>
      <Box
        sx={{
          width: "100%",
          overflowX: "auto",
          overflowY: "hidden",
          display: { xs: "none", md: "flex" },
          whiteSpace: "nowrap",
        }}
      >
        {images.map((image, index) => (
          <Box
            sx={{
              minWidth: "20%",
              border: "1px solid",
              borderColor: index === imgSelectedId ? "red" : "grey.300",
            }}
            id={index}
            borderRadius={1}
            m={0.5}
            p={0.25}
            key={index}
            onClick={() => handleImgSelect(index)}
          >
            <img width="100%" src={image} alt="" />
          </Box>
        ))}
      </Box>
      <Box display="flex" justifyContent="center">
        <MobileStepper
          variant="dots"
          steps={images.length}
          position="static"
          activeStep={imgSelectedId}
          sx={{
            maxWidth: 400,
            flexGrow: 1,
            display: { xs: "flex", md: "none" },
            justifyContent: "center",
          }}
        />
      </Box>
    </Box>
  );
}

export default ProductImages;
