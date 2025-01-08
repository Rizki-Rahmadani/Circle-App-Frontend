// import React, { createContext, useContext, useState, ReactNode } from 'react';

// interface User {
//   username: string;
//   email: string;
//   password: string;
// }

// interface UserContextType {
//   user: User | null;
//   setUser: (user: User | null) => void;
// }

// const UserContext = createContext<UserContextType | undefined>(undefined);

// interface UserProviderProps {
//   children: ReactNode;
// }

// export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
//   const [user, setUser] = useState<User | null>(null);

//   return (
//     <UserContext.Provider value={{ user, setUser }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// export const useUserContext = () => {
//   const context = useContext(UserContext);
//   if (context === undefined) {
//     throw new Error('useUserContext error');
//   }
//   return context;
// };
