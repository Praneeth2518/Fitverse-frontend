import {createContext, useContext, useState } from "react";
import api from "../../api/axios.js";

export const ExerciseContext = createContext(null);

export default function ExerciseProvider({ children }) {
    const [exercises, setExercises] = useState(null);

    async function fetchExercises(query) {
        const { data: res } = await api.get("/exercise", { params : query });
        setExercises(res.data);
    }

    return (
        <ExerciseContext.Provider value={{ fetchExercises, exercises }}>
            {children}
        </ExerciseContext.Provider>
    )
}

export const useExercise = () => useContext(ExerciseContext);