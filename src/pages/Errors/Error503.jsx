import {Layout} from "../../components/Layout.jsx";
import styles from './Error.module.scss';
import imgOne from '../../assets/images/decor-one.svg';
import imgTwo from '../../assets/images/decor-two.svg'
import {Contacts} from "../../components/Contacts/Contacts.jsx";
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
            <h1 className={styles.title}>Время ожидания истекло</h1>
            <p className={styles.text}>
              Что-то пошло не так в нашем цветочном саду! Наши технические цветочные композиции не успели расцвести
            </p>
            <Link className={styles.btn} to="/">На главную</Link>
          </div>
        </div>
      </section>
      <Contacts></Contacts>
    </Layout>
  )
}