import { useEffect, useState } from 'react';
import styles from './CorporateStatements.module.scss';
import axios from 'axios';
import { AdminLayout } from "../../../components/AdminLayout.jsx";
import { toast } from "react-toastify";

export const CorporateStatements = () => {
  const [statements, setStatements] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Отсутствует токен аутентификации');
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios.get('/admin/corporate-statements', config)
      .then(response => {
        setStatements(response.data);
      })
      .catch(error => {
        toast.error('Ошибка загрузки заявлений');
      });
  }, []);

  useEffect(() => {
    const results = statements.filter(statement =>
      statement.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      statement.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      statement.phone.includes(searchTerm) ||
      statement.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  }, [searchTerm, statements]);

  const handleDelete = async (id) => {
    if (window.confirm('Вы уверены, что хотите удалить это заявление? Отменить действие будет невозможно')) {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        await axios.delete(`/admin/corporate-statements/${id}`, config);
        setStatements(statements.filter(statement => statement.id !== id));
        toast.success('Заявление успешно удалено');
      } catch (error) {
        toast.error('Ошибка при удалении заявления');
      }
    }
  };

  return (
    <AdminLayout>
      <section>
        <div className="container container--admin">
          <div>
            <h1 className="admin__title">Управление заявлениями от партнёров</h1>
            <input
              className={'input input--480'}
              placeholder={'Поиск по имени, компании или телефону'}
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchResults.length === 0 ? (
              <p className={styles.empty}>Заявления не были найдены</p>
            ) : (
              <ul className={styles.list}>
                {searchResults.map(statement => (
                  <li className={styles.item} key={statement.id}>
                    <div className={styles.main}>
                      <p>{statement.name}</p>
                      <a className={styles.link} href={`mailto:${statement.email}`}>{statement.email}</a>
                      <a className={styles.link} href={`tel:${statement.phone}`}>{statement.phone}</a>
                    </div>
                    <div className={styles.bottom}>
                      <p className={styles.company}>«{statement.company}»</p>
                      <button className={`${styles.btn} ${styles.delete}`} type="button" onClick={() => handleDelete(statement.id)}>
                        Удалить
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>
    </AdminLayout>
  );
};