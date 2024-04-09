import styles from './Warning.module.scss';
import icon from '../../../../assets/images/icons/warning.svg'

export const Warning = () => {
  return (
    <div className={styles.warning}>
      <span className={styles.icon}>
        <img width="26" height="26" src={icon} alt="предупреждение"/>
      </span>
      <div>
        Если вы хотите изменить порядок элементов, то просто перетаскивайте их.
        Изменения вступят в силу сразу после одного перетаскивания
      </div>
    </div>
  )
}
