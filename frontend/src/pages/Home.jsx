import React, { useRef, useState } from "react";
import ShinyText from "../styles/ShinyText";
import { assets } from "../assets/assets.js";
import Editor from "@monaco-editor/react";
import Select from "react-select";
import { Behavior, GoogleGenAI } from "@google/genai";
import Markdown from "react-markdown";
import RingLoader from "react-spinners/RingLoader";
import remarkGfm from "remark-gfm";
import { BeatLoader } from "react-spinners";
import toast, { Toaster } from "react-hot-toast";

const Home = () => {
  const options = [
    { value: "javascript", label: "JavaScript" },
    { value: "python", label: "Python" },
    { value: "java", label: "Java" },
    { value: "csharp", label: "C#" },
    { value: "cpp", label: "C++" },
    { value: "php", label: "PHP" },
    { value: "ruby", label: "Ruby" },
    { value: "go", label: "Go" },
    { value: "swift", label: "Swift" },
    { value: "kotlin", label: "Kotlin" },
    { value: "typescript", label: "TypeScript" },
    { value: "rust", label: "Rust" },
    { value: "dart", label: "Dart" },
    { value: "scala", label: "Scala" },
    { value: "perl", label: "Perl" },
    { value: "haskell", label: "Haskell" },
    { value: "elixir", label: "Elixir" },
    { value: "r", label: "R" },
    { value: "matlab", label: "MATLAB" },
    { value: "bash", label: "Bash" },
  ];

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "#18181b", // dark background (similar to bg-zinc-900)
      borderColor: "#3f3f46",
      color: "#fff",
      width: "100%",
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "#18181b", // dropdown bg
      color: "#fff",
      width: "100%",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#fff", // selected option text
      width: "100%",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#27272a" : "#18181b", // hover effect
      color: "#fff",
      cursor: "pointer",
      // width: "30%"
    }),
    input: (provided) => ({
      ...provided,
      color: "#fff",
      width: "100%",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#a1a1aa", // placeholder text color
      width: "100%",
    }),
  };

  const [selectedOptions, setSelectedOptions] = useState(options[0]);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");

  const reviewRef = useRef(null);

  const ai = new GoogleGenAI({
    apiKey: import.meta.env.VITE_GOOGLE_GEMINI_KEY,
  }); // replace "YOUR_API_KEY" with you api key

  async function reviewCode() {
    setResponse("");
    setLoading(true);

    if (reviewRef.current) {
      reviewRef.current.scrollIntoView({ behavior: "smooth" });
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `You are an expert-level software developer, skilled in writing efficient, clean, and advanced code.
            I’m sharing a piece of code written in ${selectedOptions.value}.
            Your job is to deeply review this code and provide the following:

            1️⃣ A quality rating: Better, Good, Normal, or Bad.
            2️⃣ Detailed suggestions for improvement, including best practices and advanced alternatives.
            3️⃣ A clear explanation of what the code does, step by step.
            4️⃣ A list of any potential bugs or logical errors, if found.
            5️⃣ Identification of syntax errors or runtime errors, if present.
            6️⃣ Solutions and recommendations on how to fix each identified issue.

            Analyze it like a senior developer reviewing a pull request.

            Code: ${code}
        `,
    });
    setResponse(response.text);
    setLoading(false);
  }

  return (
    <div className="bg-zinc-900 w-screen">
      <Toaster position="top-right" reverseOrder={false} />
      {/* Navbar */}
      <div className="px-4 md:px-10 py-1 md:py-4">
        <h1 className="text-white text-xl md:3xl lg:text-5xl">
          Code Sensei 🧙🏻‍♂️
        </h1>
      </div>

      {/* White line */}
      <div className="w-screen bg-white h-1"></div>

      {/* Hero Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 pt-4 md:pt-10 px-4 md:px-10">
        {/* Text */}
        <div className="flex flex-col px-10 py-10">
          <ShinyText
            text="Welcome to Code Sensei 🧙🏻‍♂️"
            disabled={false}
            speed={3}
            className="text-xl md:text-4xl font-semibold "
          />
          <ShinyText
            text="Your AI Code Review Companion"
            disabled={false}
            speed={3}
            className="text-xl md:text-4xl font-semibold "
          />

          {/* Gap */}
          <div className="h-10"></div>

          <ShinyText
            text="From syntax suggestions to architecture-level insights,"
            disabled={false}
            speed={3}
            className="text-md md:text-xl font-semibold "
          />
          <ShinyText
            text="Code Sensei helps you:"
            disabled={false}
            speed={3}
            className="text-md md:text-xl font-semibold "
          />

          {/* Gap */}
          <div className="h-7"></div>

          <ShinyText
            text="• Catch bugs and logic issues "
            disabled={false}
            speed={3}
            className="text-md md:text-xl font-semibold"
          />
          <ShinyText
            text="• Optimize code readability and maintainability"
            disabled={false}
            speed={3}
            className="text-md md:text-xl font-semibold "
          />
          <ShinyText
            text="• Stay aligned with coding standards and patterns"
            disabled={false}
            speed={3}
            className="text-md md:text-xl font-semibold "
          />
          <ShinyText
            text="• Learn with contextual explanations and tips"
            disabled={false}
            speed={3}
            className="text-md md:text-xl font-semibold "
          />
        </div>

        {/* Image */}
        <div className="flex items-center justify-center">
          <img src={assets.code} alt="" />
        </div>
      </div>

      {/* Gap */}
      <div className="h-15"></div>

      <div className="grid grid-cols-1 md:grid-cols-2 px-4 md:px-10">
        {/* Code */}
        <div className="flex flex-col gap-4">
          <div className="flex gap-4 mt-3">
            <Select
              className="w-full"
              value={selectedOptions}
              onChange={(e) => {
                setSelectedOptions(e);
              }}
              options={options}
              styles={customStyles}
            />
            <button
              className="bg-indigo-600 hover:bg-indigo-500 transition-all text-white font-medium px-6 py-2 rounded-lg shadow-md"
              onClick={() => {
                if (code.trim() === "") {
                  toast.error("Please enter code first");
                } else {
                  reviewCode();
                }
              }}
            >
              Review
            </button>
          </div>
          <Editor
            theme="vs-dark"
            height="70vh"
            language={selectedOptions.value}
            value={code}
            onChange={(e) => {
              setCode(e);
            }}
            className="rounded-xl shadow-lg border border-zinc-700 overflow-hidden"
          />
        </div>

        {/* Text */}
        <div className="flex flex-col items-start justify-center py-4 md:px-20">
          {loading ? (
            <>
              <div className="flex items-center gap-3">
                <ShinyText
                  text="Please wait"
                  disabled={false}
                  speed={3}
                  className="text-xl md:text-4xl font-semibold"
                />
                <BeatLoader color="#ffffff" size={10} />
              </div>
              <ShinyText
                text="while we are reviewing your code"
                disabled={false}
                speed={3}
                className="text-xl md:text-4xl font-semibold"
              />
            </>
          ) : (
            <>
              <ShinyText
                text="Enter your Code"
                disabled={false}
                speed={3}
                className="text-xl md:text-4xl font-semibold"
              />
              <ShinyText
                text="Then press Review"
                disabled={false}
                speed={3}
                className="text-xl md:text-4xl font-semibold"
              />
            </>
          )}
        </div>
      </div>

      {/* Gap */}
      <div className="h-5 md:h-15"></div>

      {/* Review */}
      <div
        ref={reviewRef}
        className="text-white max-h-[70vh] overflow-y-auto px-4 md:px-10 py-6 bg-zinc-800 rounded-xl shadow-inner border border-zinc-700 prose prose-invert"
      >
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <RingLoader color="#9333ea" />
          </div>
        ) : (
          <Markdown remarkPlugins={[remarkGfm]}>{response}</Markdown>
        )}
      </div>

      {/* Gap */}
      <div className="h-5 md:h-15"></div>

      {/* Footer */}
      <div className="flex items-center justify-center">
        <ShinyText
          text="Thankyou for using Code Sensei 🧙🏻‍♂️"
          disabled={false}
          speed={3}
          className="text-xl md:text-4xl px-4 md:px-10 pb-4 md:pb-10"
        />
      </div>
    </div>
  );
};

export default Home;
