import React from 'react'
import ProjectDashboard from '../../../components/Main/Projects/ProjectDashboard/ProjectDashboard'
import MainLayout from '../../../components/MainLayout'
import prisma from '../../../prisma/db'

const ProjectDashboardPage = (props) => {
  return (
    <MainLayout>
      <ProjectDashboard issues={props.issues} project={props.project}/>
    </MainLayout>
  )
}

export async function getStaticPaths () {
  const data = await prisma.project.findMany();
  const projects = JSON.parse(JSON.stringify(data));

  return {
    paths: projects.map((project) => {
      return {
        params: {
          projectTitle: project.title,
        }
      }
    })
  }
}

export async function getStaticProps ({ params }) {
  const projectData = await prisma.project.findFirst({
    where: {
      title: params.projectTitle,
    }
  })

  const issuesData = await prisma.issue.findMany({
    where: {
      projectTitle: params.projectTitle,
    },
    include: {
      comments: true,
      history: true,
    },
  })

  const issues = JSON.parse(JSON.stringify(issuesData));
  const project = JSON.parse(JSON.stringify(projectData));

  return {
    props: {
      issues: issues,
      project: project,
    }
  }
}

export default ProjectDashboardPage
