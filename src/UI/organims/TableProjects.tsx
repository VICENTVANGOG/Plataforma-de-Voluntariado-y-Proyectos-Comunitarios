'use client';
import { IProject } from '@/app/core/application/dto';
import { Button, Input } from '@mui/joy';
import React from 'react';
import styles from './TableProjects.module.scss';

interface TableProps {
    data: IProject[];
    onEdit: (id: number, data: IProject[]) => void; 
    onDelete: (id: number) => void;
}

export default function TableProjects({ data, onEdit, onDelete }: TableProps) {
    return (
        <div className={styles['table-container']}>
            <div className={styles['table-header']}>
                <h2 className={styles['table-title']}>Lista de Proyectos</h2>
            </div>

        
            <div className={styles['search-bar']}>
                <Input placeholder="Buscar Proyectos..." sx={{ width: '37%', padding: '10px' }} />
            </div>

            {/* Tabla */}
            <table className={styles['table']}>
                <thead className={styles['table-header-group']}>
                    <tr className={styles['table-header-row']}>
                        <th className={styles['table-header-cell']}>Titulo</th>
                        <th className={styles['table-header-cell']}>Descripcion</th>
                        <th className={styles['table-header-cell']}>Fecha de Inicio</th>
                        <th className={styles['table-header-cell']}>Fecha de Fin</th>
                        <th className={styles['table-header-cell']}>Estado</th>
                        <th className={styles['table-header-cell']}>Organizador</th>
                        <th className={styles['table-header-cell']}>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((project, index) => (
                        <tr key={index} className={styles['table-row']}>
                            <td className={styles['table-cell']} data-label="Titulo">
                                <span className={styles['table-cell-label']}>Titulo:</span> {project.title}
                            </td>
                            <td className={styles['table-cell']} data-label="Descripcion">
                                <span className={styles['table-cell-label']}>Descripcion:</span> {project.description}
                            </td>
                            <td className={styles['table-cell']} data-label="Fecha de Inicio">
                                <span className={styles['table-cell-label']}>Fecha de Inicio:</span> {project.startDate}
                            </td>
                            <td className={styles['table-cell']} data-label="Fecha de Fin">
                                <span className={styles['table-cell-label']}>Fecha de Fin:</span> {project.endDate ? project.endDate : 'Sin fecha'}
                            </td>
                            <td className={styles['table-cell']} data-label="Estado">
                                <span className={styles['table-cell-label']}>Estado:</span>
                                <div className={project.isActive ? styles['status-active'] : styles['status-inactive']}>
                                    {project.isActive ? 'Activo' : 'Inactivo'}
                                </div>
                            </td>

                            <td className={styles['table-cell']} data-label="Organizador">
                                <span className={styles['table-cell-label']}>Organizador:</span> {project.organizer.name}
                            </td>
                            <td className={styles['table-cell']} data-label="Acciones">
                                <span className={styles['table-cell-label']}>Acciones:</span>
                                <div className={styles['actions']}>
                                    <Button 
                                        variant="outlined" 
                                        color="neutral" 
                                        className={styles['button-neutral']}
                                        onClick={() => onEdit(project.id, data)}>
                                        Editar
                                    </Button>
                                    <Button 
                                        variant="soft" 
                                        color="danger" 
                                        className={styles['button-danger']}
                                        onClick={() => onDelete(project.id)}>
                                        Eliminar
                                    </Button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
