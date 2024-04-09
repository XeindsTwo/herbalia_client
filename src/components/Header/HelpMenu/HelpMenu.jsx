import {forwardRef} from 'react';
import {NavLink} from 'react-router-dom';
import styles from './HelpMenu.module.scss';
import PropTypes from "prop-types";

const links = [
  {to: "/about", text: "О компании"},
  {to: "/contacts", text: "Контакты"},
  {to: "/payment", text: "Оплата"},
  {to: "/delivery", text: "Доставка"},
  {to: "/flower-care", text: "Уход за цветами"},
  {to: "/guarantee", text: "Гарантии"},
  {to: "/how-order", text: "Как заказать"},
  {to: "/faq", text: "Вопросы-ответы"},
  {to: "/corporate", text: "Корпоративным клиентам"},
  {to: "/agreement", text: "Пользовательское соглашение"}
];

export const HelpMenu = forwardRef(({isHelpMenuOpen}, ref) => {
  return (
    <nav className={`${styles.nav} ${isHelpMenuOpen ? styles.active : ''}`} ref={ref} aria-label="Основная навигация">
      <ul className={styles.list}>
        {links.map((link, index) => (
          <li className={styles.item} key={index}>
            <NavLink
              to={link.to}
              className={({isActive}) => isActive ? `${styles.nav_link} ${styles.active_link}` : styles.nav_link}
            >
              {link.text}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
});

HelpMenu.displayName = 'HelpMenu';
HelpMenu.propTypes = {
  isHelpMenuOpen: PropTypes.bool.isRequired
};