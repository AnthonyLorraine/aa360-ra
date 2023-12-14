import React, { useState } from 'react';
import PropertiesContext from './PropertiesContext';

const PropertiesContextProvider = ({ children }) => {
  const [currentProperty, setCurrentProperty] = useState(null);

  const updateCurrentProperty = (newProperty) => {
    setCurrentProperty(newProperty);
  };

  return (
    <PropertiesContext.Provider value={{ currentProperty, updateCurrentProperty }}>
      {children}
    </PropertiesContext.Provider>
  );
};

export default PropertiesContextProvider;
