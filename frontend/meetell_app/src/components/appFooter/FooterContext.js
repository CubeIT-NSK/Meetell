import React, { createContext, useContext, useState } from 'react';

const FooterContext = createContext();

export const useFooter = () => useContext(FooterContext);

export const FooterProvider = ({ children }) => {
  const [isFooterVisible, setFooterVisible] = useState(true);

  return (
    <FooterContext.Provider value={{ isFooterVisible, setFooterVisible }}>
      {children}
    </FooterContext.Provider>
  );
};
