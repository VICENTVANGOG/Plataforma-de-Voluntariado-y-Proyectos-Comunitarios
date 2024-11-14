import { IPostProject, IResponseUser} from "@/app/core/application/dto";
import { HttpClient } from "../utils/client-http";


export class UserService {
    private httpClient: HttpClient;

    constructor() {
        this.httpClient = new HttpClient()
    }

    async findAll(): Promise<IResponseUser> {
        try {
            const response = await this.httpClient.get<IResponseUser>(`users`);
            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }


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
                console.error("Error response:", error); // Muestra el error si no fue exitoso
                throw new Error(error.error);
            }

            const data = await response.json();
            console.log("Response data:", data); // Verifica los datos que se reciben del backend

            return data;
        } catch (error) {
            console.error("Error creating project:", error); // Captura errores en la creación
            throw error;
        }
    }

    /* 
        
        async destroy(id: number) {
            try {
                const response = await fetch(`/api/services/destroy/services/${id}`, {
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
    
        async save(service: IPostService, id: number) {
            try {
                const response = await fetch(`/api/services/save/services/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(service),
                });
    
                if (!response.ok) {
                    const error = await response.json();
                    throw new Error(error.error);
                }
    
                const data = await response.json();
                return data;
            } catch (error) {
                console.error(error);
                throw error;
            }
        } */
}