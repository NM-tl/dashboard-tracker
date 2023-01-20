// import React, { createContext, useState, useEffect } from 'react';
// import { db } from './firebase-config';
// import {
//   collection,
//   getDocs,
// } from "firebase/firestore";

// export const Context = createContext();

// export const ContextProvider = ({ children }) => {

//     const [tasks, setTastks] = useState([]);

//     const tasksCollectionRef = collection(db, "Tasks");
  
//     useEffect(() => {
//       const getTasks = async () => {
//         const data = await getDocs(tasksCollectionRef);

//         console.log(data)
//         setTastks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
//       };
  
//       getTasks();
//     }, []);

    

//     // tasks.map((task) => { console.log(task) })

//   return (
//     <ContextProvider.Provider value={tasks}>
//       {children}
//     </ContextProvider.Provider>
//   );
// };