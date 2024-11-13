import React from "react";
import styles from './loading.module.css';
import logo from '../../assets/images/AdminLogo.png';

const Loading: React.FC = () => (
    <div className={styles.fullscreen}>
        <div className={styles.spinnerWrapper}>
            <img src={logo} alt="Loading" className={styles.spinnerImage} />
        </div>
    </div>
);

export default Loading;
