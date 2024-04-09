import styles from './Contacts.module.scss';
import Vk from '../../assets/images/icons/contacts/vk.svg?react';
import Telegram from '../../assets/images/icons/contacts/telegram.svg?react';
import Twitch from '../../assets/images/icons/contacts/twitch.svg?react';

export const Contacts = () => {
  return (
    <section className={`${styles.contacts} indent`}>
      <div className="container">
        <div className={styles.inner}>
          <h2 className={`${styles.title} title`}>
            Служба заботы <span> Herbalia ®</span>
          </h2>
          <div className={styles.content}>
            <div className={styles.social}>
              <p className={styles.social_text}>Мы всегда на связи</p>
              <ul className={styles.list}>
                <li>
                  <a className={styles.item_link} href="">
                    <Vk/>
                  </a>
                </li>
                <li>
                  <a className={styles.item_link} href="">
                    <Telegram/>
                  </a>
                </li>
                <li>
                  <a className={styles.item_link} href="">
                    <Twitch/>
                  </a>
                </li>
              </ul>
              <a className={styles.btn} href="mailto:hello@herbalia.ru">Написать на почту</a>
            </div>
            <div className={styles.info}>
              <a className={styles.info_link} href="mailto:hello@herbalia.ru">hello@herbalia.ru</a>
              <p className={styles.text}>
                Отвечаем моментально с 10:00 до 22:00, без автоответчиков
              </p>
              <div className={styles.phone}>
                <a className={styles.info_link} href="tel:+79372363750">8 (937) 236-37-50</a>
                <span>Звонок по России бесплатный</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}