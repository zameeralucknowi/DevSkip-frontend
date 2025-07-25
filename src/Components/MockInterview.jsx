import { useState } from "react";
import GenerateQuestions from "./GenerateQuestions";

const MockInterview = () => {
  const [formData, setFormData] = useState({
    type: [],
    level: "",
    position: "",
    techStack: "",
    duration: "",
  });

  const [showGeneratedComponent, setShowGeneratedComponent] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTypeToggle = (type) => {
    const types = formData.type.includes(type)
      ? formData.type.filter((t) => t !== type)
      : [...formData.type, type];
    setFormData({ ...formData, type: types });
  };

  const handleGenerateClick = () => {
    console.log(formData)
    const { type, level, position, techStack, duration } = formData;
    if (!type.length || !level || !position || !techStack || !duration) {
      alert("Please fill out all fields.");
      return;
    }
    setShowGeneratedComponent(true);
  };

  if (showGeneratedComponent) {
    return <GenerateQuestions formData={formData} />
  }

  return (
    <div className="max-w-xl mx-auto mt-8 p-6 bg-gray-800 shadow-lg rounded-xl space-y-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Mock Interview Setup</h2>

      {/* Job Position */}
      <input
        type="text"
        name="position"
        placeholder="Role (e.g., Backend Developer)"
        className="w-full border p-2 rounded"
        onChange={handleInputChange}
      />

      {/* Job Level */}
      <input
        type="text"
        name="level"
        placeholder="Level (e.g., Junior, Mid, Senior)"
        className="w-full border p-2 rounded"
        onChange={handleInputChange}
      />

      {/* tech stack */}
      <input
        type="text"
        name="techStack"
        placeholder="Tech Stack (e.g., Node.js, MERN)"
        className="w-full border p-2 rounded"
        onChange={handleInputChange}
      />

      {/* Job Types (Multi-select) */}
      <div className="flex justify-between">
        {["Technical", "Behavioral", "Managerial"].map((type) => (
          <button
            key={type}
            onClick={() => handleTypeToggle(type)}
            className={`px-4 py-2 rounded ${
              formData.type.includes(type)
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Duration */}
      <div className="flex justify-between mt-2">
        {[5, 10, 15, 30].map((min) => (
          <button
            key={min}
            onClick={() => setFormData({ ...formData, duration: min })}
            className={`px-4 py-2 rounded ${
              formData.duration === min
                ? "bg-green-600 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            {min} min
          </button>
        ))}
      </div>

      {/* Generate Button */}
      <button
        onClick={handleGenerateClick}
        className="w-full mt-6 bg-blue-500 text-white py-2 rounded hover:bg-blue-700"
      >
        Generate Questions
      </button>
    </div>
  );
};

export default MockInterview;
