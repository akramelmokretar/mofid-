'use client';

import Link from "next/link";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ChevronDown, Users, Sparkles, Globe, ArrowRight, CheckCircle, Building2, GraduationCap, Beaker, Github, Linkedin, Twitter, Mail, ShieldCheck } from "lucide-react";
import { useEffect, useState, useRef } from "react";

// Navigation Component - Basel Supercluster Style with Advanced Features
function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isNavHovered, setIsNavHovered] = useState(false);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const navHoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  // Page load animation
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Scroll event for progress bar and background transition
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      
      // Calculate scroll progress
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      const totalScroll = docHeight - windowHeight;
      const scrolled = window.scrollY;
      const progress = totalScroll > 0 ? (scrolled / totalScroll) * 100 : 0;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Mouse tracking for glow effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (navRef.current) {
        const rect = navRef.current.getBoundingClientRect();
        setMousePos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleMouseEnter = (dropdown: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setActiveDropdown(dropdown);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  // Nav hover handlers for page dimming effect
  const handleNavMouseEnter = () => {
    if (navHoverTimeoutRef.current) {
      clearTimeout(navHoverTimeoutRef.current);
    }
    setIsNavHovered(true);
  };

  const handleNavMouseLeave = () => {
    navHoverTimeoutRef.current = setTimeout(() => {
      setIsNavHovered(false);
      setActiveDropdown(null);
    }, 200);
  };

  const navLinks = [
    {
      label: "Why Us",
      href: "#why-us",
      dropdown: [
        { label: "Our Mission", href: "#mission", icon: Sparkles },
        { label: "Innovation Hub", href: "#innovation", icon: Beaker },
        { label: "Global Reach", href: "#global", icon: Globe },
      ],
    },
    {
      label: "Talent",
      href: "#talent",
      dropdown: [
        { label: "Find Talent", href: "#find-talent", icon: Users },
        { label: "Join Our Network", href: "#join", icon: GraduationCap },
        { label: "Success Stories", href: "#stories", icon: CheckCircle },
      ],
    },
    {
      label: "Ecosystem",
      href: "#ecosystem",
      dropdown: [
        { label: "Partners", href: "#partners", icon: Building2 },
        { label: "Research Groups", href: "#research", icon: Beaker },
        { label: "Community", href: "#community", icon: Users },
      ],
    },
  ];

  return (
    <>
      {/* Scroll Progress Bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-[#005EAD] z-[100] transition-all"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Page Dim Overlay - Basel Style */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 pointer-events-none transition-opacity duration-500 ${
          isNavHovered ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden="true"
      />

      <motion.nav
        ref={navRef}
        initial={{ opacity: 0, y: -20 }}
        animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-3 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-40px)] max-w-7xl"
        onMouseEnter={handleNavMouseEnter}
        onMouseLeave={handleNavMouseLeave}
      >
        {/* Glow effect that follows cursor */}
        <div
          className="absolute inset-0 rounded-full blur-3xl opacity-0 transition-opacity pointer-events-none"
          style={{
            background: `radial-gradient(600px at ${mousePos.x}px ${mousePos.y}px, rgba(0, 94, 173, 0.15), transparent 80%)`,
            opacity: scrolled ? 0 : 1,
          }}
        />

        {/* Main Nav Container */}
        <div
          className={`relative backdrop-blur-lg rounded-full border transition-all duration-500 ${
            scrolled
              ? "bg-black/60 border-[#333333]"
              : "bg-black/30 border-[#333333]"
          }`}
          style={{ padding: "12px 20px" }}
        >
          {/* Inner Container */}
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
              <div className="w-9 h-9 rounded-lg bg-[#005EAD] flex items-center justify-center">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <span className="text-white font-semibold text-base tracking-tight group-hover:text-[#005EAD] transition-colors hidden sm:inline">
                Mofid
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div 
              className="hidden md:flex items-center gap-0.5 relative"
              onMouseLeave={() => setHoveredLink(null)}
            >
              {navLinks.map((link) => (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => {
                    handleMouseEnter(link.label);
                    setHoveredLink(link.label);
                  }}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    className={`flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium transition-colors relative group ${
                      activeDropdown === link.label
                        ? "text-[#005EAD]"
                        : "text-white/80 hover:text-white"
                    }`}
                  >
                    {/* Sliding pill highlight */}
                    {hoveredLink === link.label && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full bg-white/10 backdrop-blur-sm border border-[#005EAD]/30"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                    <ChevronDown
                      className={`relative z-10 w-4 h-4 transition-transform duration-200 ${
                        activeDropdown === link.label ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Glassmorphism Dropdown */}
                  <AnimatePresence>
                    {activeDropdown === link.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 mt-3 w-56 py-2 rounded-xl bg-black/80 backdrop-blur-lg border border-[#333333] shadow-2xl"
                      >
                        {link.dropdown.map((item) => (
                          <Link
                            key={item.label}
                            href={item.href}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                          >
                            <item.icon className="w-4 h-4 text-[#005EAD]" />
                            {item.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Connect Button */}
            <Link
              href="#connect"
              className="hidden md:inline-flex items-center gap-1.5 px-5 py-2 bg-[#005EAD] hover:bg-[#004a8a] text-white text-sm font-medium rounded-full transition-all hover:scale-105 flex-shrink-0"
            >
              Connect
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2 text-white flex-shrink-0">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </motion.nav>
    </>
  );
}

// Hero Section — Advanced 3D Typography with Shimmer
// Medical Tech Floating Particles Component
function MedicalParticles() {
  const particles = [
    { type: "plus", x: "12%", y: "25%", size: 12, duration: 20, delay: 0 },
    { type: "dot", x: "85%", y: "20%", size: 6, duration: 18, delay: 1 },
    { type: "plus", x: "78%", y: "75%", size: 10, duration: 22, delay: 2 },
    { type: "dot", x: "20%", y: "70%", size: 8, duration: 24, delay: 3 },
    { type: "plus", x: "90%", y: "45%", size: 8, duration: 19, delay: 1.5 },
    { type: "dot", x: "8%", y: "50%", size: 5, duration: 21, delay: 2.5 },
  ];

  return (
    <>
      {particles.map((particle, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [0, -25, 0, 20, 0],
            x: [0, 12, -8, 5, 0],
            opacity: [0.2, 0.5, 0.3, 0.4, 0.2],
            rotateZ: [0, 90, 180, 270, 360],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        >
          {particle.type === "plus" ? (
            <svg viewBox="0 0 24 24" className="w-full h-full text-[#005EAD]/40">
              <path
                fill="currentColor"
                d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"
              />
            </svg>
          ) : (
            <div className="w-full h-full rounded-full bg-[#005EAD]/30" />
          )}
        </motion.div>
      ))}
    </>
  );
}

// 3D Glassmorphic Stethoscope Component
function GlassmorphicStethoscope({ mouseX, mouseY }: { mouseX: number; mouseY: number }) {
  const [isNearChestPiece, setIsNearChestPiece] = useState(false);
  const stethoscopeRef = useRef<HTMLDivElement>(null);

  // Spring physics for smooth 3D rotation
  const rotateX = useSpring(0, { stiffness: 60, damping: 25 });
  const rotateY = useSpring(0, { stiffness: 60, damping: 25 });
  const floatY = useSpring(0, { stiffness: 40, damping: 20 });

  useEffect(() => {
    rotateX.set(mouseY * 20);
    rotateY.set(-mouseX * 20);
  }, [mouseX, mouseY, rotateX, rotateY]);

  // Floating animation
  useEffect(() => {
    let frame: number;
    let time = 0;
    const animate = () => {
      time += 0.02;
      floatY.set(Math.sin(time) * 8);
      frame = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(frame);
  }, [floatY]);

  // Check if mouse is near the chest piece
  useEffect(() => {
    const checkProximity = () => {
      if (!stethoscopeRef.current) return;
      const rect = stethoscopeRef.current.getBoundingClientRect();
      const chestPieceX = rect.left + rect.width * 0.5;
      const chestPieceY = rect.top + rect.height * 0.75;
      const mousePageX = (mouseX + 1) * window.innerWidth / 2;
      const mousePageY = (mouseY + 1) * window.innerHeight / 2;
      const distance = Math.hypot(mousePageX - chestPieceX, mousePageY - chestPieceY);
      setIsNearChestPiece(distance < 150);
    };
    checkProximity();
  }, [mouseX, mouseY]);

  return (
    <motion.div
      ref={stethoscopeRef}
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[350px] md:w-[380px] md:h-[440px] lg:w-[420px] lg:h-[480px] pointer-events-none"
      style={{
        rotateX,
        rotateY,
        y: floatY,
        transformStyle: "preserve-3d",
        transformPerspective: 1200,
      }}
    >
      {/* Aura glow behind stethoscope */}
      <div
        className="absolute inset-[-20%] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(0, 94, 173, 0.2) 0%, rgba(0, 94, 173, 0.05) 50%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* SVG Stethoscope */}
      <svg
        viewBox="0 0 200 240"
        className="w-full h-full relative z-10"
        style={{ filter: "drop-shadow(0 0 30px rgba(0, 94, 173, 0.3))" }}
      >
        <defs>
          {/* Glassmorphic gradient for tubing */}
          <linearGradient id="tubeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0.15)" />
            <stop offset="50%" stopColor="rgba(255, 255, 255, 0.08)" />
            <stop offset="100%" stopColor="rgba(255, 255, 255, 0.12)" />
          </linearGradient>

          {/* Glow filter */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Pulse gradient for animation */}
          <linearGradient id="pulseGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent">
              <animate attributeName="offset" values="-0.3;1" dur="3s" repeatCount="indefinite" />
            </stop>
            <stop offset="15%" stopColor="#005EAD">
              <animate attributeName="offset" values="-0.15;1.15" dur="3s" repeatCount="indefinite" />
            </stop>
            <stop offset="30%" stopColor="transparent">
              <animate attributeName="offset" values="0;1.3" dur="3s" repeatCount="indefinite" />
            </stop>
          </linearGradient>

          {/* Chest piece radial gradient */}
          <radialGradient id="chestPieceGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0.2)" />
            <stop offset="70%" stopColor="rgba(255, 255, 255, 0.05)" />
            <stop offset="100%" stopColor="rgba(0, 94, 173, 0.1)" />
          </radialGradient>
        </defs>

        {/* Earpieces */}
        <g className="earpieces">
          {/* Left earpiece */}
          <ellipse
            cx="60" cy="20" rx="12" ry="8"
            fill="url(#tubeGradient)"
            stroke="#005EAD"
            strokeWidth="1"
            filter="url(#glow)"
            style={{ backdropFilter: "blur(10px)" }}
          />
          {/* Right earpiece */}
          <ellipse
            cx="140" cy="20" rx="12" ry="8"
            fill="url(#tubeGradient)"
            stroke="#005EAD"
            strokeWidth="1"
            filter="url(#glow)"
          />
        </g>

        {/* Headset / Y-tube structure */}
        <g className="tubing">
          {/* Left tube from earpiece */}
          <path
            d="M60 28 Q60 50, 70 70 Q80 90, 85 110"
            fill="none"
            stroke="url(#tubeGradient)"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <path
            d="M60 28 Q60 50, 70 70 Q80 90, 85 110"
            fill="none"
            stroke="#005EAD"
            strokeWidth="1.5"
            strokeLinecap="round"
            filter="url(#glow)"
          />
          {/* Pulse on left tube */}
          <path
            d="M60 28 Q60 50, 70 70 Q80 90, 85 110"
            fill="none"
            stroke="url(#pulseGradient)"
            strokeWidth="4"
            strokeLinecap="round"
            opacity="0.8"
          />

          {/* Right tube from earpiece */}
          <path
            d="M140 28 Q140 50, 130 70 Q120 90, 115 110"
            fill="none"
            stroke="url(#tubeGradient)"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <path
            d="M140 28 Q140 50, 130 70 Q120 90, 115 110"
            fill="none"
            stroke="#005EAD"
            strokeWidth="1.5"
            strokeLinecap="round"
            filter="url(#glow)"
          />
          {/* Pulse on right tube */}
          <path
            d="M140 28 Q140 50, 130 70 Q120 90, 115 110"
            fill="none"
            stroke="url(#pulseGradient)"
            strokeWidth="4"
            strokeLinecap="round"
            opacity="0.8"
          />

          {/* Junction where tubes meet */}
          <circle
            cx="100" cy="115"
            r="8"
            fill="url(#tubeGradient)"
            stroke="#005EAD"
            strokeWidth="1.5"
            filter="url(#glow)"
          />

          {/* Main tube going down to chest piece */}
          <path
            d="M100 123 L100 170"
            fill="none"
            stroke="url(#tubeGradient)"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <path
            d="M100 123 L100 170"
            fill="none"
            stroke="#005EAD"
            strokeWidth="1.5"
            strokeLinecap="round"
            filter="url(#glow)"
          />
          {/* Pulse on main tube */}
          <path
            d="M100 123 L100 170"
            fill="none"
            stroke="url(#pulseGradient)"
            strokeWidth="4"
            strokeLinecap="round"
            opacity="0.8"
          />
        </g>

        {/* Chest Piece (Diaphragm) with heartbeat animation */}
        <motion.g
          className="chest-piece"
          animate={isNearChestPiece ? {
            scale: [1, 1.08, 1, 1.05, 1],
          } : { scale: 1 }}
          transition={isNearChestPiece ? {
            duration: 0.8,
            repeat: Infinity,
            ease: "easeInOut",
          } : { duration: 0.3 }}
          style={{ transformOrigin: "100px 195px" }}
        >
          {/* Outer ring */}
          <circle
            cx="100" cy="195"
            r="32"
            fill="url(#chestPieceGradient)"
            stroke="#005EAD"
            strokeWidth="2"
            filter="url(#glow)"
          />
          {/* Inner diaphragm */}
          <circle
            cx="100" cy="195"
            r="22"
            fill="rgba(255, 255, 255, 0.1)"
            stroke="rgba(0, 94, 173, 0.6)"
            strokeWidth="1"
          />
          {/* Center highlight */}
          <circle
            cx="95" cy="190"
            r="8"
            fill="rgba(255, 255, 255, 0.15)"
          />
          {/* Heartbeat pulse ring */}
          <motion.circle
            cx="100" cy="195"
            r="25"
            fill="none"
            stroke="#005EAD"
            strokeWidth="2"
            animate={isNearChestPiece ? {
              r: [25, 40, 25],
              opacity: [0.6, 0, 0.6],
            } : { opacity: 0 }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
        </motion.g>
      </svg>

      {/* Additional ambient glow when near chest piece */}
      <motion.div
        className="absolute left-1/2 bottom-[15%] -translate-x-1/2 w-32 h-32 rounded-full pointer-events-none"
        animate={isNearChestPiece ? {
          opacity: [0.3, 0.6, 0.3],
          scale: [1, 1.2, 1],
        } : { opacity: 0 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          background: "radial-gradient(circle, rgba(0, 94, 173, 0.4) 0%, transparent 70%)",
          filter: "blur(20px)",
        }}
      />
    </motion.div>
  );
}

function HeroSection() {
  const heroText = "The Intelligent Framework for Modern Engineering";
  const words = heroText.split(" ");
  const heroRef = useRef<HTMLElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Track mouse position relative to hero center (-1 to 1)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Spring values for smooth text perspective
  const textRotateX = useSpring(0, { stiffness: 100, damping: 30 });
  const textRotateY = useSpring(0, { stiffness: 100, damping: 30 });

  useEffect(() => {
    // Text rotates opposite to orb
    textRotateX.set(-mousePosition.y * 8);
    textRotateY.set(mousePosition.x * 8);
  }, [mousePosition, textRotateX, textRotateY]);

  // Container variants for staggered children
  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.3,
      },
    },
  };

  // Word variants with motion blur effect
  const wordVariants = {
    hidden: {
      opacity: 0,
      filter: "blur(16px)",
      x: -20,
      scale: 1.1,
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      x: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen pt-24 flex items-center justify-center overflow-hidden"
      style={{ perspective: "1200px" }}
    >
      {/* Dynamic Mesh Gradient Background */}
      <div className="absolute inset-0 hero-mesh-gradient" />
      
      {/* Medical Tech Floating Particles */}
      <MedicalParticles />

      {/* 3D Glassmorphic Stethoscope */}
      <GlassmorphicStethoscope mouseX={mousePosition.x} mouseY={mousePosition.y} />

      {/* Content with 3D perspective */}
      <motion.div
        className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8 text-center"
        style={{
          rotateX: textRotateX,
          rotateY: textRotateY,
          transformStyle: "preserve-3d",
        }}
      >
        <motion.div
          initial={{ opacity: 0, rotateX: 25, y: 40 }}
          animate={{ opacity: 1, rotateX: 0, y: 0 }}
          transition={{ duration: 1.1, ease: "easeOut" }}
        >
          {/* 3D Shimmer Heading with Staggered Word Reveal + Motion Blur */}
          <motion.h1
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="hero-shimmer-text text-5xl md:text-6xl lg:text-7xl xl:text-[80px] font-black tracking-tighter leading-[1.1] text-balance mb-8"
            style={{ fontFamily: "var(--font-geist), sans-serif" }}
          >
            {words.map((word, wordIndex) => (
              <motion.span
                key={wordIndex}
                variants={wordVariants}
                className="inline-block hero-word-glow"
                style={{ marginRight: "0.25em" }}
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>

          {/* Sub-heading */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            className="text-base md:text-lg text-white/55 max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Purpose-built for precision and speed. Designed for the AI era.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="#connect"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#005EAD] hover:bg-[#004a8a] text-white font-medium rounded-lg transition-all hover:scale-105"
            >
              {"Let's Talk"}
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="#learn-more"
              className="inline-flex items-center gap-2 px-8 py-4 border border-[#333333] hover:border-[#005EAD] text-white font-medium rounded-lg transition-all hover:bg-white/5"
            >
              Learn More
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-white/50 rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}

// Stats Section
function StatsSection() {
  const stats = [
    { value: "500+", label: "Healthcare Professionals" },
    { value: "100+", label: "Medical Facilities" },
    { value: "50+", label: "Research Partners" },
    { value: "10th", label: "For Quality of Care" },
  ];

  return (
    <section className="py-24 bg-[#111111]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#005EAD] mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-white/60 uppercase tracking-wider">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Features Section
function FeaturesSection() {
  const features = [
    {
      icon: Users,
      title: "Access Top Talent",
      description: "Connect with the industry's best healthcare professionals and specialists.",
    },
    {
      icon: Globe,
      title: "Global Ecosystem",
      description: "Join a thriving network of medical facilities and research institutions.",
    },
    {
      icon: Sparkles,
      title: "AI-Powered Care",
      description: "Leverage cutting-edge AI to enhance diagnosis and treatment.",
    },
    {
      icon: CheckCircle,
      title: "Quality Assured",
      description: "Certified excellence in healthcare delivery and patient outcomes.",
    },
  ];

  return (
    <section id="why-us" className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 text-balance">
            The Supercluster Advantage
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto text-pretty">
            Not just numbers. Your competitive edge in modern healthcare.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-xl bg-[#111111] border border-[#333333] hover:border-[#005EAD]/50 transition-colors group"
            >
              <div className="w-12 h-12 rounded-lg bg-[#005EAD]/10 flex items-center justify-center mb-4 group-hover:bg-[#005EAD]/20 transition-colors">
                <feature.icon className="w-6 h-6 text-[#005EAD]" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-white/60 text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// CTA Section
function CTASection() {
  return (
    <section id="connect" className="py-24 bg-[#111111]">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 text-balance">
            Ready to Transform Healthcare?
          </h2>
          <p className="text-lg text-white/60 mb-10 text-pretty">
            Join the ecosystem that&apos;s shaping the future of medical innovation.
          </p>
          <Link
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#005EAD] hover:bg-[#004a8a] text-white font-medium rounded-lg transition-all hover:scale-105"
          >
            Get Started
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// FAQ Section — Bento-style grid
const FAQ_ITEMS = [
  {
    question: "What exactly is the Mofid Ecosystem?",
    answer:
      "The Mofid Project is a high-performance platform engineered to provide a seamless, organized user experience, centralizing critical services into one unified interface.",
  },
  {
    question: "Who is the primary audience for this platform?",
    answer:
      "Built for visionaries and professionals alike, Mofid is designed for anyone seeking an intuitive, high-efficiency way to navigate complex digital environments.",
  },
  {
    question: "What core capabilities define the Mofid experience?",
    answer:
      "The architecture prioritizes user-centric design, fluid navigation, and structured data hierarchy to ensure rapid information retrieval.",
  },
  {
    question: "What was the driving vision behind its creation?",
    answer:
      "Mofid was developed to solve the friction of modern workflows, offering a simplified, elite method for managing digital assets and services.",
  },
  {
    question: "How can I connect with the team for support?",
    answer:
      "Our engineering team is ready to assist. You can reach out directly via our integrated contact channels for technical support or general inquiries.",
  },
];

function FAQCard({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Cursor position relative to the card (for border trace)
  const cursorX = useMotionValue(-200);
  const cursorY = useMotionValue(-200);

  // Raw tilt values, then smoothed with springs for a buttery feel
  const rotX = useMotionValue(0);
  const rotY = useMotionValue(0);
  const springRotX = useSpring(rotX, { stiffness: 200, damping: 20, mass: 0.4 });
  const springRotY = useSpring(rotY, { stiffness: 200, damping: 20, mass: 0.4 });
  const rotateX = useTransform(springRotX, (v) => `${v}deg`);
  const rotateY = useTransform(springRotY, (v) => `${v}deg`);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    cursorX.set(px);
    cursorY.set(py);

    // Normalize to -0.5..0.5, then map to a gentle tilt range
    const nx = px / rect.width - 0.5;
    const ny = py / rect.height - 0.5;
    rotY.set(nx * 8);   // left/right tilt
    rotX.set(-ny * 8);  // up/down tilt
  };

  const handleMouseLeave = () => {
    setHovered(false);
    rotX.set(0);
    rotY.set(0);
    cursorX.set(-200);
    cursorY.set(-200);
  };

  // Reactive background for the border-trace gradient, tracking the cursor
  const traceBackground = useTransform(
    [cursorX, cursorY],
    ([x, y]) =>
      `radial-gradient(180px circle at ${x}px ${y}px, #005EAD 0%, rgba(0,94,173,0.35) 35%, transparent 70%)`
  );

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1000,
        transformStyle: "preserve-3d",
        boxShadow: open ? "0 0 0 1px #005EAD" : undefined,
      }}
      className="group relative rounded-[20px] border border-[#333333] bg-[#111111] p-6 flex flex-col gap-4 cursor-pointer will-change-transform"
      onMouseEnter={() => setHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => setOpen((v) => !v)}
    >
      {/* Border Trace — 2px glow that follows the cursor along the edge */}
      <motion.div
        aria-hidden="true"
        className="faq-border-trace"
        style={{
          background: traceBackground,
          opacity: hovered ? 1 : 0,
        }}
      />

      {/* Inner content — pushed forward in 3D space for depth */}
      <div style={{ transform: "translateZ(20px)" }} className="flex flex-col gap-4">
        {/* Number badge — Geist Mono */}
        <span
          className="text-xs text-[#005EAD] tracking-widest"
          style={{ fontFamily: "var(--font-geist-mono), ui-monospace, monospace" }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Question row */}
        <div className="flex items-start justify-between gap-4">
          <h3
            className="text-base md:text-lg font-semibold text-white leading-snug"
            style={{ fontFamily: "var(--font-geist), sans-serif" }}
          >
            {question}
          </h3>
          <ChevronDown
            className={`w-5 h-5 text-white/40 flex-shrink-0 mt-0.5 transition-transform duration-300 ${
              open ? "rotate-180 text-[#005EAD]" : ""
            }`}
          />
        </div>

        {/* Answer — smooth accordion */}
        <AnimatePresence initial={false}>
          {open && (
            <motion.p
              key="answer"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="text-sm text-white/55 leading-relaxed overflow-hidden"
            >
              {answer}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// Testimonial data for the marquee
const TESTIMONIALS = [
  {
    id: "1",
    name: "Dr. Sarah Chen",
    role: "Neurologist",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&crop=face",
    comment: "The platform&apos;s real-time sync has transformed how I access patient records during consultations.",
  },
  {
    id: "2",
    name: "James Miller",
    role: "Verified Patient",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    comment: "Finally, a healthcare system that respects my time. Appointments are seamless.",
  },
  {
    id: "3",
    name: "Dr. Amara Okonkwo",
    role: "Chief of Cardiology",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=100&h=100&fit=crop&crop=face",
    comment: "AI-assisted diagnostics have improved our accuracy by over 40%. Truly remarkable.",
  },
  {
    id: "4",
    name: "Elena Rodriguez",
    role: "Verified Patient",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    comment: "I can track my health metrics in one place. The dashboard is incredibly intuitive.",
  },
  {
    id: "5",
    name: "Dr. Michael Foster",
    role: "Oncologist",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop&crop=face",
    comment: "Cross-department collaboration has never been smoother. Data flows effortlessly.",
  },
  {
    id: "6",
    name: "Priya Sharma",
    role: "Verified Patient",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
    comment: "Booking and managing appointments is so simple. No more phone tag with clinics.",
  },
];

// Testimonial Card Component
function TestimonialCard({ testimonial }: { testimonial: typeof TESTIMONIALS[number] }) {
  return (
    <div className="flex-shrink-0 w-[320px] p-5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-[#005EAD]/30 transition-colors">
      <div className="flex items-start gap-4">
        <img
          src={testimonial.image}
          alt={testimonial.name}
          className="w-12 h-12 rounded-full object-cover border-2 border-[#005EAD]/30"
        />
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-white truncate">{testimonial.name}</h4>
          <p className="text-xs text-[#005EAD]">{testimonial.role}</p>
        </div>
      </div>
      <p className="mt-4 text-sm text-white/60 leading-relaxed line-clamp-3">
        {testimonial.comment}
      </p>
    </div>
  );
}

// Infinite Scrolling Marquee
function TestimonialMarquee() {
  return (
    <div className="relative overflow-hidden">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
      
      {/* First row - scrolls left */}
      <div className="flex gap-4 mb-4 animate-marquee-left">
        {[...TESTIMONIALS, ...TESTIMONIALS].map((testimonial, idx) => (
          <TestimonialCard key={`row1-${testimonial.id}-${idx}`} testimonial={testimonial} />
        ))}
      </div>
      
      {/* Second row - scrolls right */}
      <div className="flex gap-4 animate-marquee-right">
        {[...TESTIMONIALS.slice().reverse(), ...TESTIMONIALS.slice().reverse()].map((testimonial, idx) => (
          <TestimonialCard key={`row2-${testimonial.id}-${idx}`} testimonial={testimonial} />
        ))}
      </div>
    </div>
  );
}

// Floating UI Panel Component
function FloatingUIPanel() {
  return (
    <div className="relative flex items-center justify-center h-full min-h-[400px]">
      {/* Background mock dashboard (blurred) */}
      <div className="absolute inset-8 rounded-2xl bg-[#0a1628] border border-white/5 overflow-hidden">
        <div className="p-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-3 h-3 rounded-full bg-red-500/60" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
            <div className="w-3 h-3 rounded-full bg-green-500/60" />
          </div>
          <div className="space-y-3">
            <div className="h-3 w-3/4 bg-white/5 rounded" />
            <div className="h-3 w-1/2 bg-white/5 rounded" />
            <div className="h-3 w-2/3 bg-white/5 rounded" />
            <div className="grid grid-cols-3 gap-2 mt-6">
              <div className="h-16 bg-white/5 rounded-lg" />
              <div className="h-16 bg-white/5 rounded-lg" />
              <div className="h-16 bg-white/5 rounded-lg" />
            </div>
            <div className="h-24 bg-white/5 rounded-lg mt-4" />
          </div>
        </div>
        {/* Blur overlay */}
        <div className="absolute inset-0 backdrop-blur-sm bg-[#0a1628]/30" />
      </div>
      
      {/* Main floating card */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-[280px] bg-white rounded-2xl p-6 shadow-2xl"
        style={{
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1)",
        }}
      >
        {/* Success icon */}
        <div className="flex items-center justify-center w-14 h-14 rounded-full bg-green-100 mb-4 mx-auto">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        
        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">
          Patient Data Synced
        </h3>
        
        {/* Subtitle */}
        <p className="text-sm text-gray-500 text-center mb-5">
          All records updated successfully across 3 devices
        </p>
        
        {/* Details */}
        <div className="space-y-3 bg-gray-50 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">Last sync</span>
            <span className="text-xs font-medium text-gray-900">Just now</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">Records</span>
            <span className="text-xs font-medium text-gray-900">247 files</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">Status</span>
            <span className="flex items-center gap-1.5 text-xs font-medium text-green-600">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              Active
            </span>
          </div>
        </div>
        
        {/* Action button */}
        <button className="mt-5 w-full py-2.5 bg-[#005EAD] hover:bg-[#004a8a] text-white text-sm font-medium rounded-xl transition-colors">
          View Details
        </button>
      </motion.div>
      
      {/* Secondary floating element */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="absolute top-12 right-4 z-20 bg-white rounded-xl p-3 shadow-xl"
        style={{
          boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.3)",
        }}
      >
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#005EAD]/10 flex items-center justify-center">
            <ShieldCheck className="w-4 h-4 text-[#005EAD]" />
          </div>
          <div>
            <p className="text-xs font-medium text-gray-900">HIPAA Compliant</p>
            <p className="text-[10px] text-gray-500">End-to-end encrypted</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// Ecosystem Feedback Section - Linktree-style Bento Layout
function EcosystemFeedbackSection() {
  return (
    <section id="ecosystem-feedback" className="relative w-full py-24 bg-black overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span
            className="inline-block text-xs text-[#005EAD] tracking-[0.2em] uppercase mb-5"
            style={{ fontFamily: "var(--font-geist-mono), ui-monospace, monospace" }}
          >
            Ecosystem Feedback
          </span>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter text-white text-balance leading-[0.95]"
            style={{ fontFamily: "var(--font-geist), sans-serif" }}
          >
            Real Stories. Real Impact.
          </h2>
          <p className="mt-5 text-base text-white/50 max-w-md mx-auto text-pretty">
            See how healthcare professionals and patients are transforming care together.
          </p>
        </div>

        {/* Massive Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Block - Testimonial Marquee */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-[2rem] bg-[#0a0a0a] border border-[#1a1a1a] p-8 min-h-[500px] overflow-hidden"
            style={{
              background: "radial-gradient(ellipse at 0% 0%, rgba(0, 94, 173, 0.15), transparent 50%), #0a0a0a",
            }}
          >
            {/* Top-left glow accent */}
            <div
              aria-hidden="true"
              className="absolute top-0 left-0 w-64 h-64 pointer-events-none"
              style={{
                background: "radial-gradient(circle at 0% 0%, rgba(0, 94, 173, 0.2), transparent 70%)",
              }}
            />
            
            <div className="relative z-10">
              <h3
                className="text-xl font-semibold text-white mb-6"
                style={{ fontFamily: "var(--font-geist), sans-serif" }}
              >
                What Our Community Says
              </h3>
              <TestimonialMarquee />
            </div>
          </motion.div>

          {/* Right Block - Floating UI Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative rounded-[2rem] overflow-hidden min-h-[500px]"
            style={{
              background: "linear-gradient(135deg, #005EAD 0%, #003366 50%, #001a33 100%)",
            }}
          >
            {/* Subtle pattern overlay */}
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />
            
            <div className="relative z-10 h-full p-8">
              <h3
                className="text-xl font-semibold text-white mb-2"
                style={{ fontFamily: "var(--font-geist), sans-serif" }}
              >
                Seamless Integration
              </h3>
              <p className="text-sm text-white/60 mb-6">
                Experience the power of unified healthcare data
              </p>
              <FloatingUIPanel />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  return (
    <section id="faq" className="relative w-full py-32 overflow-hidden faq-mesh-bg">
      {/* Cinematic noise overlay — bleeds full width */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 faq-noise"
      />

      {/* Content container — constrained width, atmosphere bleeds behind */}
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-20">
          <span
            className="inline-block text-xs text-[#005EAD] tracking-[0.2em] uppercase mb-6"
            style={{ fontFamily: "var(--font-geist-mono), ui-monospace, monospace" }}
          >
            FAQ / 005
          </span>
          <h2
            className="faq-heading-gradient text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter leading-[0.95] text-balance"
            style={{ fontFamily: "var(--font-geist), sans-serif" }}
          >
            Questions? Answered.
          </h2>
          <p className="mt-6 text-base md:text-lg text-white/50 max-w-xl text-pretty">
            Everything you need to know about the Mofid platform, in one place.
          </p>
        </div>

        {/* Bento Grid: 2 cols on md, 3 cols on lg */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {FAQ_ITEMS.map((item, index) => (
            <FAQCard
              key={index}
              index={index}
              question={item.question}
              answer={item.answer}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// Magnetic social icon — pulls toward cursor on proximity
function MagneticIcon({
  href,
  label,
  Icon,
}: {
  href: string;
  label: string;
  Icon: typeof Github;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 180, damping: 14, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 180, damping: 14, mass: 0.4 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    // Pull at ~35% of cursor offset for a subtle but obvious magnet
    x.set((e.clientX - cx) * 0.35);
    y.set((e.clientY - cy) * 0.35);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setHovered(false);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      style={{ x: springX, y: springY }}
      onMouseEnter={() => setHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative flex items-center justify-center w-11 h-11 rounded-full border border-[#333333] bg-[#111111] text-white/60 hover:text-white transition-colors"
    >
      <Icon className="w-4 h-4 relative z-10" />
      {/* Glow halo */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-full transition-opacity duration-300"
        style={{
          boxShadow: "0 0 24px 2px rgba(0, 94, 173, 0.6), inset 0 0 0 1px #005EAD",
          opacity: hovered ? 1 : 0,
        }}
      />
    </motion.a>
  );
}

// Footer — Infinite Horizon
function Footer() {
  const resources = [
    { label: "Documentation", href: "#" },
    { label: "Changelog", href: "#" },
    { label: "Roadmap", href: "#" },
    { label: "Privacy Policy", href: "#" },
  ];

  const socials = [
    { label: "GitHub", href: "#", Icon: Github },
    { label: "LinkedIn", href: "#", Icon: Linkedin },
    { label: "Twitter", href: "#", Icon: Twitter },
    { label: "Email", href: "mailto:hello@mofid.dev", Icon: Mail },
  ];

  return (
    <footer className="relative w-full bg-black overflow-hidden">
      {/* Horizon glow — wide radial gradient along the top edge */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-0 w-[140%] h-[320px]"
        style={{
          background:
            "radial-gradient(ellipse 60% 100% at 50% 0%, rgba(0, 94, 173, 0.15), rgba(0, 94, 173, 0.05) 40%, transparent 70%)",
        }}
      />
      {/* Thin blue ridge at the exact top edge */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(0, 94, 173, 0.5), transparent)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-24 pb-10">
        {/* 4-column layout */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 rounded-lg bg-[#005EAD] flex items-center justify-center">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <span
                className="text-white font-semibold tracking-tight"
                style={{ fontFamily: "var(--font-geist), sans-serif" }}
              >
                Mofid
              </span>
            </div>
            <p className="text-sm text-white/45 leading-relaxed max-w-xs">
              A high-performance platform engineered for clarity, speed, and the
              AI era.
            </p>
          </div>

          {/* Resources */}
          <div>
            <h4
              className="text-xs text-[#005EAD] tracking-[0.2em] uppercase mb-5"
              style={{ fontFamily: "var(--font-geist-mono), ui-monospace, monospace" }}
            >
              Resources
            </h4>
            <ul className="flex flex-col gap-3">
              {resources.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="group relative inline-flex text-sm text-white/55 hover:text-white transition-colors"
                  >
                    <span>{item.label}</span>
                    <span
                      aria-hidden="true"
                      className="absolute left-0 -bottom-0.5 h-px w-0 bg-[#005EAD] transition-all duration-300 group-hover:w-full"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4
              className="text-xs text-[#005EAD] tracking-[0.2em] uppercase mb-5"
              style={{ fontFamily: "var(--font-geist-mono), ui-monospace, monospace" }}
            >
              Social
            </h4>
            {/* Magnetic dock */}
            <div className="flex items-center gap-3">
              {socials.map((s) => (
                <MagneticIcon
                  key={s.label}
                  href={s.href}
                  label={s.label}
                  Icon={s.Icon}
                />
              ))}
            </div>
          </div>

          {/* Status */}
          <div>
            <h4
              className="text-xs text-[#005EAD] tracking-[0.2em] uppercase mb-5"
              style={{ fontFamily: "var(--font-geist-mono), ui-monospace, monospace" }}
            >
              Status
            </h4>
            <div className="flex items-center gap-2.5">
              <span className="relative flex w-2.5 h-2.5">
                <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-60" />
                <span className="relative inline-flex w-2.5 h-2.5 rounded-full bg-green-500" />
              </span>
              <span
                className="text-xs text-white/70 tracking-wide"
                style={{ fontFamily: "var(--font-geist-mono), ui-monospace, monospace" }}
              >
                All Systems Operational
              </span>
            </div>
            <p
              className="mt-4 text-xs text-white/35 tracking-wide"
              style={{ fontFamily: "var(--font-geist-mono), ui-monospace, monospace" }}
            >
              UPTIME 99.98%
            </p>
          </div>
        </div>

        {/* Divider + Copyright */}
        <div className="mt-16 pt-6 border-t border-[#1a1a1a] flex flex-col md:flex-row items-center justify-between gap-3">
          <p
            className="text-xs tracking-wide"
            style={{
              color: "#4B5563",
              fontFamily: "var(--font-geist-mono), ui-monospace, monospace",
            }}
          >
            &copy; 2026 Mofid Project
          </p>
          <p
            className="text-xs tracking-[0.2em] uppercase"
            style={{
              color: "#4B5563",
              fontFamily: "var(--font-geist-mono), ui-monospace, monospace",
            }}
          >
            Engineered with precision
          </p>
        </div>
      </div>
    </footer>
  );
}

// Main Landing Page
export default function Landing() {
  useEffect(() => {
    document.title = "Mofid - AI-Powered Healthcare Platform";
  }, []);

  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      
      {/* Dev Mode Testing Section */}
      <div className="fixed top-24 left-6 z-40">
        <p className="text-xs text-[#4B5563] font-mono">
          Dev Mode: Navigation UI Test v1.0
        </p>
      </div>

      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <CTASection />
      <EcosystemFeedbackSection />
      <FAQSection />
      <Footer />
    </div>
  );
}
