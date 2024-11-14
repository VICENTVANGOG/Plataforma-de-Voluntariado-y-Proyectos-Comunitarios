export interface IResponsProjects {
    statusCode: number;
    message:    string;
    data:       IProject[];
    metadata:   Metadata;
}

export interface IProject {
    id:          number;
    title:       string;
    description: string;
    startDate:   string;
    endDate:     string;
    isActive:    boolean;
    organizer:   Organizer;
}

export interface Organizer {
    id:       number;
    email:    string;
    password: string;
    name:     string;
    role:     string;
    photo:    string;
}

export interface Metadata {
    totalItems:   number;
    itemCount:    number;
    itemsPerPage: number;
    totalPages:   number;   
    currentPage:  number;
}
