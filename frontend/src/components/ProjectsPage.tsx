import { useEffect, useState } from "react";
import type { PageProps } from "../props/Props";
import { Pages } from "./enums/pages.tsx";
import { usePageContext } from "../hooks/PageStates.tsx";

export default function ProjectsPage({ setPage }: PageProps) {
  const SCOPE = import.meta.env.VITE_SCOPE;

  const [projectsList, setProjectsList] = useState<any[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { setProject } = usePageContext();

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
    getProjects();
  }, []);

  return (
    <div className="screen-parent">
      {isLoading ? (
        <div className="loader"></div>
      ) : projectsList && projectsList.length > 0 ? (
        <div className="projects-parent">
          {projectsList.map((project, i) => (
            <div
              key={i}
              className="project-card"
              onClick={() => {
                console.log("Setting project in context:", project);
                setProject(project);
                setPage(Pages.project);
              }}
            >
              <div className="project-name">{project.title}</div>
            </div>
          ))}
        </div>
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
