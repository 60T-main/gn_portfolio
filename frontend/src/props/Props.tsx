import { Pages } from "../components/enums/pages";

export type PageProps = {
  setPage: (page: Pages) => void;
  page?: Pages;
};
