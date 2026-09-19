import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { Play, Pause, MapPin, Navigation, PackageCheck, Leaf, Crosshair } from 'lucide-react';
import { ASSETS } from '../data/content';

// Register GSAP plugins
gsap.registerPlugin(MotionPathPlugin);

interface DestinationPreset {
  name: string;
  distance: string;
  eta: string;
}

const PRESET_CITIES: DestinationPreset[] = [
  { name: 'Your Location', distance: 'Direct Express', eta: 'Tomorrow, 10:00 AM' },
  { name: 'New York, USA', distance: '11,040 km', eta: '24h Flight Express' },
  { name: 'London, UK', distance: '9,560 km', eta: '28h Direct Route' },
  { name: 'Los Angeles, USA', distance: '8,920 km', eta: '20h Air Freight' },
  { name: 'Paris, France', distance: '9,710 km', eta: '26h Express Cargo' },
];

export const LandoNorrisMotionExperience: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const activeTrackRef = useRef<SVGPathElement>(null);
  const vehicleRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const [destination, setDestination] = useState<string>('Your Location');
  const [distanceText, setDistanceText] = useState<string>('Direct Express');
  const [isDetecting, setIsDetecting] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [bankingAngle, setBankingAngle] = useState<number>(0);
  const [altitude, setAltitude] = useState<number>(10800);

  // SVG dimensions for the flight trajectory
  const svgWidth = 1200;
  const svgHeight = 520;
  
  // Signature S-curve flight trajectory from Kyoto (origin) to User Doorstep (destination)
  const pathD = "M 70 430 C 230 450, 270 130, 520 160 C 780 190, 820 460, 1010 380 C 1100 340, 1140 220, 1150 130";

  // Dynamic milestone text based on journey progress
  const getMilestone = (p: number) => {
    if (p < 20) return 'Stone-ground & nitrogen-sealed at Uji Kyoto farm';
    if (p < 55) return 'Cold-chain express flight cruising at 36,000 ft';
    if (p < 85) return 'Cleared local customs & regional priority sorting';
    if (p < 99) return `Final mile delivery in transit to ${destination}`;
    return `Delivered fresh to your doorstep! Ready to whisk.`;
  };

  useEffect(() => {
    const pathEl = pathRef.current;
    const vehicleEl = vehicleRef.current;
    const containerEl = containerRef.current;
    if (!pathEl || !vehicleEl || !containerEl) return;

    const totalLength = pathEl.getTotalLength();

    const updatePosition = (prog: number) => {
      const clampedProg = Math.max(0, Math.min(1, prog));
      const currentLength = clampedProg * totalLength;
      const point = pathEl.getPointAtLength(currentLength);

      // Tangent angle for smooth banking into flight curves
      const nextLength = Math.min(totalLength, currentLength + 2);
      const nextPoint = pathEl.getPointAtLength(nextLength);
      const angleRad = Math.atan2(nextPoint.y - point.y, nextPoint.x - point.x);
      const angleDeg = (angleRad * 180) / Math.PI;

      // 3D perspective scale: starts normal, grows larger as it zooms closer to destination
      const dynamicScale = 0.82 + Math.sin(clampedProg * Math.PI) * 0.45;

      gsap.set(vehicleEl, {
        x: point.x,
        y: point.y,
        rotation: angleDeg,
        scale: dynamicScale,
        transformOrigin: '50% 50%',
      });

      // Update neon route illumination
      if (activeTrackRef.current) {
        activeTrackRef.current.style.strokeDashoffset = `${totalLength - currentLength}`;
      }

      setProgress(Math.round(clampedProg * 100));
      setBankingAngle(Math.round(angleDeg));
      setAltitude(Math.round(500 + Math.sin(clampedProg * Math.PI) * 10300));
    };

    if (activeTrackRef.current) {
      activeTrackRef.current.style.strokeDasharray = `${totalLength}`;
      activeTrackRef.current.style.strokeDashoffset = `${totalLength}`;
    }

    // Animation timeline decoupled from page scroll
    const ctx = gsap.context(() => {
      const progressObj = { value: 0 };

      const tl = gsap.timeline({
        paused: true,
        onUpdate: () => {
          updatePosition(progressObj.value);
        },
        onComplete: () => {
          setIsPlaying(false);
        },
      });

      tl.fromTo(
        progressObj,
        { value: 0 },
        {
          value: 1,
          duration: 4.8,
          ease: 'power2.inOut',
        }
      );

      timelineRef.current = tl;
      updatePosition(0.04);

      return () => {
        tl.kill();
      };
    }, containerEl);

    return () => ctx.revert();
  }, []);

  const handlePlayToggle = () => {
    if (!timelineRef.current) return;
    if (isPlaying) {
      timelineRef.current.pause();
      setIsPlaying(false);
    } else {
      if (timelineRef.current.progress() === 1) {
        timelineRef.current.restart();
      } else {
        timelineRef.current.play();
      }
      setIsPlaying(true);
    }
  };

  const handleDetectLocation = () => {
    setIsDetecting(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude.toFixed(2);
          const lng = pos.coords.longitude.toFixed(2);
          // Try to derive time zone or coordinates
          const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
          const cityFromTz = tz ? tz.split('/')[1]?.replace(/_/g, ' ') : null;
          const detectedName = cityFromTz ? `${cityFromTz} (${lat}°, ${lng}°)` : `Your Location (${lat}°, ${lng}°)`;
          setDestination(detectedName);
          setDistanceText('Direct GPS Route');
          setIsDetecting(false);
          // Restart animation to celebrate
          if (timelineRef.current) {
            timelineRef.current.restart();
            setIsPlaying(true);
          }
        },
        () => {
          // Fallback if blocked or denied
          const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
          const fallbackCity = tz ? tz.split('/')[1]?.replace(/_/g, ' ') : 'Your Current City';
          setDestination(`${fallbackCity} (Auto-Detected)`);
          setDistanceText('Direct Route');
          setIsDetecting(false);
          if (timelineRef.current) {
            timelineRef.current.restart();
            setIsPlaying(true);
          }
        },
        { timeout: 5000 }
      );
    } else {
      setDestination('Your Local Doorstep');
      setIsDetecting(false);
    }
  };

  const handleSelectCity = (preset: DestinationPreset) => {
    setDestination(preset.name);
    setDistanceText(preset.distance);
    if (timelineRef.current) {
      timelineRef.current.restart();
      setIsPlaying(true);
    }
  };

  return (
    <section
      ref={containerRef}
      id="gsap-curved-motion"
      className="w-full bg-[#0E1110] py-20 sm:py-24 md:py-32 px-4 sm:px-8 md:px-12 lg:px-16 border-b border-white/10 text-stone-200 overflow-hidden relative"
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-[#8BA753]/10 blur-[160px] pointer-events-none rounded-full" />
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff04_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-40" />

      <div className="max-w-[1520px] mx-auto relative z-10">
        {/* Section Header: Origin to User's Location */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white leading-none">
              KYOTO HARVEST → <span className="text-[#8BA753]">TO {destination.toUpperCase()}</span>
            </h2>
            <p className="mt-4 text-xs sm:text-sm md:text-base text-stone-400 max-w-3xl leading-relaxed">
              Experience the direct journey of your matcha: from the 800-year-old volcanic soil of Uji, Kyoto, navigating a high-velocity curved global flight path directly to your location. Dispatch the route to track the cold-chain express flight in real time.
            </p>
          </div>

          {/* Location Picker & Auto-Detect Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 bg-[#171B19] p-2.5 rounded-2xl border border-white/10 self-start lg:self-auto shadow-xl">
            <button
              id="detect-location-btn"
              onClick={handleDetectLocation}
              disabled={isDetecting}
              className="inline-flex items-center justify-center gap-2 bg-[#8BA753] hover:bg-[#9BBB5E] text-[#111413] px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-wider transition-colors shadow-md cursor-pointer disabled:opacity-60"
              title="Detect my current coordinates and route matcha to me"
            >
              <Crosshair className={`w-4 h-4 ${isDetecting ? 'animate-spin' : ''}`} />
              <span>{isDetecting ? 'LOCATING...' : 'LOCATE ME'}</span>
            </button>

            {/* Quick city presets */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
              {PRESET_CITIES.map((city) => (
                <button
                  key={city.name}
                  onClick={() => handleSelectCity(city)}
                  className={`px-3 py-2 rounded-xl text-xs font-medium tracking-wide transition-all shrink-0 ${
                    destination === city.name
                      ? 'bg-white/15 text-white font-semibold border border-white/20 shadow-sm'
                      : 'text-stone-400 hover:text-stone-200 hover:bg-white/5'
                  }`}
                >
                  {city.name.split(',')[0]}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Stage Container: Radar Flight Map with Traversing Package */}
        <div className="mt-12 sm:mt-16 relative bg-[#131715] rounded-3xl border border-white/10 p-5 sm:p-8 lg:p-10 overflow-hidden shadow-2xl">
          {/* Telemetry Radar Top Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pb-6 border-b border-white/5 font-mono text-xs">
            <div className="bg-black/45 rounded-lg p-3 border border-white/5">
              <span className="text-stone-500 text-[10px] uppercase tracking-wider block flex items-center gap-1">
                <Leaf className="w-3 h-3 text-[#8BA753]" />
                ORIGIN
              </span>
              <span className="text-sm font-bold text-white mt-1 block">Uji, Kyoto, Japan</span>
              <span className="text-[10px] text-stone-500">34.88° N, 135.80° E</span>
            </div>

            <div className="bg-black/45 rounded-lg p-3 border border-white/5">
              <span className="text-stone-500 text-[10px] uppercase tracking-wider block flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#BCE738]" />
                DESTINATION
              </span>
              <span className="text-sm font-bold text-[#BCE738] mt-1 block truncate" title={destination}>
                {destination}
              </span>
              <span className="text-[10px] text-stone-500">{distanceText}</span>
            </div>

            <div className="bg-black/45 rounded-lg p-3 border border-white/5">
              <span className="text-stone-500 text-[10px] uppercase tracking-wider block flex items-center gap-1">
                <Navigation className="w-3 h-3 text-[#8BA753]" />
                ROUTE PROGRESS
              </span>
              <span className="text-sm font-bold text-white mt-1 block">{progress}% Completed</span>
              <span className="text-[10px] text-stone-500">Alt: {altitude.toLocaleString()} ft • 4°C Cold Chain</span>
            </div>

            <div className="bg-black/45 rounded-lg p-3 border border-white/5">
              <span className="text-stone-500 text-[10px] uppercase tracking-wider block flex items-center gap-1">
                <PackageCheck className="w-3 h-3 text-[#E5B537]" />
                LIVE STATUS
              </span>
              <span className="text-xs font-bold text-[#E5B537] mt-1 block truncate">
                {progress === 100 ? 'ARRIVED AT DOORSTEP' : 'IN DIRECT TRANSIT'}
              </span>
              <span className="text-[10px] text-stone-400">100% First-Harvest Fresh</span>
            </div>
          </div>

          {/* Current Milestone Status Banner */}
          <div className="mt-4 px-4 py-2.5 bg-black/40 rounded-xl border border-white/5 flex items-center text-xs sm:text-sm font-mono">
            <div className="flex items-center gap-2 text-stone-300">
              <span className="w-2 h-2 rounded-full bg-[#8BA753] animate-ping" />
              <span className="text-stone-400">CURRENT LEG:</span>
              <span className="text-[#A5C963] font-semibold">{getMilestone(progress)}</span>
            </div>
          </div>

          {/* SVG Canvas Area */}
          <div className="relative w-full aspect-[2.1/1] sm:aspect-[2.2/1] min-h-[300px] sm:min-h-[360px] md:min-h-[380px] lg:min-h-[500px] xl:min-h-[580px] mt-6 flex items-center justify-center">
            {/* SVG Flight Trajectory Lines */}
            <svg
              viewBox={`0 0 ${svgWidth} ${svgHeight}`}
              className="absolute inset-0 w-full h-full pointer-events-none"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <linearGradient id="flightTrackGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#8BA753" stopOpacity="0.5" />
                  <stop offset="45%" stopColor="#BCE738" stopOpacity="1" />
                  <stop offset="100%" stopColor="#8BA753" stopOpacity="0.9" />
                </linearGradient>
                <filter id="flightGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Grid Radar Lines */}
              <line x1="0" y1="260" x2="1200" y2="260" stroke="rgba(255,255,255,0.03)" strokeDasharray="4 6" />
              <line x1="600" y1="0" x2="600" y2="520" stroke="rgba(255,255,255,0.03)" strokeDasharray="4 6" />

              {/* Inactive Flight Path Guide */}
              <path
                ref={pathRef}
                d={pathD}
                fill="none"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray="6 8"
              />

              {/* Active Illuminated Route Path */}
              <path
                ref={activeTrackRef}
                d={pathD}
                fill="none"
                stroke="url(#flightTrackGrad)"
                strokeWidth="3.5"
                strokeLinecap="round"
                filter="url(#flightGlow)"
              />

              {/* Waypoints along the trajectory */}
              <circle cx="520" cy="160" r="6" fill="#BCE738" className="animate-pulse" />
              <circle cx="1010" cy="380" r="5" fill="#8BA753" />
            </svg>

            {/* Origin Node Badge (Kyoto, Japan) */}
            <div className="absolute left-[3%] bottom-[12%] pointer-events-none z-10 flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-[#18201A] border-2 border-[#8BA753] flex items-center justify-center shadow-[0_0_15px_rgba(139,167,83,0.4)]">
                <Leaf className="w-5 h-5 text-[#8BA753]" />
              </div>
              <span className="text-[10px] font-mono tracking-widest text-[#8BA753] uppercase bg-black/75 px-2 py-0.5 rounded border border-[#8BA753]/30 mt-1.5 font-bold">
                Origin: Uji Kyoto
              </span>
            </div>

            {/* Destination Node Badge (User's Location) */}
            <div className="absolute right-[2%] top-[12%] pointer-events-none z-10 flex flex-col items-center">
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-[#202816] border-2 border-[#BCE738] flex items-center justify-center shadow-[0_0_25px_rgba(188,231,56,0.6)]">
                  <MapPin className="w-6 h-6 text-[#BCE738] animate-bounce" />
                </div>
                <span className="absolute -inset-2 rounded-full border border-[#BCE738]/40 animate-ping pointer-events-none" />
              </div>
              <span className="text-[11px] font-mono tracking-widest text-white uppercase bg-black/85 px-2.5 py-1 rounded border border-[#BCE738]/50 mt-1.5 font-bold max-w-[170px] truncate text-center shadow-lg">
                {destination}
              </span>
            </div>

            {/* In-Flight Waypoint 1 (Pacific Air Corridor) */}
            <div className="absolute top-[28%] left-[44%] -translate-x-1/2 pointer-events-none text-center hidden sm:block">
              <span className="text-[10px] font-mono tracking-widest text-[#BCE738] uppercase bg-black/75 px-2 py-0.5 rounded border border-[#BCE738]/30">
                Waypoint 01 // Air Corridor 36,000 ft
              </span>
            </div>

            {/* In-Flight Waypoint 2 (Regional Distribution Hub) */}
            <div className="absolute bottom-[22%] right-[20%] pointer-events-none text-center hidden sm:block">
              <span className="text-[10px] font-mono tracking-widest text-stone-400 uppercase bg-black/75 px-2 py-0.5 rounded border border-white/10">
                Waypoint 02 // Priority Regional Hub
              </span>
            </div>

            {/* Traveling Matcha Package (Moved along the curve via GSAP) */}
            <div
              ref={vehicleRef}
              className="absolute top-0 left-0 -ml-14 -mt-14 w-28 h-28 pointer-events-none flex items-center justify-center z-20"
              style={{ willChange: 'transform' }}
            >
              {/* Artisanal Sealed Matcha Tin with Flight Streamers */}
              <div className="relative w-22 h-22 rounded-2xl bg-gradient-to-br from-[#1E251E] via-[#121613] to-[#0A0D0B] border-2 border-[#8BA753] shadow-[0_0_35px_rgba(139,167,83,0.55)] flex flex-col items-center justify-center p-2.5 overflow-hidden">
                <img
                  src={ASSETS.powderBowl}
                  alt="MatchaNova Ceremonial Package in Transit"
                  referrerPolicy="no-referrer"
                  className="w-12 h-12 object-cover rounded-full filter brightness-[1.08] contrast-[1.1] border border-[#8BA753]/50"
                />
                <span className="text-[9px] font-mono font-bold tracking-widest text-[#BCE738] mt-1 uppercase">
                  EN ROUTE
                </span>

                {/* Speed Trail Tail */}
                <span className="absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-1 bg-gradient-to-r from-transparent to-[#8BA753] rounded-full blur-[1px]" />
              </div>
            </div>
          </div>

          {/* Interactive Playback Controller */}
          <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-center sm:justify-start">
            <button
              id="gsap-play-btn"
              onClick={handlePlayToggle}
              className="flex items-center gap-2 bg-[#86A352] hover:bg-[#97B85E] text-[#111413] px-6 py-2.5 rounded-full font-bold text-xs sm:text-sm tracking-wider transition-all shadow-lg active:scale-95 cursor-pointer"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5 fill-current" />
                  <span>PAUSE TRANSIT</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>DISPATCH TO {destination.split(',')[0].toUpperCase()}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
