import React, { useState, useContext, createContext } from "react";
console.log("PageStates.tsx module loaded");

export const PageStates = createContext<{
  project: any;
  setProject: React.Dispatch<React.SetStateAction<any>>;
}>({ project: {}, setProject: () => {} });

export const PageProvider = ({ children }: any) => {
  const [project, setProject] = useState<any>({});

  // Log whenever project changes
  React.useEffect(() => {
    console.log("PageProvider project state updated:", project);
  }, [project]);

  return (
    <PageStates.Provider value={{ project, setProject }}>
      {children}
    </PageStates.Provider>
  );
};

export const usePageContext = () => useContext(PageStates);
