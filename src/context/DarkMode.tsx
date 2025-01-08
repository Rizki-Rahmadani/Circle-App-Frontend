// import React, { createContext, ReactNode, useContext, useState } from 'react';

// interface DarkModeType {
//   isDarkMode: boolean;
//   toggleDarkMode: () => void;
// }

// const DarkModeContext = createContext<DarkModeType | undefined>(undefined);

// interface DarModeProviderProps {
//   children: ReactNode;
// }

// export const DarkModeProvider: React.FC<DarModeProviderProps> = ({
//   children,
// }) => {
//   const [isDarkMode, setIsDarkMode] = useState(false);

//   const toggleDarkMode = () => {
//     setIsDarkMode((prevMode) => !prevMode);
//   };

//   return (
//     <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
//       {children}
//     </DarkModeContext.Provider>
//   );
// };

// export const useDarkModeContext = (): DarkModeType => {
//   const context = useContext(DarkModeContext);
//   if (!context) {
//     throw new Error('Error');
//   }
//   return context;
// };
