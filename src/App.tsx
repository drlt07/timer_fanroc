/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Settings, Play, Pause, RotateCcw, ChevronRight, ChevronLeft } from "lucide-react";

interface AllianceData {
  team1Name: string;
  team1Number: string;
  team2Name: string;
  team2Number: string;
  score: number;
}

export default function App() {
  const [redAlliance, setRedAlliance] = useState<AllianceData>({
    team1Name: "Raider Prime",
    team1Number: "16756",
    team2Name: "Bobcat Robotics",
    team2Number: "12398",
    score: 0,
  });

  const [blueAlliance, setBlueAlliance] = useState<AllianceData>({
    team1Name: "Hart Robotics",
    team1Number: "19782",
    team2Name: "Chuckleheads",
    team2Number: "19991",
    score: 0,
  });

  const [eventInfo, setEventInfo] = useState("FANROC 2026");
  const [matchInfo, setMatchInfo] = useState("Trận 1");
  const [videoSrc, setVideoSrc] = useState<string>("/countdown.mp4");
  const [showControls, setShowControls] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Handle Video Upload
  const handleVideoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setVideoSrc(url);
      handleReset();
    }
  };

  // Video Controls
  const handleStart = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handlePause = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleReset = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      handlePause();
    } else {
      handleStart();
    }
  };

  // Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement) return;

      if (e.code === "Space") {
        e.preventDefault();
        togglePlay();
      } else if (e.key.toLowerCase() === "r") {
        handleReset();
      } else if (e.key.toLowerCase() === "c") {
        setShowControls((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isPlaying]);

  return (
    <div className="fixed inset-0 bg-black text-white font-sans overflow-hidden select-none">
      {/* Background Video Layer */}
      <div className="absolute inset-0 flex items-center justify-center bg-zinc-950">
        <video
          ref={videoRef}
          key={videoSrc}
          className="w-full h-full object-contain"
          src={videoSrc}
          onEnded={() => setIsPlaying(false)}
          playsInline
        />
      </div>

      {/* Main Display Overlay */}
      <div className="relative z-10 h-full flex flex-col pointer-events-none">
        {/* Top Bar: Event Info (Black bar with white text) */}
        <div className="w-full bg-black border-b-2 border-blue-500 flex items-center h-12 px-6 shadow-lg">
          <div className="flex-1 flex items-center gap-4 overflow-hidden">
            <div className="bg-white text-black px-3 py-0.5 font-black italic text-sm transform -skew-x-12 flex-shrink-0">
              FANROC
            </div>
            <div className="h-4 w-px bg-zinc-700 flex-shrink-0" />
            <span className="text-sm font-bold tracking-tight uppercase text-zinc-300 truncate">
              {eventInfo}
            </span>
          </div>
          <div className="flex-shrink-0 ml-4">
            <span className="text-sm font-medium tracking-widest text-zinc-400 uppercase">
              {matchInfo}
            </span>
          </div>
        </div>

        {/* Center: Video Area */}
        <div className="flex-grow" />

        {/* Scoreboard Overlay (Bottom) */}
        <div className="grid grid-cols-2 gap-0 w-full">
          {/* Red Alliance */}
          <div className="bg-red-900/40 border-t-4 border-red-600 p-1">
            <div className="space-y-1">
              {/* Team 1 Row */}
              <div className="flex h-10 overflow-hidden rounded-sm">
                <div className="w-28 bg-red-600 flex items-center justify-center font-black text-lg">
                  {redAlliance.team1Number}
                </div>
                <div className="flex-grow bg-white text-black flex items-center px-4 font-bold text-base truncate">
                  {redAlliance.team1Name}
                </div>
                <div className="w-16 bg-black flex items-center justify-center font-black text-xl text-red-500">
                  {redAlliance.score}
                </div>
              </div>
              {/* Team 2 Row */}
              <div className="flex h-10 overflow-hidden rounded-sm">
                <div className="w-28 bg-red-600 flex items-center justify-center font-black text-lg">
                  {redAlliance.team2Number}
                </div>
                <div className="flex-grow bg-white text-black flex items-center px-4 font-bold text-base truncate">
                  {redAlliance.team2Name}
                </div>
                <div className="w-16 bg-black flex items-center justify-center font-black text-xl text-red-500">
                  {redAlliance.score}
                </div>
              </div>
            </div>
            {/* Red Score Label */}
            <div className="mt-1 flex justify-between items-center px-2">
              <span className="text-[10px] font-black uppercase tracking-tighter text-red-500">Red Alliance</span>
              <span className="text-2xl font-black tabular-nums text-white drop-shadow-lg">{redAlliance.score}</span>
            </div>
          </div>

          {/* Blue Alliance */}
          <div className="bg-blue-900/40 border-t-4 border-blue-600 p-1">
            <div className="space-y-1">
              {/* Team 1 Row */}
              <div className="flex h-10 overflow-hidden rounded-sm">
                <div className="w-28 bg-blue-600 flex items-center justify-center font-black text-lg">
                  {blueAlliance.team1Number}
                </div>
                <div className="flex-grow bg-white text-black flex items-center px-4 font-bold text-base truncate">
                  {blueAlliance.team1Name}
                </div>
                <div className="w-16 bg-black flex items-center justify-center font-black text-xl text-blue-500">
                  {blueAlliance.score}
                </div>
              </div>
              {/* Team 2 Row */}
              <div className="flex h-10 overflow-hidden rounded-sm">
                <div className="w-28 bg-blue-600 flex items-center justify-center font-black text-lg">
                  {blueAlliance.team2Number}
                </div>
                <div className="flex-grow bg-white text-black flex items-center px-4 font-bold text-base truncate">
                  {blueAlliance.team2Name}
                </div>
                <div className="w-16 bg-black flex items-center justify-center font-black text-xl text-blue-500">
                  {blueAlliance.score}
                </div>
              </div>
            </div>
            {/* Blue Score Label */}
            <div className="mt-1 flex justify-between items-center px-2">
              <span className="text-[10px] font-black uppercase tracking-tighter text-blue-500">Blue Alliance</span>
              <span className="text-2xl font-black tabular-nums text-white drop-shadow-lg">{blueAlliance.score}</span>
            </div>
          </div>
        </div>

        {/* Floating Controls (Small, at the bottom center) */}
        <div className="absolute bottom-32 left-1/2 -translate-x-1/2 z-30 flex items-center gap-4 pointer-events-auto">
          <button
            onClick={handleStart}
            className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center shadow-xl hover:bg-zinc-200 transition-all active:scale-90"
            title="Start Match"
          >
            <Play className="w-4 h-4 fill-current ml-0.5" />
          </button>
          <button
            onClick={handleReset}
            className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center shadow-xl hover:bg-zinc-200 transition-all active:scale-90"
            title="Reset Timer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Control Panel (Admin) */}
      <AnimatePresence>
        {showControls && (
          <>
            {/* Backdrop to close when clicking outside */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowControls(false)}
              className="fixed inset-0 bg-black/40 z-40 cursor-pointer"
            />
            <motion.div
              initial={{ x: 400 }}
              animate={{ x: 0 }}
              exit={{ x: 400 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-80 bg-zinc-900/95 backdrop-blur-xl border-l border-white/10 z-50 p-6 shadow-2xl overflow-y-auto"
            >
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-blue-500" />
                <h3 className="font-bold uppercase tracking-wider text-sm">Broadcast Controls</h3>
              </div>
              <button
                onClick={() => setShowControls(false)}
                className="p-1 hover:bg-white/10 rounded-lg transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Playback Controls */}
            <div className="space-y-3 mb-8">
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={handleStart}
                  className="flex flex-col items-center justify-center gap-2 p-4 bg-blue-600 hover:bg-blue-500 rounded-xl transition-all active:scale-95"
                >
                  <Play className="w-6 h-6 fill-current" />
                  <span className="text-[10px] font-bold uppercase">Start</span>
                </button>
                <button
                  onClick={handlePause}
                  className="flex flex-col items-center justify-center gap-2 p-4 bg-zinc-700 hover:bg-zinc-600 rounded-xl transition-all active:scale-95"
                >
                  <Pause className="w-6 h-6 fill-current" />
                  <span className="text-[10px] font-bold uppercase">Pause</span>
                </button>
                <button
                  onClick={handleReset}
                  className="flex flex-col items-center justify-center gap-2 p-4 bg-red-600 hover:bg-red-500 rounded-xl transition-all active:scale-95"
                >
                  <RotateCcw className="w-6 h-6" />
                  <span className="text-[10px] font-bold uppercase">Reset</span>
                </button>
              </div>

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleVideoChange}
                accept="video/*"
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-3 bg-zinc-800 hover:bg-zinc-700 border border-white/10 rounded-xl text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
              >
                <Play className="w-3 h-3" />
                Change Video File
              </button>
            </div>

            <div className="space-y-8">
              {/* Event Info */}
              <section className="space-y-4">
                <h4 className="text-xs font-bold uppercase text-zinc-500 tracking-widest border-b border-white/5 pb-2">Event Info</h4>
                <div className="space-y-3">
                  <div>
                    <label className="text-[10px] uppercase text-zinc-500 font-bold mb-1 block">Event Name</label>
                    <input
                      type="text"
                      value={eventInfo}
                      onChange={(e) => setEventInfo(e.target.value)}
                      className="w-full bg-zinc-800 border border-white/5 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase text-zinc-500 font-bold mb-1 block">Match Status</label>
                    <input
                      type="text"
                      value={matchInfo}
                      onChange={(e) => setMatchInfo(e.target.value)}
                      className="w-full bg-zinc-800 border border-white/5 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                </div>
              </section>

              {/* Red Alliance Inputs */}
              <section className="space-y-4">
                <h4 className="text-xs font-bold uppercase text-red-500 tracking-widest border-b border-red-500/20 pb-2">Red Alliance</h4>
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-2">
                    <div className="col-span-1">
                      <label className="text-[10px] uppercase text-zinc-500 font-bold mb-1 block">No.</label>
                      <input
                        type="text"
                        value={redAlliance.team1Number}
                        onChange={(e) => setRedAlliance({ ...redAlliance, team1Number: e.target.value })}
                        className="w-full bg-zinc-800 border border-white/5 rounded-lg px-3 py-2 text-sm"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="text-[10px] uppercase text-zinc-500 font-bold mb-1 block">Name</label>
                      <input
                        type="text"
                        value={redAlliance.team1Name}
                        onChange={(e) => setRedAlliance({ ...redAlliance, team1Name: e.target.value })}
                        className="w-full bg-zinc-800 border border-white/5 rounded-lg px-3 py-2 text-sm"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="col-span-1">
                      <label className="text-[10px] uppercase text-zinc-500 font-bold mb-1 block">No.</label>
                      <input
                        type="text"
                        value={redAlliance.team2Number}
                        onChange={(e) => setRedAlliance({ ...redAlliance, team2Number: e.target.value })}
                        className="w-full bg-zinc-800 border border-white/5 rounded-lg px-3 py-2 text-sm"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="text-[10px] uppercase text-zinc-500 font-bold mb-1 block">Name</label>
                      <input
                        type="text"
                        value={redAlliance.team2Name}
                        onChange={(e) => setRedAlliance({ ...redAlliance, team2Name: e.target.value })}
                        className="w-full bg-zinc-800 border border-white/5 rounded-lg px-3 py-2 text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] uppercase text-zinc-500 font-bold mb-1 block">Score</label>
                    <input
                      type="number"
                      value={redAlliance.score}
                      onChange={(e) => setRedAlliance({ ...redAlliance, score: parseInt(e.target.value) || 0 })}
                      className="w-full bg-zinc-800 border border-white/5 rounded-lg px-3 py-2 text-sm"
                    />
                  </div>
                </div>
              </section>

              {/* Blue Alliance Inputs */}
              <section className="space-y-4">
                <h4 className="text-xs font-bold uppercase text-blue-500 tracking-widest border-b border-blue-500/20 pb-2">Blue Alliance</h4>
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-2">
                    <div className="col-span-1">
                      <label className="text-[10px] uppercase text-zinc-500 font-bold mb-1 block">No.</label>
                      <input
                        type="text"
                        value={blueAlliance.team1Number}
                        onChange={(e) => setBlueAlliance({ ...blueAlliance, team1Number: e.target.value })}
                        className="w-full bg-zinc-800 border border-white/5 rounded-lg px-3 py-2 text-sm"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="text-[10px] uppercase text-zinc-500 font-bold mb-1 block">Name</label>
                      <input
                        type="text"
                        value={blueAlliance.team1Name}
                        onChange={(e) => setBlueAlliance({ ...blueAlliance, team1Name: e.target.value })}
                        className="w-full bg-zinc-800 border border-white/5 rounded-lg px-3 py-2 text-sm"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="col-span-1">
                      <label className="text-[10px] uppercase text-zinc-500 font-bold mb-1 block">No.</label>
                      <input
                        type="text"
                        value={blueAlliance.team2Number}
                        onChange={(e) => setBlueAlliance({ ...blueAlliance, team2Number: e.target.value })}
                        className="w-full bg-zinc-800 border border-white/5 rounded-lg px-3 py-2 text-sm"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="text-[10px] uppercase text-zinc-500 font-bold mb-1 block">Name</label>
                      <input
                        type="text"
                        value={blueAlliance.team2Name}
                        onChange={(e) => setBlueAlliance({ ...blueAlliance, team2Name: e.target.value })}
                        className="w-full bg-zinc-800 border border-white/5 rounded-lg px-3 py-2 text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] uppercase text-zinc-500 font-bold mb-1 block">Score</label>
                    <input
                      type="number"
                      value={blueAlliance.score}
                      onChange={(e) => setBlueAlliance({ ...blueAlliance, score: parseInt(e.target.value) || 0 })}
                      className="w-full bg-zinc-800 border border-white/5 rounded-lg px-3 py-2 text-sm"
                    />
                  </div>
                </div>
              </section>
            </div>

            <div className="mt-12 pt-6 border-t border-white/5">
              <p className="text-[10px] text-zinc-600 font-medium leading-relaxed">
                Keyboard Shortcuts:<br />
                <span className="text-zinc-400">SPACE</span> - Start/Pause<br />
                <span className="text-zinc-400">R</span> - Reset<br />
                <span className="text-zinc-400">C</span> - Toggle Controls
              </p>
            </div>
          </motion.div>
        </>
        )}
      </AnimatePresence>

      {/* Toggle Button (when hidden) - Moved to TOP RIGHT to avoid covering team names */}
      <AnimatePresence>
        {!showControls && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => setShowControls(true)}
            className="fixed top-2 right-2 p-2 bg-zinc-900/80 backdrop-blur border border-white/10 rounded-full shadow-xl hover:bg-zinc-800 transition-colors z-40 group pointer-events-auto"
          >
            <Settings className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
