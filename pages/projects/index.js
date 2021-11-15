import React from "react";
import Table from "../../components/Table/Table";
import Link from "next/link";
import MainLayout from "../../components/MainLayout";
import prisma from "../../prisma/db";
import styles from "./ProjectsPage.module.scss";
import router from "next/router";

const ProjectsPage = (props) => {
  const tableData = props.projects.map((project) => {
    return {
      id: project.id,
      title: project.title,
      numberOfIssues: project._count.issues,
      createdAt: project.createdAt,
    };
  });

  const columns = [{key: "title", component: <h3></h3>, customProp: 'children'}, "numberOfIssues", "createdAt"];
  const labels = ["Name", "N° of Issues", "Date of creation"];
  return (
    <MainLayout>
      <div className={styles.container}>
        <h1>Projects</h1>
        <Table
          data={tableData}
          columns={columns}
          labels={labels}
          onRowClick={(data) => router.push(`/projects/${data.title}/issues`)}
        ></Table>
      </div>
    </MainLayout>
  );
};

export async function getServerSideProps() {
  const data = await prisma.project.findMany({
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
