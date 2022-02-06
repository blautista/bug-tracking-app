import React from "react";
import BugDetailsDashboard from "../../../../../components/Main/BugDetails/BugDetailsDashboard";
import MainLayout from "../../../../../components/MainLayout";
import { useRouter } from "next/router";
import prisma from "../../../../../prisma/db";
const IssuePage = (props) => {

  const router = useRouter();

  if (router.isFallback) {
    return <p>loading...</p>
  }

  console.log(props.data);

  return (
    <MainLayout>
      <BugDetailsDashboard
        data={props.data}
      />
    </MainLayout>
  );
};

export async function getStaticPaths() {
  const data = await prisma.issue.findMany();
  const jsonissues = JSON.stringify(data);
  const issues = JSON.parse(jsonissues);

  return {
    fallback: true,
    paths: issues.map((issue) => ({
      params: {
        issueNumber: issue.number.toString(),
        projectTitle: issue.projectTitle,
      },
    })),
  };
}

export async function getStaticProps({ params }) {
  const data = await prisma.issue.findFirst({
    where: {
      number: parseInt(params.issueNumber),
      projectTitle: params.projectTitle,
    },
    include: {
      comments: true,
      history: true,
    }
  });

  const jsonissue = JSON.stringify(data);
  const issue = JSON.parse(jsonissue);

  return {
    props: {
      data: issue,
    },
  };
}

export default IssuePage;
