import {useEffect} from 'react';

export const useModalClose = (isOpen, setIsOpen) => {
  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleEscapeKey = (e) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('body--active');
      document.addEventListener('keydown', handleEscapeKey);
    } else {
      document.body.classList.remove('body--active');
      document.removeEventListener('keydown', handleEscapeKey);
    }
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen]);

  return handleCloseModal;
};