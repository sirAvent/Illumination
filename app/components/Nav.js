import { useState } from "react";

export default function Nav({
  stage,
  isRecording,
  interimTranscript,
  processedTexts,
}) {
  const [isActivityMonitor, setIsActivityMonitor] = useState(false);
  const handleCheckboxChange = () => {
    setIsActivityMonitor(!isActivityMonitor);
  };
  return (
    <nav className="z-100 w-100 flex flex-row justify-between items-center py-[32px] px-[40px]">
      <h1 className="text-[36px] font-bold leading-tight">Illumination</h1>
      <div className="flex flex-row gap-10 font-normal">
        <div>
          <label className="toggle-switch flex items-center relative w-max cursor-pointer select-none ">
            <span className="mr-3">Activity Monitor</span>
            <input
              type="checkbox"
              onChange={handleCheckboxChange}
              checked={isActivityMonitor}
              className="appearance-none transition-colors cursor-pointer w-12 h-7 rounded-full bg-red-500 checked:bg-green-500"
            />
            <span className="w-5 h-5 right-6 absolute rounded-full transform transition-transform bg-gray-200" />
          </label>
          <div
            className={`${isActivityMonitor ? "opacity-100" : "opacity-0"}
            absolute transition-opacity duration-300 ease-in w-[528px] min-h-[250px]
            border-4 border-black rounded-lg right-[40px] translate-y-[32px] bg-white
            p-7 flex flex-col gap-4 text-lg z-10`}
          >
            <span className="font-bold text-2xl flex flex-row justify-between">
              Activity Monitor
              <img
                className="cursor-pointer"
                onClick={handleCheckboxChange}
                src="close.svg"
                height="22px"
                width="22px"
              />
            </span>
            <p>Interim: {interimTranscript}</p>
            <p>Result: {processedTexts[processedTexts.length - 1]}</p>
          </div>
        </div>
        <div
          className={`${stage === 2 && isRecording ? "opacity-100" : "opacity-0"} transition-all duration-500 flex flex-row gap-2 items-center`}
        >
          Listening:
          <img src="/audio.gif" height="25px" width="25px" />
        </div>
      </div>
    </nav>
  );
}
