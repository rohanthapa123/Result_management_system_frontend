import React from 'react';
import styles from './BookLoader.module.css';

const BookLoader = () => {
  return (
    <div className={styles.body}>
      <div className={styles.book}>
        <div className={styles.book__pgShadow}></div>
        <div className={styles.book__pg}></div>
        <div className={`${styles.book__pg} ${styles.book__pg2}`}></div>
        <div className={`${styles.book__pg} ${styles.book__pg3}`}></div>
        <div className={`${styles.book__pg} ${styles.book__pg4}`}></div>
        <div className={`${styles.book__pg} ${styles.book__pg5}`}></div>
      </div>
      <div className={styles.area} >
            <ul className={styles.circles}>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
            </ul>
    </div >
    </div>
  );
};

export default BookLoader;
