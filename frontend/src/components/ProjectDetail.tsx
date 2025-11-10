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

  useEffect(() => {
    console.log("project:", project);
  }, [project]);

  return (
    <div className="project-parent flex flex-col gap-5 mt-12">
      <div className="text-6xl text-center font-bold">{project.title}</div>
      <div className={`text-4xl font-bold text-center `}>
        status:{" "}
        <span
          className={`${
            project.status == "completed" ? "text-green-500" : "text-orange-500"
          }`}
        >
          {project.status}
        </span>
      </div>
      <div className="text-3xl text-center font-bold">{project.timeline}</div>
      <div className="text-5xl p-14">{project.description}</div>
      <div className="text-5xl p-14">
        <span className="font-bold">tech stack:</span>
        <div className="pt-4 flex flex-col gap-1">
          {project.techStack.map((stack: any) => (
            <div key={stack}>{stack}</div>
          ))}
        </div>
      </div>
      <div className="text-5xl px-14">
        link: <a href={project.link}>{project.link}</a>
      </div>
      <div className="buttons-div">
        <div className="button-div">
          <button
            onClick={() => {
              setPage(Pages.home);
            }}
            className="text-6xl bg-gray-500 py-6 px-20 rounded-4xl cursor-pointer"
          >
            ← Back
          </button>
        </div>
      </div>
    </div>
  );
}
