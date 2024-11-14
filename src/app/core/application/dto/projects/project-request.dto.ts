export interface IPostProject {
    id(id: any, formData: IPostProject): unknown;
    title:       string;
    description: string;
    startDate:   string;
    endDate:     string;
}
