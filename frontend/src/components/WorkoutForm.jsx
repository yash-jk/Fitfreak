import { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";

const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext();
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const { user } = useAuthContext();

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (!user) {
    setError("You must be logged in");
    return;
  }

  if (!title || !load || !reps || isNaN(load) || isNaN(reps)) {
    setError("Please fill in all the fields correctly.");
    return;
  }

const workout = {
  title: title,
  load: Number(load),
  reps: Number(reps),
};



  const response = await fetch(import.meta.env.VITE_API_URL + "/api/workouts", {
    method: "POST",
    body: JSON.stringify(workout),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.token}`,
    },
  });

  const json = await response.json();

  if (!response.ok) {
    setError(json.error);
    setEmptyFields(json.emptyFields || []);
    console.log(json.error);
  }

  if (response.ok) {
    setTitle("");
    setReps("");
    setLoad("");
    setError(null);
    setEmptyFields([]);
    console.log("New workout added", json);
    dispatch({ type: "CREATE_WORKOUT", payload: json });
  }
  
};



  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Workout</h3>

      <label>Workout Title:</label>
      <input
        type="text"
 className={emptyFields.includes("title") ? "error" : ""}

        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />

      <label>Loads (in kgs):</label>
      <input
        type="text"
        className={emptyFields.includes("load") ? "error" : ""}
        onChange={(e) => setLoad(e.target.value)}
        value={load}
      />

      <label>Reps:</label>
      <input
        type="text"
        className={emptyFields.includes("reps") ? "error" : ""}
        onChange={(e) => setReps(e.target.value)}
        value={reps}
      />

      <button>Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default WorkoutForm;
