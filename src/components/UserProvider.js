import { useState, createContext, useEffect } from "react";


export const UserContext = createContext(null);

function UserProvider({children}) {
    const [user, setUser] = useState(localStorage.getItem('!!username'));
    
    const updateUser = (username) => {
        setUser(username)
        localStorage.setItem("username", username)
    }
    return (
        <UserContext.Provider value={{user, updateUser}}>
            {children}
        </UserContext.Provider>
    );
    
    
}

export default UserProvider;