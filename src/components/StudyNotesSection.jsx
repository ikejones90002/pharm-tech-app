import { useState, useEffect } from "react";

export default function StudyNotesSection() {
  const [notes, setNotes] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("studyNotes");
    if (saved) setNotes(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("studyNotes", notes);
  }, [notes]);

  return (
    <div className="section">
      <h2>Study Guide</h2>
      <p>Add your exam notes or blueprint summaries here!</p>
      <textarea
        style={{
          width: "100%",
          height: "300px",
          padding: "10px",
          borderRadius: "8px",
          fontSize: "16px",
          boxSizing: "border-box",
        }}
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />
    </div>
  );
}
