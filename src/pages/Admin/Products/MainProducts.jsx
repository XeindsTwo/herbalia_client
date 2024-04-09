import {AdminLayout} from "../../../components/AdminLayout.jsx";
import {AdminButton} from "../components/AdminButton/AdminButton.jsx";
import {Link} from "react-router-dom";

export const MainProducts = () => {
  return (
    <AdminLayout>
      <section>
        <div className="container container--admin">
          <div>
            <h1 className="admin__title">Управление товарами</h1>
            <Link to={'create'}>Добавить товар</Link>
          </div>
        </div>
      </section>
    </AdminLayout>
  )
}