import React from 'react';
import PropTypes from 'prop-types';
import styles from './ImageItem.module.scss';
import DeleteIcon from '../../../../../assets/images/icons/product/test.svg?react';

export const ImageItem = ({ selectedFile, index, onRemove }) => (
  <li className={styles.item}>
    <div className={styles.info}>
      <span>Картинка {index + 1}.{selectedFile.file.name.split('.').pop()}</span>
      <button className={styles.remove} type="button" onClick={onRemove}>
        <DeleteIcon />
      </button>
    </div>
    <img className={styles.preview} src={selectedFile.url} alt={selectedFile.file.name} height={400} />
  </li>
);

ImageItem.propTypes = {
  selectedFile: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  onRemove: PropTypes.func.isRequired,
};