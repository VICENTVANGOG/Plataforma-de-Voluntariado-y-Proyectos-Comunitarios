'use client'

import React, { useState } from 'react';
import TableProjects from '../organims/TableProjects';
import { IPostProject, IResponsProjects } from '@/app/core/application/dto';
import{IResponseUser} from '@/app/core/application/dto/users/use-response.dto'
import ContainerCard from '../organims/ContainerCard';
import { ProjectModal } from '@/UI/molecules/NewProject';
import { ProjectsService } from '@/app/infractrusture/services/projects.service';
import Pagination from '../molecules/Pagination';
import NavBar from '../organims/navBarUser/navbarUser';


interface dataProps {
    dataP: IResponsProjects;
    dataU: IResponseUser,
}

export default function TableTemplate({ dataP, dataU }: dataProps) {
    const [selectedProject, setSelectedProject] = useState<IPostProject | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const useProjectsService = new ProjectsService()

    const handleOpenModal = (id?: number) => {
        if (id) {
            const project = dataP.data.find((item) => item.id === id);
            if (project) {
                const projectData: IPostProject = {
                    title: project.title,
                    description: project.description,
                    startDate: project.startDate,
                    endDate: project.endDate,
                    id: function (id: any, formData: IPostProject): unknown {
                        throw new Error('Function not implemented.');
                    }
                };
                setSelectedProject(projectData);
            }
        } else {
            setSelectedProject(null);
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedProject(null);
    };

    const handleSubmit = async (formData: IPostProject) => {
        try {
            if (selectedProject) {
                console.log(formData);
            } else {
                await useProjectsService.create(formData)
                console.log("Project saved successfully");
            }
        } catch (error) {
            console.error("Error saving project:", error);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await useProjectsService.destroy(id)
            console.log("Project deleted successfully");

        } catch (error) {
            console.error("Error deleting project:", error);    
        }
    };

    return (
        <div className='mb-4'>
               <NavBar onAdd={() => handleOpenModal()} />
            <ContainerCard dataP={dataP} dataU={dataU.data}/>
            <TableProjects
                data={dataP.data}
                onEdit={(id) => handleOpenModal(id)}
                onDelete={handleDelete}
            />
         <ProjectModal
    isOpen={isModalOpen}
    onClose={handleCloseModal}
    onSubmit={handleSubmit}
    initialData={selectedProject}
/>
            <Pagination data={dataP} />
        </div>
    );
}