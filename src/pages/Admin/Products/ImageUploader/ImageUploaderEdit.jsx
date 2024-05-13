import React, {useEffect, useState} from 'react';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './ImageUploader.module.scss';
import UploadIcon from '../../../../assets/images/icons/product/upload.svg?react';
import {ImageItemEdit} from './ImageItem/ImageItemEdit.jsx';

export const ImageUploaderEdit = ({className, maxImages, onUpload, formData, setFormData}) => {
  const [allSelectedFiles, setAllSelectedFiles] = useState([]);

  useEffect(() => {
    if (formData.photos && formData.photos.length > 0 && allSelectedFiles.length !== formData.photos.length) {
      setAllSelectedFiles(formData.photos.map((photo, index) => ({
        name: `Картинка ${index + 1}.${photo.file ? photo.file.name.split('.').pop() : 'png'}`,
        url: photo.url || URL.createObjectURL(photo.file),
        file: photo.file
      })));
    }
  }, [formData.photos, allSelectedFiles.length]);

  useEffect(() => {
    const validFiles = allSelectedFiles.filter(file => isImageAllowed(file));
    if (validFiles.length > maxImages) {
      toast.error('Превышено максимальное количество изображений');
      setAllSelectedFiles(validFiles.slice(0, maxImages));
    }
  }, [allSelectedFiles, maxImages]);

  const isImageAllowed = (file) => {
    const allowedTypes = ['image/png', 'image/webp', 'image/jpeg', 'image/jpg'];
    return allowedTypes.includes(file.type);
  };

  const addImagePlaceholder = (files) => {
    const filesArray = Array.from(files);
    const validFiles = filesArray.filter(file => isImageAllowed(file));

    if (validFiles.length + allSelectedFiles.length > maxImages) {
      toast.error('Превышено максимальное количество изображений');
      return;
    }

    const updatedPhotos = validFiles.map(file => {
      if (file.size > 2 * 1024 * 1024) {
        toast.error('Файл слишком большой, максимальный размер 2 МБ');
        return null;
      }
      const blobFile = new Blob([file], { type: file.type });
      return { file: blobFile };
    }).filter(Boolean);

    setAllSelectedFiles(prevFiles => [...prevFiles, ...updatedPhotos]);

    if (onUpload) {
      onUpload(updatedPhotos);
    }

    setFormData(prevState => ({
      ...prevState,
      photos: [...prevState.photos, ...updatedPhotos]
    }));
  };

  useEffect(() => {
    return () => {
      allSelectedFiles.forEach(file => {
        if (file.url && typeof file.url === 'string') {
          URL.revokeObjectURL(file.url);
        }
      });
    };
  }, []);

  const removeImage = (index) => {
    setFormData(prevState => ({
      ...prevState,
      photos: prevState.photos.filter((_, i) => i !== index)
    }));
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
          {allSelectedFiles.map((file, index) => (
            <ImageItemEdit key={index} index={index} selectedFile={file} onRemove={() => removeImage(index)}/>
          ))}
        </ul>
      )}
    </div>
  );
};