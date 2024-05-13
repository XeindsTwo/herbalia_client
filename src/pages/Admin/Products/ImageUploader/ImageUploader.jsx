import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './ImageUploader.module.scss';
import UploadIcon from '../../../../assets/images/icons/product/upload.svg?react';
import {ImageItem} from './ImageItem/ImageItem.jsx';

export const ImageUploader = ({className, maxImages, onUpload, formData, setFormData}) => {
  const [allSelectedFiles, setAllSelectedFiles] = useState([]);

  const isImageAllowed = (file) => {
    const allowedTypes = ['image/png', 'image/webp', 'image/jpeg', 'image/jpg'];
    return allowedTypes.includes(file.type);
  };

  const addImagePlaceholder = (files) => {
    const filesArray = Array.from(files);
    const remainingSlots = maxImages - allSelectedFiles.length;

    if (remainingSlots <= 0) {
      toast.error('Превышено максимальное количество изображений');
      return;
    }

    const filesToAdd = filesArray.slice(0, remainingSlots);

    filesToAdd.forEach((file) => {
      if (file.size > 2 * 1024 * 1024) {
        toast.error('Файл слишком большой, максимальный размер 2 МБ');
        return;
      }

      if (!isImageAllowed(file)) {
        toast.error(`Файл имеет недопустимый формат. Разрешен только PNG, JPG, JPEG и WEBP формат изображений`);
        setFormData(prevState => ({
          ...prevState,
          photos: prevState.photos.filter(photo => photo.name !== file.name)
        }));
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target.result;
        const newFile = {file, url: imageUrl};
        setAllSelectedFiles((prevFiles) => [...prevFiles, newFile]);
      };
      reader.readAsDataURL(file);
    });

    if (onUpload) {
      const uploadedFiles = filesToAdd.filter(isImageAllowed);
      onUpload(uploadedFiles);
    }
  };

  const removeImage = (index) => {
    setAllSelectedFiles((prevFiles) => {
      const updatedFiles = prevFiles.filter((_, i) => i !== index);
      const updatedPhotos = formData.photos.filter((_, i) => i !== index);
      setFormData(prevState => ({
        ...prevState,
        photos: updatedPhotos
      }));

      return updatedFiles;
    });
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
        style={{display: 'none'}}
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
            <ImageItem key={index} index={index} selectedFile={selectedFile} onRemove={() => removeImage(index)}/>
          ))}
        </ul>
      )}
    </div>
  );
};

ImageUploader.propTypes = {
  className: PropTypes.string,
  maxImages: PropTypes.number.isRequired,
  onUpload: PropTypes.func,
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
};