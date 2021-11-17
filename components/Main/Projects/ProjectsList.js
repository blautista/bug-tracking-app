import React, { useState, useEffect } from "react";
import Table from "../../Table/Table";
import Button from "../../Buttons/Button";
import NewProjectForm from "./NewProjectForm";
import MainLayout from '../../MainLayout'

import styles from './ProjectsList.module.scss'
import { useRouter } from "next/router";

const ProjectsList = (props) => {

  const router = useRouter();
  const [newProjectModal, setNewProjectModal] = useState(null);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    setProjects(() => {
      return props.projects.map((project) => {
        return {
          id: project.id,
          title: project.title,
          numberOfIssues: project._count.issues,
          createdAt: project.createdAt,
        };
      });
    });
  }, []);
  
  const openNewProjectModal = () => {
    setNewProjectModal(<NewProjectForm onSubmit={createNewProject} onExit={closeNewProjectModal}/>);
  };
  
  const closeNewProjectModal = () => {
    setNewProjectModal(null);
  };

  const createNewProject = async (data) => {
    const res = await fetch("/api/new-project", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      console.log("success!!");
    } else {
      console.error(
        "uh oh something very bad happening while creating a new project"
      );
    }
  };


  const columns = [
    { key: "title", component: <h3></h3>, customProp: "children" },
    "numberOfIssues",
    "createdAt",
  ];
  const labels = ["Name", "N° of Issues", "Date of creation"];

  return (
    <MainLayout>
      {newProjectModal}
      <div className={styles.container}>
        <h1>Projects</h1>
        <Table
          data={projects}
          columns={columns}
          labels={labels}
          onRowClick={(data) => router.push(`/projects/${data.title}/issues`)}
        ></Table>
        <Button
          onClick={openNewProjectModal}
          text="New Project"
          styling="blue"
        ></Button>
      </div>
    </MainLayout>
  );
};

export default ProjectsList;
