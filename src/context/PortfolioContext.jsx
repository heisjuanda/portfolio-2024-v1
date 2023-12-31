/* eslint-disable react/prop-types */
import { createContext, useMemo, useState } from "react";

export const PortfolioContext = createContext();

const PortfolioProvider = ({ children }) => {
  const [isFromMenu, setIsFromMenu] = useState(false);

  const values = useMemo(
    () => ({
      isFromMenu,
      setIsFromMenu,
    }),
    [isFromMenu, setIsFromMenu]
  );

  return (
    <PortfolioContext.Provider value={values}>
      {children}
    </PortfolioContext.Provider>
  );
};

export default PortfolioProvider;
