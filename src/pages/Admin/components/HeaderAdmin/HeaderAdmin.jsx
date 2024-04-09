import styles from './HeaderAdmin.module.scss';
import logo from '../../../../assets/images/icons/logo-white.svg'
import {Link, NavLink} from "react-router-dom";

const links = [
  {to: "/admin/products", text: "Управление товарами"},
  {to: "/admin/categories", text: "Управление категориями"},
  {to: "/admin/reviews/unapproved", text: "Управление отзывами"},
  {to: "/admin/improvements", text: "Улучшения проекта"}
];

export const HeaderAdmin = () => {
  return (
    <header className={styles.header}>
      <div className="container container--admin">
        <div className={styles.inner}>
          <Link className="logo" to="/">
            <img className="logo__img" width="163" height="38" src={logo} alt="логотип"/>
          </Link>
          <ul className={styles.list}>
            {links.map((link, index) => (
              <li key={index}>
                <NavLink
                  to={link.to}
                  className={({isActive}) => isActive ? `${styles.link} ${styles.active}` : styles.link}
                >
                  {link.text}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  )
}