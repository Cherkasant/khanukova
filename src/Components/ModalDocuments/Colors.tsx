import classNames from 'classnames';

import styles from './Colors.module.css';

export const Colors = [
  {
    value: 'Red',
    label: (
      <div className={styles.color}>
        Red<div className={classNames(styles.label, styles.labelRed)}></div>
      </div>
    )
  },
  {
    value: 'Blue',
    label: (
      <div className={styles.color}>
        Blue<div className={classNames(styles.label, styles.labelBlue)}></div>
      </div>
    )
  },
  {
    value: 'Yellow',
    label: (
      <div className={styles.color}>
        Yellow<div className={classNames(styles.label, styles.labelYellow)}></div>
      </div>
    )
  },
  {
    value: 'Darkgreen',
    label: (
      <div className={styles.color}>
        Darkgreen<div className={classNames(styles.label, styles.labelDarkgreen)}></div>
      </div>
    )
  },
  {
    value: 'Green',
    label: (
      <div className={styles.color}>
        Green<div className={classNames(styles.label, styles.labelGreen)}></div>
      </div>
    )
  },
  {
    value: 'Brown',
    label: (
      <div className={styles.color}>
        Brown<div className={classNames(styles.label, styles.labelBrown)}></div>
      </div>
    )
  },
  {
    value: 'Fiolet',
    label: (
      <div className={styles.color}>
        Fiolet<div className={classNames(styles.label, styles.labelViolet)}></div>
      </div>
    )
  }
];
