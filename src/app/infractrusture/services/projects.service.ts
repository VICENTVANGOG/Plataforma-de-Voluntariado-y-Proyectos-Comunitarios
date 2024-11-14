import { IPostProject, IResponsProjects } from "@/app/core/application/dto";
import { HttpClient } from "../utils/client-http";

export class ProjectsService {

 
    private httpClient: HttpClient;

    constructor() {
        this.httpClient = new HttpClient();
    }

    // Método para obtener todos los proyectos
    async findAll(page: number, size: number): Promise<IResponsProjects> {
        try {
            const response = await this.httpClient.get<IResponsProjects>(`projects?page=${page}&size=${size}`);
            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    // Método para crear un nuevo proyecto
    async create(service: IPostProject) {
        try {
            console.log("Creating project with data:", service); // Verifica los datos antes de enviarlos

            const response = await fetch(`/api/projects/create/projects`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(service),
            });

            if (!response.ok) {
                const error = await response.json();
                console.error("Error response:", error); 
                throw new Error(error.error);
            }

            const data = await response.json();
            console.log("Response data:", data); 

            return data;
        } catch (error) {
            console.error("Error creating project:", error); 
            throw error;
        }
    }

    async update(id: number, formData: IPostProject) {
        try {
            console.log("Updating project with data:", formData);
    
            const response = await fetch(`/api/projects/update/projects/${id}`, {
                method: 'PATCH',  
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
    
            if (!response.ok) {
                const error = await response.json();
                console.error("Error response:", error);
                throw new Error(error.error);
            }
    
            const data = await response.json();
            console.log("Response data:", data); 
            return data;
        } catch (error) {
            console.error("Error updating project:", error);
            throw error;
        }
    }

    // Método para eliminar un proyecto
    async destroy(id: number) {
        try {
            const response = await fetch(`/api/projects/destroy/projects/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error);
            }

        } catch (error) {
            console.error(error);
            throw error;
        }
    }
            
            async getAllProjects(): Promise<IResponsProjects> {
                try {
                    const response = await this.httpClient.get<IResponsProjects>(`projects/all`); // Ajusta la URL según la API
                    return response;
                } catch (error) {
                    console.error('Error fetching all projects:', error);
                    throw error;
                }
}

}


