import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Login from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import SearchExercises from "./components/SearchExercises";
import { useAuthContext } from "./hooks/useAuthContext";
import Exercises from "./components/Exercises";
import ExerciseDetail from "./pages/ExerciseDetail"

function App() {
  const { user } = useAuthContext();
  const [exercises, setExercises] = useState([]);
  const [bodyPart, setBodyPart] = useState('all');

  return (
    <div className="App">
      <Router>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={user ? <Home /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={user ? <Navigate to="/" /> : <Login />}
            />
            <Route
              path="/signup"
              element={user ? <Navigate to="/" /> : <SignUp />}
            />
            <Route
              path="/exercises"
              element={
                user ? (
                  <>
                    <SearchExercises
                      setExercises={setExercises}
                      bodyPart={bodyPart}
                      setBodyPart={setBodyPart}
                    />
                    <Exercises
                      setExercises={setExercises}
                      exercises={exercises}
                      bodyPart={bodyPart}
                    />
                  </>
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
              <Route path="/exercise/:id" element={<ExerciseDetail />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
