import styles from './Header.module.scss';
import logo from '../../assets/images/icons/logo.svg';
import {useEffect, useRef, useState} from "react";
import {HelpMenu} from "./HelpMenu/HelpMenu.jsx";
import {ButtonsActions} from "./ButtonsActions/ButtonsActions.jsx";
import {Link} from "react-router-dom";
import {AuthContent} from "../../utils/AuthContent.jsx";
import {CategoryNavigation} from "./CategoryNavigation/CategoryNavigation.jsx";
import headerDecor from '../../assets/images/header.svg';
import {SearchForm} from "../SearchForm/SearchForm.jsx";

export const Header = () => {
  const [isHelpMenuOpen, setIsHelpMenuOpen] = useState(false);
  const [isSearchFormOpen, setIsSearchFormOpen] = useState(false); // New state for search form
  const helpBtnRef = useRef(null);
  const navRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target) && !helpBtnRef.current.contains(event.target)) {
        setIsHelpMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isHelpMenuOpen]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'Escape' && isHelpMenuOpen) {
        setIsHelpMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [isHelpMenuOpen]);

  const toggleHelpMenu = () => setIsHelpMenuOpen(!isHelpMenuOpen);

  const handleSearchButtonClick = () => {
    setIsSearchFormOpen(!isSearchFormOpen);
  };

  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.inner}>
          <div className={styles.wrapper}>
            <Link className="logo" to='/'>
              <img className="logo__img" width="169" height="40" src={logo} alt="логотип"/>
            </Link>
            <div className={styles.city}>
              <span className={styles.city_title}>Город доставки</span>
              <span className={styles.city_name}>Белореченск</span>
            </div>
            <div className={styles.info}>
              <span className={styles.info_title}>Ежедневно с 10:00 до 22:00</span>
              <a className={styles.info_phone} href="tel:+79372363750">8 (937) 236-37-50</a>
              <Link className={styles.info_link} to="/contacts/">Ещё контакты</Link>
            </div>
            <div className={styles.feedback}>
              <Link className={styles.feedback_link} to="/quality-control/">Контроль качества</Link>
              <Link className={styles.feedback_link} to="/reviews/">Отзывы</Link>
            </div>
            <div className={styles.actions}>
              <div className={styles.actions_top}>
                <button
                  className={`${styles.btn} ${isHelpMenuOpen ? styles.active : ''}`}
                  ref={helpBtnRef}
                  onClick={toggleHelpMenu} type="button"
                >
                  Помощь
                </button>
                <AuthContent
                  unauthenticated={<Link className={styles.auth} to="/login">Войти</Link>}
                  authenticated={<Link className={styles.auth} to="/profile">Личный кабинет</Link>}
                />
                <HelpMenu isHelpMenuOpen={isHelpMenuOpen} ref={navRef}/>
              </div>
              <ButtonsActions onSearchClick={handleSearchButtonClick}/>
            </div>
          </div>
          <CategoryNavigation/>
        </div>
      </div>
      <img className={styles.decor} src={headerDecor} width={1005} height={195}/>
      <SearchForm isActive={isSearchFormOpen} setIsActive={setIsSearchFormOpen}/>
    </header>
  )
};