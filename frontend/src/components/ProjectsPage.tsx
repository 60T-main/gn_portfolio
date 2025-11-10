import React, { useEffect, useState } from "react";
import type { PageProps } from "../props/Props";
import { fadeBodyBackground } from "../utils/BodyFade.ts";
import ProjectDetail from "./ProjectDetail.tsx";

export default function ProjectsPage({ setPage }: PageProps) {
  const SCOPE = import.meta.env.VITE_SCOPE;

  const [projectsList, setProjectsList] = useState<any[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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

  useEffect(() => {
    if (projectsList[0] && projectsList[0].img_url) {
      fadeBodyBackground(projectsList[0].img_url);
    }
  }, [projectsList]);

  return (
    <div className="screen-parent">
      {isLoading ? (
        <div className="loader"></div>
      ) : projectsList && projectsList.length > 0 ? (
        <ProjectDetail setPage={setPage} project={projectsList[0]} />
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
