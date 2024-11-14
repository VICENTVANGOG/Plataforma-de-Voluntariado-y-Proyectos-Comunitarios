import React from 'react';
import styles from './card.module.scss';

interface CardProps {
    data: number; 
    title: string;
    icon: React.ReactNode;
}

export default function Card({ data, title, icon }: CardProps) {
    return (
        <div className={styles.card}>
            <div className={styles['card-header']}>
                <h3 className={styles['card-title']}>{title}</h3>
                <span className={styles['card-icon']}>{icon}</span>
            </div>
            <p className={styles['card-data']}>{data}</p>
        </div>
    );
}
