import { Pages } from "../components/enums/pages";
import type { Project } from "../types/Project";

export type ProjectDetailProps = PageProps & {
  project: Project;
};

export type PageProps = {
  setPage: (page: Pages) => void;
  page?: Pages;
};
