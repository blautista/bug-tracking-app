import React from "react";
import prisma from "../../prisma/db";
import ProjectsList from "../../components/Main/Projects/ProjectsList";

const ProjectsPage = (props) => {
  return <ProjectsList projects={props.projects}></ProjectsList>;
};

export async function getServerSideProps() {
  const data = await prisma.project.findMany({
    orderBy: [{ createdAt: 'desc' }],
    include: {
      _count: {
        select: { issues: true },
      },
    },
  });

  const projects = JSON.parse(JSON.stringify(data));

  return {
    props: {
      projects: projects,
    },
  };
}

export default ProjectsPage;
