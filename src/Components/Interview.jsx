
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Vapi from '@vapi-ai/web';
import { useLocation } from 'react-router';

const Interview = () => {

  const  {state} = useLocation();
  const {interviewData} = state;
  const user = useSelector((store) => store.user);
  const [isCallActive, setIsCallActive] = useState(false);
  const [callStatus, setCallStatus] = useState('Ready to start interview');

  // Process interview data to handle different structures
  const processedQuestions = React.useMemo(() => {
    if (!interviewData?.questions) return [];
    
    // If questions is an array directly
    if (Array.isArray(interviewData.questions)) {
      return interviewData.questions.filter(q => q && q.trim() !== '');
    }
    
    // If questions has a questions property (nested structure)
    if (interviewData.questions.questions && Array.isArray(interviewData.questions.questions)) {
      return interviewData.questions.questions.filter(q => q && q.trim() !== '');
    }
    
    return [];
  }, [interviewData]);

  console.log('Processed questions:', processedQuestions);

  // Initialize Vapi instance properly
  const [vapi] = useState(() => new Vapi(import.meta.env.VITE_VAPI_PUBLIC_KEY));

  useEffect(() => {
    // Set up event listeners

    console.log(interviewData)
    vapi.on('ready', () => {
      console.log('🟢 Vapi is ready');
      setCallStatus('Ready - click Start Interview');
    });

    vapi.on('call-start', () => {
      console.log('📞 Call started');
      setIsCallActive(true);
      setCallStatus('Interview in progress...');
    });

    vapi.on('call-end', () => {
      console.log('❌ Call ended');
      setIsCallActive(false);
      setCallStatus('Interview completed');
    });

    vapi.on('error', (err) => {
      console.error('❗Vapi Error:', err);
      setCallStatus(`Error: ${err.message}`);
      setIsCallActive(false);
    });

    vapi.on('speech-start', () => {
      setCallStatus('Listening to your answer...');
    });

    vapi.on('speech-end', () => {
      setCallStatus('Processing your response...');
    });

    // Cleanup function
    return () => {
      vapi.removeAllListeners();
      if (isCallActive) {
        vapi.stop();
      }
    };
  }, [vapi, isCallActive]);

  const startCall = async () => {
    try {
      setCallStatus('Starting interview...');
      
      const assistantOptions = {
        name: "Interview Buddy",
        firstMessage: `Hi ${user?.firstName || 'there'}! Welcome to your AI interview, ready to rock the stage? Let's get started with your ${interviewData?.position || 'technical'} interview. I have 10 questions prepared for you. Here's your first question: ${processedQuestions[0] || 'Can you tell me about yourself?'}`,
        voice: {
          provider: "playht",
          voiceId: "jennifer"
        },
        transcriber: {
          provider: "deepgram",
          model: "nova-2",
          language: "en-US",
        },
        model: {
          provider: "groq",
          model: "llama3-8b-8192",
          messages: [
            {
              role: "system",
              content:`You are an AI voice assistant conducting a ${interviewData?.position || 'technical'} interview for a ${interviewData?.level || 'mid-level'} position.

CRITICAL RULES - YOU MUST FOLLOW THESE EXACTLY:
1. You MUST ask EXACTLY 10 questions - no more, no less
2. You MUST keep track of which question number you're on
3. You MUST NOT end the interview until all 10 questions are asked and answered
4. You MUST wait for the candidate's complete answer before moving to the next question
5. You MUST NOT provide lengthy feedback or engage in conversations
6. You MUST NOT say goodbye or end the call until question 10 is completed

QUESTION TRACKING:
- Question 1 is already asked in the greeting message
- You are currently on question 1
- After the candidate answers question 1, move to question 2
- Continue this pattern until question 10 is completed
- if the user asks you to explain, you should asnwer to the current question and proceed with other question to ask 

YOUR 10 INTERVIEW QUESTIONS:
${processedQuestions.slice(0, 10).map((q, i) => `${i + 1}. ${q}`).join('\n') || 
`1. Can you tell me about yourself?
2. What are your key strengths?
3. What challenges have you faced in your career?
4. Why are you interested in this position?
5. How do you handle pressure and deadlines?
6. What are your career goals?
7. Tell me about a project you're proud of.
8. How do you stay updated with industry trends?
9. What questions do you have for us?
10. Is there anything else you'd like to add?`}

EXACT RESPONSE FORMAT AFTER EACH ANSWER:
- Questions 1-9: "Thank you. Here's question [NUMBER]: [QUESTION]"
- Question 10: "Thank you. That completes our interview with all 10 questions covered. Thanks for your time!"

RESPONSE RULES:
- Keep acknowledgments to 2-3 words maximum ("Thank you", "Great", "Interesting")
- Immediately ask the next question
- Never engage in follow-up discussions
- Never ask clarifying questions
- Never provide feedback beyond brief acknowledgment
- Always state the question number clearly
- Never end early - you must reach question 10

FORBIDDEN ACTIONS:
- Do NOT end the interview before question 10
- Do NOT ask follow-up questions
- Do NOT provide detailed feedback
- Do NOT engage in conversation beyond the script
- Do NOT skip questions
- Do NOT conclude early

Remember: The candidate expects exactly 10 questions. You must deliver exactly 10 questions.`,
            }
          ],
          temperature: 0.1,
          maxTokens: 150
        },
        endCallFunctionEnabled: false,
        recordingEnabled: false,
        silenceTimeoutSeconds: 45,
        maxDurationSeconds: 3600,
      };

      await vapi.start(assistantOptions);
    } catch (error) {
      console.error('Error starting call:', error);
      setCallStatus(`Failed to start: ${error.message}`);
    }
  };

  const handleHangup = () => {
    vapi.stop();
    console.log("🚫 Call manually stopped");
    setIsCallActive(false);
    setCallStatus('Interview ended');
  };

  const handleStartInterview = () => {
    if (!isCallActive) {
      startCall();
    }
  };

  return (
    <div className="flex flex-col items-center justify-between h-[90%] p-6 bg-base-300">
      {/* Status indicator */}
      <div className="w-full max-w-4xl mb-4">
        <div className="text-center">
          <span className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${
            isCallActive 
              ? 'bg-green-100 text-green-800' 
              : 'bg-blue-100 text-blue-800'
          }`}>
            {callStatus}
          </span>
        </div>
      </div>

      {/* Top section with profiles */}
      <div className="flex justify-between items-center w-full max-w-4xl">
        {/* AI Agent */}
        <div className="flex flex-col items-center">
          <div className={`relative ${isCallActive ? 'animate-pulse' : ''}`}>
            <img
              src="https://media.istockphoto.com/id/1467878602/photo/humanoid-robots-revolutionizing-mundane-tasks.webp?a=1&b=1&s=612x612&w=0&k=20&c=Ab2tFSsAqjQavXRMKGpshgfDERCHZqB4bGs-64NW4cw="
              alt="AI Agent"
              className="w-60 h-60 rounded-full mb-2 object-cover"
            />
            {isCallActive && (
              <div className="absolute top-2 right-2 w-6 h-6 bg-green-500 rounded-full animate-pulse"></div>
            )}
          </div>
          <p className="text-lg font-semibold">AI Interviewer</p>
        </div>

        {/* User */}
        <div className="flex flex-col items-center">
          <div className={`relative ${isCallActive ? 'animate-pulse' : ''}`}>
            <img
              src={user?.photoUrl || 'https://via.placeholder.com/240x240?text=User'}
              alt="User"
              className="w-60 h-60 rounded-full mb-2 object-cover"
            />
            {isCallActive && (
              <div className="absolute top-2 right-2 w-6 h-6 bg-blue-500 rounded-full animate-pulse"></div>
            )}
          </div>
          <p className="text-lg font-semibold">{user?.firstName || 'Candidate'}</p>
        </div>
      </div>

      {/* Control buttons */}
      <div className="w-full max-w-4xl flex justify-center gap-4 mt-12">
        {!isCallActive ? (
          <button
            onClick={handleStartInterview}
            className="bg-green-500 text-white px-8 py-4 rounded-lg hover:bg-green-600 transition-colors font-semibold text-lg shadow-lg"
          >
            Start Interview
          </button>
        ) : (
          <button
            onClick={handleHangup}
            className="bg-red-500 text-white px-8 py-4 rounded-lg hover:bg-red-600 transition-colors font-semibold text-lg shadow-lg"
          >
            End Interview
          </button>
        )}
      </div>

      {/* Instructions */}
      <div className="w-full max-w-4xl mt-6 text-center text-sm text-gray-600 bg-white p-4 rounded-lg shadow">
        <h3 className="font-semibold mb-2">Interview Instructions:</h3>
        <ul className="text-left space-y-1">
          <li>• Ensure your microphone is working and you're in a quiet space</li>
          <li>• Listen carefully to each question before responding</li>
          <li>• Speak clearly and wait for the AI to finish asking before answering</li>
          <li>• The interview covers exactly 10 {interviewData?.position || 'technical'} questions</li>
          <li>• Take your time to provide thoughtful answers</li>
          <li>• The AI will clearly state each question number as it progresses</li>
        </ul>
      </div>
    </div>
  );
};

export default Interview;

