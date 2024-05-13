import React from 'react';
import PropTypes from 'prop-types';
import styles from './ImageItem.module.scss';
import DeleteIcon from '../../../../../assets/images/icons/product/test.svg?react';

export const ImageItemEdit = ({selectedFile, index, onRemove}) => (
  <li className={styles.item}>
    <div className={styles.info}>
      <span>Картинка {index + 1}.{selectedFile.file ? selectedFile.file.name.split('.').pop() : 'Нет имени'}</span>
      <button className={styles.remove} type="button" onClick={onRemove}>
        <DeleteIcon/>
      </button>
    </div>
    {selectedFile.url && (
      <img className={styles.preview} src={selectedFile.url} alt={selectedFile.file?.name || 'Image'} height={400}/>
    )}
    {!selectedFile.url && (
      <div className={styles.placeholder}>Изображение не загружено</div>
    )}
  </li>
);

ImageItemEdit.propTypes = {
  selectedFile: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  onRemove: PropTypes.func.isRequired,
};