import {useCallback, useState} from "react";
import {Layout} from "../../components/Layout.jsx";
import styles from './Profile.module.scss';
import {PersonalInfo} from "./components/PersonalInfo/PersonalInfo.jsx";
import {Reviews} from "./components/Reviews/Reviews.jsx";
import {Aside} from "./components/Aside/Aside.jsx";
import {Link} from "react-router-dom";
import {FetchUserData} from "./components/FetchUserData.jsx";

const tabOptions = [
  {id: 'personal', label: 'Личные данные'},
  {id: 'reviews', label: 'Мои отзывы'},
];

export const Profile = () => {
  const [activeTab, setActiveTab] = useState(tabOptions[0].id);
  const {userData, reviewsData, loading, userRole, handleDeleteReview, setUserData} = FetchUserData();

  const handleNameUpdate = useCallback((newName) => {
    setUserData(prevUserData => ({...prevUserData, name: newName}));
  }, [setUserData]);

  const handleEmailUpdate = useCallback((newEmail) => {
    setUserData(prevUserData => ({...prevUserData, email: newEmail}));
  }, [setUserData]);

  return (
    <Layout showFooter={false}>
      <section className={styles.section}>
        <div className="container">
          <h1 className={`title ${styles.title}`}>Личный кабинет</h1>
          {userRole === 'ADMIN' && (
            <Link className={styles.admin} to={'/admin/categories'}>
              Вы администратор, и имеете возможность управлять контентом сайта
            </Link>
          )}
          <div className={styles.inner}>
            <Aside
              tabOptions={tabOptions}
              activeTab={activeTab}
              onTabClick={setActiveTab}
            />
            {activeTab === "personal" ? (
              <PersonalInfo
                userData={userData}
                onNameUpdate={handleNameUpdate}
                onEmailUpdate={handleEmailUpdate}
                loading={loading}
              />
            ) : activeTab === "reviews" ? (
              <Reviews
                reviews={reviewsData}
                onDeleteReview={handleDeleteReview}
              />
            ) : (
              <div>Таб</div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  )
}