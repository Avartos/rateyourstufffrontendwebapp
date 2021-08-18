import classNames from "classnames";

/**
 * This component is used to preview an image.
 * @param {*} param0
 * @returns
 */
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
