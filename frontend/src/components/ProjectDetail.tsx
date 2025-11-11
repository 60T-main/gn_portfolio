import { useEffect } from "react";
import type { ProjectDetailProps } from "../props/Props.tsx";
import { Pages } from "./enums/pages";
import { fadeBodyBackground } from "../utils/BodyFade.ts";

export default function ProjectDetail({
  setPage,
  project,
}: ProjectDetailProps) {
  useEffect(() => {
    if (project && project.img_url) {
      fadeBodyBackground(project.img_url);
    }
  }, []);

  return (
    <div className="screen-parent">
      <div className="text-6xl text-center font-bold mb-4">{project.title}</div>
      <div className={`text-4xl font-bold text-center mb-4`}>
        status:{" "}
        <span
          className={`${
            project.status == "completed" ? "text-green-500" : "text-yellow-500"
          }`}
        >
          {project.status}
        </span>
      </div>
      <div className="text-3xl text-center font-bold">{project.timeline}</div>
      <div className="text-5xl px-14 mt-8">{project.description}</div>
      <div className="text-5xl px-14 mt-8">
        <span className="font-bold">tech stack:</span>
        <div className="pt-4 flex flex-col gap-1">
          {project.techStack.map((stack: any) => (
            <div key={stack}>{stack}</div>
          ))}
        </div>
      </div>
      <div className="text-5xl px-14 mt-8">
        link: <a href={project.link}>{project.link}</a>
      </div>
      <div className="buttons-detail-div">
        <div className="button-detail-div">
          <button
            onClick={() => {
              setPage(Pages.projects);
            }}
            className="button-detail"
          >
            ← Back
          </button>
        </div>
      </div>
    </div>
  );
}
