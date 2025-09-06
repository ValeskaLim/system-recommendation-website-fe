import { useEffect, useState } from "react";

const translations: Record<string, string> = {
  en: "Welcome back",
  id: "Selamat datang kembali",
  ja: "お帰りなさい",
  ko: "다시 오신 것을 환영합니다",
  ru: "С возвращением",
};

interface WelcomeMessageProps {
  user: string;
  typingSpeed?: number;
  deletingSpeed?: number;
  delay?: number;
  switchDelay?: number;
}

const WelcomeMessage = ({
  user,
  typingSpeed = 40,
  deletingSpeed = 40,
  delay = 10000,
  switchDelay = 0,
}: WelcomeMessageProps) => {
  const langs = Object.keys(translations);
  const [index, setIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [pauseTime, setPauseTime] = useState(0);

  useEffect(() => {
    const fullText = `${translations[langs[index]]}, ${user}!`;

    const interval = setInterval(
      () => {
        if (pauseTime > 0) {
          setPauseTime((prev) => prev - 1);
          return;
        }

        if (!isDeleting && displayText.length < fullText.length) {
          // Typing
          setDisplayText(fullText.substring(0, displayText.length + 1));
        } else if (!isDeleting && displayText === fullText) {
          // Pause before deleting
          setPauseTime(delay / typingSpeed);
          setIsDeleting(true);
        } else if (isDeleting && displayText.length > 0) {
          // Deleting
          setDisplayText(fullText.substring(0, displayText.length - 1));
        } else if (isDeleting && displayText === "") {
          // Pause before switching language
          setPauseTime(switchDelay / deletingSpeed);
          setIsDeleting(false);
          setIndex((prev) => (prev + 1) % langs.length);
        }
      },
      isDeleting ? deletingSpeed : typingSpeed
    );

    return () => clearInterval(interval);
  }, [
    displayText,
    isDeleting,
    index,
    langs,
    typingSpeed,
    deletingSpeed,
    delay,
    switchDelay,
    user,
    pauseTime,
  ]);

  return (
    <div className="font-semibold text-lg whitespace-pre">
      {displayText}
      <span className="animate-pulse">|</span>
    </div>
  );
};

export default WelcomeMessage;
