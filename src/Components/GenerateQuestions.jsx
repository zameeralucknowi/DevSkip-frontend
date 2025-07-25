import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import publicRequest from '../utils/requestMethods';

const GenerateQuestions = ({ formData }) => {
  const [interview, setInterview] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { type, level, position, techStack, duration } = formData;

  useEffect(() => {
    const generate = async () => {
      try {
        const res = await publicRequest.post(
          '/ask/ai/generate/interview',
          { type, level, position, techStack, duration },
          { withCredentials: true }
        );

        if (res.data.data) {
          setInterview(res.data.data);
          setLoading(true);
        }
      } catch (error) {
        console.error('Error generating interview questions:', error);
        setLoading(false);
      }
    };

    generate();
  }, []);

  const handleInterview = () => {
    navigate('/interview', { state: { interviewData: interview } });
  };

  return (
    <div className="min-h-screen bg-base-300 py-10 px-4">
      <div className="max-w-md mx-auto">
        <div className="bg-gray-600 shadow-xl rounded-xl p-6 text-center">
          <h2 className="text-xl font-semibold mb-4">Ready to Interview?</h2>
          <p className="mb-2">👤 <strong>{'Candidate'}</strong></p>
          <p className="mb-4">📌 <strong>{position}</strong></p>

          {!loading ? (
            <p className="text-gray-500">Generating questions...</p>
          ) : (
            <button
              onClick={handleInterview}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Go to Interview
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default GenerateQuestions;
