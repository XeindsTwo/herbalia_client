import {useEffect, useState} from 'react';
import {AdminLayout} from '../../../components/AdminLayout.jsx';
import styles from './Categories.module.scss';
import {AdminButton} from '../components/AdminButton/AdminButton.jsx';
import axios from 'axios';
import {toast} from 'react-toastify';
import {CategoriesList} from './CategoriesList.jsx';
import {ModalAdd} from './Modals/ModalAdd.jsx';
import {ModalEdit} from './Modals/ModalEdit.jsx';
import {ModalDelete} from './Modals/ModalDelete.jsx';

export const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get('/admin/categories', config);
        setCategories(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading categories', error);
        setIsError(true);
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const addCategory = (newCategory) => {
    setCategories((prevCategories) => [...prevCategories, newCategory]);
  };

  const updateCategory = (updatedCategory) => {
    setCategories((prevCategories) =>
      prevCategories.map((category) =>
        category.id === updatedCategory.id ? updatedCategory : category
      )
    );
  };

  const handleDeleteCategory = (categoryId) => {
    setSelectedCategoryId(categoryId);
  };

  const handleEditCategory = (category) => {
    setSelectedCategory(category);
    setIsEditModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.delete(`/admin/categories/${selectedCategoryId}`, config);
      setCategories((prevCategories) =>
        prevCategories.filter((cat) => cat.id !== selectedCategoryId)
      );

      setSelectedCategoryId(null);
      toast.success('Категория успешно удалена!');
    } catch (error) {
      console.error('Ошибка при удалении категории', error);
      toast.error('Ошибка при удалении категории. Пожалуйста, попробуйте позже');
    }
  };

  return (
    <AdminLayout>
      <section>
        <div className='container container--admin'>
          <div>
            <h1 className='admin__title'>Управление категориями</h1>
            <AdminButton onClick={() => setIsAddModalOpen(true)}>Добавить категорию</AdminButton> {/* Open Add Modal */}
            <span className={styles.subtitle}>Ваши категории:</span>
            {isError && <p>Произошла ошибка при загрузке категорий</p>}
            {isLoading ? (
              <p>Загрузка...</p>
            ) : categories.length === 0 ? (
              <p>Категорий еще нет, но вы можете создать их</p>
            ) : (
              <CategoriesList
                categories={categories}
                onDeleteCategory={handleDeleteCategory}
                onEditCategory={handleEditCategory}
              />
            )}
          </div>
        </div>
      </section>
      <ModalAdd isOpen={isAddModalOpen} setIsOpen={setIsAddModalOpen} addCategory={addCategory}/>
      <ModalEdit
        isOpen={isEditModalOpen}
        setIsOpen={setIsEditModalOpen}
        selectedCategory={selectedCategory}
        updateCategory={updateCategory}
      />
      <ModalDelete
        isOpen={!!selectedCategoryId}
        setIsOpen={setSelectedCategoryId}
        onDelete={handleConfirmDelete}
        categoryName={categories.find((cat) => cat.id === selectedCategoryId)?.name}
      />
    </AdminLayout>
  );
};