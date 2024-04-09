import {useEffect, useState} from 'react';
import {Outlet, useNavigate} from 'react-router-dom';
import axios from 'axios';
import {Loader} from "../components/Loader.jsx";

export const AdminWrapper = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/user-role', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.role === 'ADMIN') {
          setUserRole('ADMIN');
        } else {
          navigate('/unauthorized');
        }
      } catch (error) {
        navigate('/unauthorized');
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchUserInfo();
    } else {
      navigate('/unauthorized');
    }
  }, [navigate, token]);

  if (loading) {
    return <Loader loading={loading}/>;
  }

  return userRole === 'ADMIN' ? <Outlet/> : null;
};