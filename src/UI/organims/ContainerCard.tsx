import React from 'react';
import Card from '../molecules/Card';
import { FaRegFolderOpen } from "react-icons/fa6";
import { GiNetworkBars } from "react-icons/gi";
import { LuUsers } from "react-icons/lu";
import { FiCalendar } from "react-icons/fi";
import { IResponsProjects, IUser } from '@/app/core/application/dto';
import styles from './ContainerCard.module.scss';

interface cardProps {
    dataP: IResponsProjects;
    dataU: IUser[];
}

export default function ContainerCard({ dataP, dataU }: cardProps) {

    return (
        <div className={styles.container}>
            <Card data={dataP.metadata.totalItems} title="Total Proyectos" icon={<FaRegFolderOpen className={styles.icon} />} />
            <Card data={dataP.metadata.totalItems} title="Proyectos Activos" icon={<GiNetworkBars className={styles.icon} />} />
            <Card data={dataU.length} title="Organizadores" icon={<LuUsers className={styles.icon} />} />
            <Card data={3} title="Próximo Proyecto" icon={<FiCalendar className={styles.icon} />} />
        </div>
    );
}
