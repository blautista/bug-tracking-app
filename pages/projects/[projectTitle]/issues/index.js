import React from "react";
import BugListDashboard from "../../../../components/Main/BugListDashboard/BugListDashboard";
import MainLayout from "../../../../components/MainLayout";
import prisma from "../../../../prisma/db";

const IssuesPage = (props) => {
  return (
    <MainLayout>
      <BugListDashboard issues={props.issues || {}}></BugListDashboard>
    </MainLayout>
  );
};

export async function getStaticPaths() {
  const data = await prisma.project.findMany();
  const parsedData = JSON.parse(JSON.stringify(data));

  return {
    paths: parsedData.map((data) => {
      return { params: { projectTitle: data.title } };
    }),
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const data = await prisma.issue.findMany({
    orderBy: [{ createdAt: "desc" }],
    where: {
      projectTitle: params.projectTitle,
    },
  });
  const parsedData = JSON.parse(JSON.stringify(data));

  return {
    props: {
      issues: parsedData,
    },
  };
}

export default IssuesPage;
