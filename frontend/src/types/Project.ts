export interface Project {
    title: string;
    description: string;
    timeline: string;
    techStack: string[];
    link: string;
    status: "completed" | "developing";
        img_url: string;
}