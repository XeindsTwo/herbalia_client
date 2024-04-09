import React, {useEffect, useState} from "react";
import styles from './PersonalInfo.module.scss';
import {NameEditModal} from "../Modals/NameEditModal.jsx";
import {EmailEditModal} from "../Modals/EmailEditModal.jsx";
import {Loader} from "./Loader.jsx";

export const PersonalInfo = ({userData, onNameUpdate, onEmailUpdate, loading}) => {
  const [isNameModalOpen, setIsNameModalOpen] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [editedName, setEditedName] = useState('');
  const [editedEmail, setEditedEmail] = useState('');

  useEffect(() => {
    if (userData) {
      setEditedName(userData.name);
      setEditedEmail(userData.email);
    }
  }, [userData]);

  const handleEditNameClick = () => {
    setIsNameModalOpen(true);
    document.body.classList.add('body--active');
  };

  const closeNameModal = () => {
    setIsNameModalOpen(false);
    document.body.classList.remove('body--active');
  };

  const handleEditEmailClick = () => {
    setIsEmailModalOpen(true);
    document.body.classList.add('body--active');
  };

  const closeEmailModal = () => {
    setIsEmailModalOpen(false);
    document.body.classList.remove('body--active');
  };

  return (
    <>
      {loading ? (
        <Loader/>
      ) : (
        <>
          <ul className={styles.list}>
            <li className={styles.item}>
              <span className={styles.label}>Имя</span>
              <div className={styles.field}>
                <span className={styles.input}>{userData && userData.name}</span>
                <button className={styles.edit} onClick={handleEditNameClick}>Изм.</button>
              </div>
            </li>
            <li className={styles.item}>
              <span className={styles.label}>Электронная почта</span>
              <div className={styles.field}>
                <span className={styles.input}>{userData && userData.email}</span>
                <button className={styles.edit} onClick={handleEditEmailClick}>Изм.</button>
              </div>
            </li>
            <li className={styles.item}>
              <span className={styles.label}>Логин</span>
              <div className={styles.field}>
                <span className={styles.input}>{userData && userData.login}</span>
              </div>
            </li>
          </ul>
          <NameEditModal
            isModalOpen={isNameModalOpen}
            closeModal={closeNameModal}
            initialName={editedName}
            onNameUpdate={onNameUpdate}
          />
          <EmailEditModal
            isModalOpen={isEmailModalOpen}
            closeModal={closeEmailModal}
            initialEmail={editedEmail}
            onEmailUpdate={onEmailUpdate}
          />
        </>
      )}
    </>
  )
}