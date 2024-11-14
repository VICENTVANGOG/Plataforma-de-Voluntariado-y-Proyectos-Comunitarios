
import { ProjectsService } from '@/app/infractrusture/services/projects.service'
import { UserService } from '@/app/infractrusture/services/users.service'
import TableTemplate from '@/UI/template/TableTemplate'
import React from 'react'

const useProjectsService = new ProjectsService()
const useUsersService = new UserService()

interface IProps {
  searchParams: {
      page: string;
      size: string;
      name: string;
  }
}

export const generateMetadata = async ({ searchParams }: IProps) => {
  const page = searchParams.page ?? '1'
  return {
      title: `Services - Página ${page}`,
      description: 'Service of beauty-salon'
  }
}

export default async function ProjectsPage(  {searchParams }: IProps ) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1
  const size = searchParams.size ? parseInt(searchParams.size) : 5
  const dataP = await useProjectsService.findAll(page, size)
  const dataU = await useUsersService.findAll()

  return (
    <TableTemplate dataP={dataP} dataU={dataU} />
  )
}
