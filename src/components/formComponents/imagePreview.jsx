import classNames from "classnames";

const ImagePreview = ({ currentImage }) => {
  const imageClassNames = classNames({
    imageWrapper: true,
    isLoaded: currentImage,
  });

  return (
    <div className={imageClassNames}>
      <img className="previewImage" src={currentImage} alt="Vorschau" />
    </div>
  );
};

export default ImagePreview;
