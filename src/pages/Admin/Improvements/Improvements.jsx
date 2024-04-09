import {AdminLayout} from "../../../components/AdminLayout.jsx";
import {useEffect, useState} from "react";
import {useQuery} from "react-query";
import axios from "axios";
import {ImprovementSearch} from "./ImprovementSearch/ImprovementSearch.jsx";
import {DeleteImprovement} from "./DeleteImprovement.jsx";
import {toast} from "react-toastify";
import {ImprovementsList} from "./ImprovementList/ImprovementList.jsx";

export const Improvements = () => {
  const [improvements, setImprovements] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImprovementId, setSelectedImprovementId] = useState(false);
  const [selectedImprovementName, setSelectedImprovementName] = useState('');
  const {isLoading, isError, data} = useQuery('improvements', fetchImprovements);

  async function fetchImprovements() {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/admin/improvements', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      throw new Error('Ошибка при загрузке предложений улучшений');
    }
  }

  const handleDeleteImprovement = async (improvementId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/admin/improvements/${improvementId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setImprovements(prevImprovements => prevImprovements.filter(improvement => improvement.id !== improvementId));
      setIsModalOpen(false);
      toast.success('Предложение было успешно удалено!');
    } catch (error) {
      console.error('Ошибка при удалении предложения:', error);
      toast.error('Ошибка при удалении предложения. Пожалуйста, попробуйте позже');
    }
  };

  const handleOpenDeleteModal = (improvementId, improvementName) => {
    setSelectedImprovementId(improvementId);
    setSelectedImprovementName(improvementName);
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (data) {
      setImprovements(data);
    }
  }, [data]);

  const filteredImprovements = improvements.filter(improvement => {
    return improvement.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      improvement.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      improvement.suggestion_comment.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <AdminLayout>
      <section>
        <div className="container container--admin">
          <div>
            <h1 className="admin__title">Управление предложениями по улучшениям</h1>
            <ImprovementSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
            {isLoading && <p>Загрузка предложений...</p>}
            {isError && <p>Произошла ошибка при загрузке предложений улучшений</p>}
            {filteredImprovements.length === 0 ? (
              <p>Нет предложений улучшения</p>
            ) : (
              <ImprovementsList
                filteredImprovements={filteredImprovements}
                handleOpenDeleteModal={handleOpenDeleteModal}
              />
            )}
          </div>
        </div>
      </section>
      <DeleteImprovement
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        onDelete={() => handleDeleteImprovement(selectedImprovementId)}
        name={selectedImprovementName}
      />
    </AdminLayout>
  )
}