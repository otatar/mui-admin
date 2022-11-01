import React, { useEffect } from "react";

const useDocumentTitle = (title: string) => {
  useEffect(() => {
    document.title = `MUI Admin | ${title}`;
  }, [title]);
};

export default useDocumentTitle;
