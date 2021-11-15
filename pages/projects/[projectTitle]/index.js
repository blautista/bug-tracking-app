import React, { useEffect } from "react";
import prisma from '../../../prisma/db';
import { useRouter } from "next/router";

const ProjectPage = (props) => {
  const router = useRouter();

  useEffect(() => {
    router.push({
      pathname: router.pathname+'/issues',
      query: {
        projectTitle: router.query(projectTitle),
      },
    });
  }, []);
  return null;
};

export async function getStaticPaths() {
  const data = await prisma.project.findMany();
  const jsonprojects = JSON.stringify(data);
  const projects = JSON.parse(jsonprojects);

  return {
    fallback: "blocking",
    paths: projects.map((project) => ({
      params: { projectTitle: project.title },
    })),
  };
}

export async function getStaticProps(context) {
  return {
    props: {
      projectTitle: context.params.projectTitle,
    },
  };
}

export default ProjectPage;
