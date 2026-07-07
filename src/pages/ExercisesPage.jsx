import {useContext, useEffect, useState} from "react";
import {useExercise} from "../context/ExerciseContext.jsx";

export default function Exercises() {
    const [filters, setFilters] = useState({
        search: "",
        category: "",
        primaryMuscleGroup: "",
        equipment: "",
        force: "",
        mechanic: "",
        movementPattern: "",
        difficulty: ""
    });
    const [loading, setLoading] = useState(true);
    const [apiError, setApiError] = useState(null);
    const {fetchExercises, exercises} = useExercise();

    function handleFilterChange(filter) {
        const { name, value } = filter.target;
        setFilters(prev => ({
            ...prev,
            [name]: value
        }))
    }

    function resetFilters() {
        setFilters({
            search: "",
            category: "",
            primaryMuscleGroup: "",
            equipment: "",
            force: "",
            mechanic: "",
            movementPattern: "",
            difficulty: ""
        });

        setLoading(true);
    }


    async function fetchData() {
        try {
            setLoading(true);

            const query = {};

            Object.entries(filters).forEach(([key, value]) => {
                if(value !== "") query[key] = value;
            })

            const data = await fetchExercises(query);
        } catch(e) {
            setApiError(e.response.data.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        console.log(filters);
        fetchData();
    }, [filters])

    return (
        <div className="exercises-page">
            <h1>Exercises</h1>
            <div className="filter-navbar">
                <input
                    type="text"
                    placeholder="Search exercises..."
                    className="filter-input"
                    name="search"
                    value={filters.search}
                    onChange={handleFilterChange}
                />

                {/* Category */}
                <select name="category" value={filters.category} onChange={handleFilterChange} className="filter-select">
                    <option value="">All Categories</option>
                    <option value="Strength">Strength</option>
                    <option value="Cardio">Cardio</option>
                    <option value="Flexibility">Flexibility</option>
                    <option value="Balance">Balance</option>
                    <option value="HIIT">HIIT</option>
                    <option value="Mobility">Mobility</option>
                    <option value="Other">Other</option>
                </select>

                {/* Primary Muscle */}
                <select className="filter-select" name="primaryMuscleGroup" value={filters.primaryMuscleGroup} onChange={handleFilterChange}>
                    <option value="">All Primary Muscles</option>
                    <option value="Chest">Chest</option>
                    <option value="Back">Back</option>
                    <option value="Shoulders">Shoulders</option>
                    <option value="Biceps">Biceps</option>
                    <option value="Triceps">Triceps</option>
                    <option value="Forearms">Forearms</option>
                    <option value="Abs">Abs</option>
                    <option value="Obliques">Obliques</option>
                    <option value="Quadriceps">Quadriceps</option>
                    <option value="Hamstrings">Hamstrings</option>
                    <option value="Glutes">Glutes</option>
                    <option value="Calves">Calves</option>
                    <option value="Full Body">Full Body</option>
                </select>

                {/* Equipment */}
                <select className="filter-select" name="equipment" value={filters.equipment} onChange={handleFilterChange}>
                    <option value="">All Equipment</option>
                    <option value="None">None</option>
                    <option value="Dumbbell">Dumbbell</option>
                    <option value="Barbell">Barbell</option>
                    <option value="Machine">Machine</option>
                    <option value="Cable">Cable</option>
                    <option value="Kettlebell">Kettlebell</option>
                    <option value="Resistance Band">Resistance Band</option>
                    <option value="Pull-up Bar">Pull-up Bar</option>
                    <option value="Bench">Bench</option>
                    <option value="Other">Other</option>
                </select>

                {/* Force */}
                <select className="filter-select" name="force" value={filters.force} onChange={handleFilterChange}>
                    <option value="">All Forces</option>
                    <option value="Push">Push</option>
                    <option value="Pull">Pull</option>
                    <option value="Static">Static</option>
                </select>

                {/* Mechanic */}
                <select className="filter-select" name="mechanic" value={filters.mechanic} onChange={handleFilterChange}>
                    <option value="">All Mechanics</option>
                    <option value="Compound">Compound</option>
                    <option value="Isolation">Isolation</option>
                </select>

                {/* Movement Pattern */}
                <select className="filter-select" name="movementPattern" value={filters.movementPattern} onChange={handleFilterChange}>
                    <option value="">All Movement Patterns</option>
                    <option value="Horizontal Push">Horizontal Push</option>
                    <option value="Vertical Push">Vertical Push</option>
                    <option value="Horizontal Pull">Horizontal Pull</option>
                    <option value="Vertical Pull">Vertical Pull</option>
                    <option value="Squat">Squat</option>
                    <option value="Hinge">Hinge</option>
                    <option value="Lunge">Lunge</option>
                    <option value="Carry">Carry</option>
                    <option value="Rotation">Rotation</option>
                    <option value="Core">Core</option>
                </select>

                {/* Difficulty */}
                <select className="filter-select" name="difficulty" value={filters.difficulty} onChange={handleFilterChange}>
                    <option value="">All Difficulty</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                </select>

                <button className="filter-btn">
                    Apply Filters
                </button>

                <button className="filter-btn reset-btn" onClick={resetFilters}>
                    Reset
                </button>
            </div>
            { apiError && <p>{apiError}</p>}
            {loading ? (
                <p>Loading...</p>
            ): (exercises.length === 0)? (
                <p>No Exercises Found</p>
            ): (
                <div className="exercises-container">
                    {
                        exercises.map(exercise => (
                            <div key={exercise._id} className="exercise-container">
                                <h1>{exercise._id}</h1>
                            </div>
                        ))
                    }
                </div>
            )}
        </div>
    )
}