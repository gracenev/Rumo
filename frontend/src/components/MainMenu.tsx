import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./ui/button";
import zenBackground from "../assets/zenBackground.jpg";

interface RoomPreferences {
  productivityGoal: string;
  mood: string;
  lighting: string;
}

interface MainMenuProps {
  onComplete: (preferences: RoomPreferences) => void;
}

const questions = [
  {
    id: "productivityGoal",
    title: "What's your productivity goal?",
    subtitle: "Choose the work style that fits your needs",
    options: ["Focused", "Creative"],
  },
  {
    id: "mood",
    title: "What mood do you want?",
    subtitle: "Set the energy level for your space",
    options: ["Calm", "Energetic"],
  },
  {
    id: "lighting",
    title: "What lighting energy do you want?",
    subtitle: "Set the lighting for your space",
    options: ["Warm", "Neutral", "Cool"],
  },
];

export function MainMenu({ onComplete }: MainMenuProps) {
  const [hasStarted, setHasStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [preferences, setPreferences] = useState<RoomPreferences>({
    productivityGoal: "Focused",
    mood: "Calm",
    lighting: "Warm",
  });
  const [hasAnswered, setHasAnswered] = useState<Set<number>>(
    new Set([0, 1, 2]),
  );

  const [isAppLoading, setIsAppLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAppLoading(false);
    }, 2500); // 2.5 seconds is usually the "sweet spot" for a hackathon demo
    return () => clearTimeout(timer);
  }, []);
  // Progress based on current question position
  const progress = hasStarted
    ? ((currentQuestion + 1) / questions.length) * 100
    : 0;
  const question = questions[currentQuestion];

  const handleOptionSelect = (option: string) => {
    const key = question.id as keyof RoomPreferences;
    setPreferences({ ...preferences, [key]: option });
    setHasAnswered(new Set([...hasAnswered, currentQuestion]));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleComplete = () => {
    onComplete(preferences);
  };

  const isLastQuestion = currentQuestion === questions.length - 1;
  const canProceed = hasAnswered.has(currentQuestion);

  return (
    <div className="relative min-h-screen w-full overflow-hidden flex">
      {/* Left Side - Questions Panel (2/3 width) */}
      <div className="relative w-full lg:w-2/3 min-h-screen bg-gradient-to-br from-[#E8E4DD] via-[#DFE5D8] to-[#E8E4DD] flex flex-col">
        {/* Progress Bar - Only show when started */}
        <AnimatePresence>
          {isAppLoading && (
            <motion.div
              key="preloader"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#E8E4DD]"
            >
              {/* A calming, pulsing logo or icon */}
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2.5,
                  ease: "easeInOut",
                }}
                className="mb-8"
              >
                <h2 className="text-3xl font-light tracking-[0.2em] text-[#5B6B52]">
                  RUMO
                </h2>
              </motion.div>

              <div className="w-32 h-[1px] bg-[#D4CFBF] overflow-hidden">
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.5,
                    ease: "linear",
                  }}
                  className="w-full h-full bg-[#6B8E5F]"
                />
              </div>
              <p className="mt-4 text-xs tracking-widest text-[#5B6B52]/60 uppercase">
                Finding your balance
              </p>
            </motion.div>
          )}
        </AnimatePresence>
        {hasStarted && (
          <div className="relative z-10 pt-8 px-6 md:px-12">
            <div className="max-w-2xl mx-auto">
              <div className="mb-2 flex justify-between items-center">
                <span className="text-sm text-[#5B6B52]">
                  Question {currentQuestion + 1} of {questions.length}
                </span>
                <span className="text-sm text-[#5B6B52]">
                  {Math.round(progress)}%
                </span>
              </div>
              <div className="relative h-2 w-full overflow-hidden rounded-full bg-[#D4CFBF]">
                <div
                  className="h-full bg-gradient-to-r from-[#6B8E5F] to-[#8BA878] transition-all duration-500 rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-2xl">
            <AnimatePresence mode="wait">
              {!hasStarted ? (
                <motion.div
                  key="welcome"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="text-center space-y-8"
                >
                  <div className="space-y-4">
                    <h1 className="text-5xl md:text-6xl text-[#2C2416] tracking-tight">
                      Design Your Space
                    </h1>
                    <p className="text-xl text-[#5B6B52] max-w-xl mx-auto">
                      Create a personalized 3D room that matches your
                      productivity goals and desired mood
                    </p>
                  </div>
                  <Button
                    onClick={() => setHasStarted(true)}
                    className="bg-gradient-to-r from-[#6B8E5F] to-[#8BA878] hover:from-[#5A7C4F] hover:to-[#7A9768] text-white px-12 py-8 rounded-full shadow-lg text-lg"
                  >
                    Get Started
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  key={currentQuestion}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="space-y-12"
                >
                  {/* Question Header */}
                  <div className="text-center space-y-3">
                    <h1 className="text-4xl md:text-5xl text-[#2C2416] tracking-tight">
                      {question.title}
                    </h1>
                    <p className="text-lg text-[#5B6B52]">
                      {question.subtitle}
                    </p>
                  </div>

                  {/* Toggle Button Options */}
                  <div className="flex justify-center">
                    <div className="bg-white/60 backdrop-blur-md rounded-3xl p-2 shadow-xl border border-[#C8D5BC]/40 inline-flex gap-2">
                      {question.options.map((option) => {
                        const isSelected =
                          preferences[question.id as keyof RoomPreferences] ===
                          option;
                        return (
                          <button
                            key={option}
                            onClick={() => handleOptionSelect(option)}
                            className={`relative px-10 py-6 rounded-2xl transition-all duration-300 ${
                              isSelected
                                ? "bg-gradient-to-br from-[#6B8E5F] to-[#8BA878] text-white shadow-lg scale-105"
                                : "bg-transparent text-[#5B6B52] hover:bg-white/40"
                            }`}
                          >
                            <span className="text-lg font-medium">
                              {option}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Navigation Buttons */}
                  <div className="flex justify-between items-center pt-8">
                    <Button
                      onClick={handleBack}
                      disabled={currentQuestion === 0}
                      variant="ghost"
                      className="text-[#5B6B52] hover:text-[#2C2416] hover:bg-white/50 disabled:opacity-30"
                    >
                      Back
                    </Button>

                    {isLastQuestion && canProceed ? (
                      <Button
                        onClick={handleComplete}
                        className="bg-gradient-to-r from-[#6B8E5F] to-[#8BA878] hover:from-[#5A7C4F] hover:to-[#7A9768] text-white px-8 py-6 rounded-full shadow-lg"
                      >
                        Create My Space
                      </Button>
                    ) : (
                      <Button
                        onClick={handleNext}
                        disabled={!canProceed}
                        className="bg-gradient-to-r from-[#6B8E5F] to-[#8BA878] hover:from-[#5A7C4F] hover:to-[#7A9768] text-white px-8 py-6 rounded-full shadow-lg disabled:opacity-50"
                      >
                        Next
                      </Button>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Right Side - Frosted Glass Image (1/3 width) */}
      <div className="hidden lg:block relative w-1/3 min-h-screen overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={zenBackground}
            alt=""
            className="h-full w-full object-cover"
          />
        </div>

        {/* Frosted Glass Overlay - less blur to see distinct shapes */}
        <div className="absolute inset-0 backdrop-blur-sm bg-white/15" />

        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-l from-[#E8E4DD]/30 via-transparent to-[#E8E4DD]/50" />
      </div>
    </div>
  );
}
