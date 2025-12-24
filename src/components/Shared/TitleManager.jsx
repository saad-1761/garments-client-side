import { useEffect } from "react";
import { useLocation, useMatches } from "react-router-dom";

const APP_NAME = "Fabrica"; // ✅ change to your brand name

const TitleManager = () => {
  const matches = useMatches();
  const location = useLocation();

  useEffect(() => {
    const lastWithTitle = [...matches].reverse().find((m) => m.handle?.title);

    let pageTitle = lastWithTitle?.handle?.title;

    if (typeof pageTitle === "function") {
      pageTitle = pageTitle({
        params: lastWithTitle?.params || {},
        pathname: location.pathname,
      });
    }

    document.title = pageTitle ? `${pageTitle} | ${APP_NAME}` : APP_NAME;
  }, [matches, location.pathname]);

  return null;
};

export default TitleManager;
