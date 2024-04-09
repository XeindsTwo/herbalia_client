import {Layout} from "../../components/Layout.jsx";
import styles from './Error.module.scss';
import imgOne from '../../assets/images/decor-one.svg';
import imgTwo from '../../assets/images/decor-two.svg'
import {Link} from "react-router-dom";

export const Error404 = () => {
  return (
    <Layout showFooter={false}>
      <section className={`${styles.error} indent`}>
        <img className={`${styles.img} ${styles.img_one}`} src={imgOne} alt="декор"
             width="425" height="270"/>
        <img className={`${styles.img} ${styles.img_two}`} src={imgTwo} alt="декор"
             width="466" height="260"/>
        <div className="container">
          <div className={styles.content}>
            <h1 className={styles.title}>Страница не найдена</h1>
            <p className={styles.text}>
              Возможно, она удалена или был введен неправильный адрес
            </p>
            <Link className={styles.btn} to="/">На главную</Link>
          </div>
        </div>
      </section>
    </Layout>
  )
}
