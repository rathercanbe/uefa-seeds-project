import React, { useEffect } from "react";

const ErrorPage = ({ title }) => {
  useEffect(() => {
    document.title = title || "";
  }, [title]);

  return (
    <>
      <div>Page don't exist</div>
    </>
  );
};

export default ErrorPage;
