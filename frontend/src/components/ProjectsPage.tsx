import { useEffect, useState } from "react";
import { Pages } from "./enums/pages.tsx";

import type { Project } from "../types/Project";
import { fadeBodyBackground } from "../utils/BodyFade.ts";

interface ProjectsPageProps {
  setProjectPage: React.Dispatch<React.SetStateAction<Project | null>>;
  setPage: React.Dispatch<React.SetStateAction<Pages>>;
}
export default function ProjectsPage({
  setProjectPage,
  setPage,
}: ProjectsPageProps) {
  const SCOPE = import.meta.env.VITE_SCOPE;

  const [projectsList, setProjectsList] = useState<any[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onProjectSelect = (project: Project) => {
    setProjectPage(project);
    setPage(Pages.project);
  };

  const getProjects = async () => {
    setIsLoading(true);
    const endpoint = "/projects";
    try {
      const response = await fetch(SCOPE + endpoint);

      if (!response.ok) {
        console.error("failed to fetch data");
        setErrorMessage("failed to fetch data");
        return;
      }

      const data = await response.json();
      setProjectsList(data);

      return data;
    } catch (error) {
      console.error(error);
      setErrorMessage(String(error));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fadeBodyBackground(null);
    getProjects();
  }, []);

  return (
    <div className="screen-parent">
      {isLoading ? (
        <div className="loader"></div>
      ) : projectsList && projectsList.length > 0 ? (
        <>
          <div className="projects-parent">
            {projectsList.map((project: Project, i: number) => (
              <div
                key={i}
                className="project-card"
                onClick={() => {
                  onProjectSelect(project);
                }}
              >
                <div className="project-img">
                  <img src={project.img_url} alt="project-img" />
                </div>
                <div className="project-name">{project.title}</div>
              </div>
            ))}
          </div>
          <div className="buttons-div">
            <div className="button-div">
              <button
                onClick={() => {
                  setPage(Pages.home);
                }}
                className="button"
              >
                ← Home
              </button>
            </div>
          </div>
        </>
      ) : errorMessage ? (
        <>
          <div className="error-message">failed to connect to server...</div>
          <div className="error-message mt-6">{errorMessage}</div>
        </>
      ) : (
        <>
          <div className="error-message">failed to connect to server...</div>
          <div className="error-message mt-6">try again later...</div>
        </>
      )}
    </div>
  );
}
