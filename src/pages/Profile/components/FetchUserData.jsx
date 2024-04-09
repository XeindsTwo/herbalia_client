import {useEffect, useState} from "react";
import axios from "axios";

export const FetchUserData = () => {
  const [userData, setUserData] = useState(null);
  const [reviewsData, setReviewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userInfoResponse, reviewsResponse, roleResponse] = await Promise.all([
          axios.get('/profile/user-info', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          }),
          axios.get('/profile/reviews', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          }),
          axios.get('/user-role', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          })
        ]);
        setUserData(userInfoResponse.data);
        setReviewsData(reviewsResponse.data);
        setUserRole(roleResponse.data.role);
        setLoading(false);
      } catch (error) {
        console.error('Ошибка при получении данных о пользователе, отзывах или роли: ', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDeleteReview = async (reviewId) => {
    try {
      await axios.delete(`/profile/reviews/delete/${reviewId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      const updatedReviews = reviewsData.filter(review => review.id !== reviewId);
      setReviewsData(updatedReviews);
    } catch (error) {
      console.error('Ошибка при удалении отзыва: ', error);
    }
  };

  return {userData, reviewsData, loading, userRole, handleDeleteReview, setUserData};
};