import {useState} from 'react';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './ImageUploader.module.scss';
import UploadIcon from '../../../../assets/images/icons/product/upload.svg?react';
import {ImageItem} from "./ImageItem/ImageItem.jsx";

export const ImageUploader = ({className, maxImages, onUpload}) => {
  const [imageCount, setImageCount] = useState(0);
  const [allSelectedFiles, setAllSelectedFiles] = useState([]);
  const [filesUploaded, setFilesUploaded] = useState(false);

  const isImageAllowed = (file) => {
    const allowedTypes = ["image/png", "image/webp", "image/jpeg", "image/jpg"];
    return allowedTypes.includes(file.type);
  };

  const addImagePlaceholder = (files) => {
    const filesArray = Array.from(files);
    let newFiles = [...allSelectedFiles];
    const remainingSlots = maxImages - imageCount;

    if (remainingSlots <= 0) {
      toast.error('Превышено максимальное количество изображений');
      return;
    }

    const filesToAdd = filesArray.slice(0, remainingSlots);

    filesToAdd.forEach((file) => {
      if (!isImageAllowed(file)) {
        toast.error('Файл имеет недопустимый формат. Разрешен только JPG, JPEG, PNG, WEBP формат');
        return;
      }

      if (file.size > 2 * 1024 * 1024) {
        toast.error('Файл слишком большой, максимальный размер 2 МБ');
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target.result;
        setImageCount((prevCount) => prevCount + 1);
        newFiles.push({file, url: imageUrl});
        console.log('New files array:', newFiles);
        if (newFiles.length === filesToAdd.length) {
          newFiles = newFiles.filter((fileObj) => isImageAllowed(fileObj.file));
          setAllSelectedFiles(newFiles);
          setFilesUploaded(true);
          onUpload(newFiles.map((fileObj) => fileObj.file));
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index) => {
    let newFiles = [...allSelectedFiles];
    newFiles.splice(index, 1);
    setAllSelectedFiles(newFiles);
    setImageCount((prevCount) => prevCount - 1);
    setFilesUploaded(newFiles.length > 0);
    onUpload(newFiles.map((fileObj) => fileObj.file));
  };

  return (
    <div className={className}>
      <label className="label" htmlFor="fileInput">
        Фотографии товара:
      </label>
      <input
        type="file"
        id="fileInput"
        multiple
        style={{display: "none"}}
        accept="image/png, image/webp, image/jpeg, image/jpg"
        onChange={(e) => addImagePlaceholder(e.target.files)}
      />
      <label className={styles.upload} htmlFor="fileInput">
        <UploadIcon/>
        Загрузить
      </label>
      {allSelectedFiles.length > 0 && (
        <ul className={styles.items}>
          {allSelectedFiles.map((selectedFile, index) => (
            <ImageItem
              key={index}
              selectedFile={selectedFile}
              index={index}
              onRemove={removeImage}
            />
          ))}
        </ul>
      )}
    </div>
  );
};