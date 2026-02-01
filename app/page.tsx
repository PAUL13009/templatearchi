'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Si on est en haut de la page, toujours afficher le header
      if (currentScrollY === 0) {
        setIsHeaderVisible(true);
      } 
      // Sinon, détecter la direction du scroll
      else if (currentScrollY > lastScrollY) {
        // Scroll vers le bas - cacher le header immédiatement
        setIsHeaderVisible(false);
      }
      // Ne pas réafficher lors du scroll vers le haut, seulement en haut de page
      
      setLastScrollY(currentScrollY);
      setIsScrolled(currentScrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 bg-transparent transition-transform duration-300 ease-in-out ${
        isHeaderVisible ? 'translate-y-0' : '-translate-y-full'
      }`}>
        <div className="max-w-[1920px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 py-8">
          <div className="flex items-center justify-end">
            <div className="hidden md:flex items-center gap-6 text-white">
              <a href="#projects" className="text-sm font-medium hover:opacity-80 transition-opacity tracking-wide uppercase">Nos Projets</a>
              <a href="#about" className="text-sm font-medium hover:opacity-80 transition-opacity tracking-wide uppercase">Le Studio</a>
              <a href="#process" className="text-sm font-medium hover:opacity-80 transition-opacity tracking-wide uppercase">Process</a>
              <a href="#gallery" className="text-sm font-medium hover:opacity-80 transition-opacity tracking-wide uppercase">Galerie</a>
              <button className="ml-8 px-6 py-2.5 bg-black rounded-full text-white text-sm font-medium hover:bg-white hover:text-black transition-all duration-300 flex items-center gap-2 uppercase">
                NOUS CONTACTER
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-white relative z-50 flex items-center gap-3"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {/* Text */}
              <div className="relative h-5 overflow-hidden">
                <span className={`block text-sm font-medium transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0 -translate-y-full' : 'opacity-100 translate-y-0'}`}>
                  Menu
                </span>
                <span className={`block text-sm font-medium transition-all duration-300 absolute top-0 left-0 ${isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'}`}>
                  Close
                </span>
              </div>
              
              {/* Icon */}
              <div className="relative w-6 h-6 flex items-center justify-center">
                <span className={`absolute w-5 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45' : 'rotate-0'}`}></span>
                <span className={`absolute w-5 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45' : 'rotate-90'}`}></span>
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 z-40 md:hidden transition-opacity duration-500 ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        {/* Background Layers */}
        <div className="absolute inset-0 bg-black"></div>
        <div className={`absolute inset-0 bg-black transition-transform duration-500 ease-out ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`} style={{ transitionDelay: '50ms' }}></div>
        
        {/* Menu Panel */}
        <aside 
          className={`absolute top-0 right-0 h-full w-full bg-black transition-transform duration-500 ease-out ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          style={{ transitionDelay: '100ms' }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="h-full flex flex-col justify-center px-8 py-24">
            <ul className="space-y-6">
              {[
                { label: 'NOS PROJETS', href: '#projects' },
                { label: 'LE STUDIO', href: '#about' },
                { label: 'PROCESS', href: '#process' },
                { label: 'GALERIE', href: '#gallery' },
              ].map((item, index) => (
                <li 
                  key={item.href}
                  className={`transform transition-all duration-500 ${
                    isMobileMenuOpen 
                      ? 'translate-y-0 opacity-100' 
                      : 'translate-y-8 opacity-0'
                  }`}
                  style={{ transitionDelay: `${200 + index * 100}ms` }}
                >
                  <a 
                    href={item.href}
                    className="text-white text-3xl font-medium block hover:opacity-80 transition-opacity"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            
            <div className={`mt-12 transform transition-all duration-500 ${
              isMobileMenuOpen 
                ? 'translate-y-0 opacity-100' 
                : 'translate-y-8 opacity-0'
            }`}
            style={{ transitionDelay: '600ms' }}>
              <a 
                href="#contact"
                className="inline-block px-8 py-4 bg-white text-black rounded-full text-base font-medium hover:bg-gray-100 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                NOUS CONTACTER
              </a>
            </div>
          </div>
        </aside>
      </div>

      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image 
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
            alt="Maison moderne avec verdure"
            fill
            priority
            className="object-cover"
            quality={90}
            unoptimized
          />
          {/* Overlay pour améliorer la lisibilité du texte */}
          <div className="absolute inset-0 bg-black/20"></div>
        </div>
        
        {/* ARCH STUDIO - Centered */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-light text-white tracking-tight">
            ARCH STUDIO
          </h1>
        </div>
        
        {/* Description Text - Bottom Left */}
        <div className="absolute bottom-20 md:bottom-24 left-0 right-0 lg:left-12 lg:right-auto xl:left-16 z-10 w-full lg:w-auto max-w-[90%] lg:max-w-lg mx-auto lg:mx-0 px-4 lg:px-0">
          <p className="text-white text-sm sm:text-base md:text-lg leading-relaxed font-light uppercase text-center lg:text-left">
            Nous concevons des résidences et des espaces inspirés par votre vision, alliant design réfléchi, collaboration et créativité pour façonner des lieux de vie qui s'adaptent naturellement à votre quotidien.
          </p>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 bg-white min-h-screen">
        <div className="max-w-[1920px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
          {/* Top Section - Info */}
          <div className="pb-6 md:pb-8 mb-24 md:mb-32 lg:mb-40">
            {/* NOS PROJETS with Button */}
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 md:gap-6">
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-bold text-gray-900 tracking-tight leading-none">
                NOS PROJETS<sup className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal ml-1 md:ml-2 align-super">(35)</sup>
              </h2>
              <a 
                href="#projects" 
                className="px-6 py-3 bg-gray-900 text-white hover:bg-gray-800 transition-colors font-medium tracking-wide inline-flex items-center gap-2 text-sm md:text-base"
              >
                Voir tous nos projets
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>

          {/* Projects Gallery - Asymmetric Layout */}
          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-12 xl:gap-16">
              {/* Project 1 - SIDNEY HOUSE (Top Left) */}
              <div className="group cursor-pointer">
                <div className="aspect-[4/5] md:aspect-[3/4] lg:aspect-[4/5] mb-3 overflow-hidden relative bg-gray-200">
                  <Image
                    src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
                    alt="Sidney House"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    quality={90}
                    unoptimized
                  />
                </div>
                <h3 className="text-gray-900 text-base md:text-lg lg:text-xl font-medium tracking-[0.05em] uppercase">SIDNEY HOUSE</h3>
              </div>

              {/* Project 2 - HAIG (Bottom Left) */}
              <div className="group cursor-pointer md:mt-12 lg:mt-20 xl:mt-24">
                <div className="aspect-[4/5] md:aspect-[3/4] lg:aspect-[4/5] mb-3 overflow-hidden relative bg-gray-200">
                  <Image
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
                    alt="Haig"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    quality={90}
                    unoptimized
                  />
                </div>
                <h3 className="text-gray-900 text-base md:text-lg lg:text-xl font-medium tracking-[0.05em] uppercase">HAIG</h3>
              </div>

              {/* Project 3 - HAWKEN (Top Right) */}
              <div className="group cursor-pointer md:-mt-6 lg:-mt-10 xl:-mt-12">
                <div className="aspect-[4/5] md:aspect-[3/4] lg:aspect-[4/5] mb-3 overflow-hidden relative bg-gray-200">
                  <Image
                    src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
                    alt="Villa Hawken"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    quality={90}
                    unoptimized
                  />
                </div>
                <h3 className="text-gray-900 text-base md:text-lg lg:text-xl font-medium tracking-[0.05em] uppercase">HAWKEN</h3>
              </div>

              {/* Project 4 - HEAL (Bottom Right) */}
              <div className="group cursor-pointer md:mt-6 lg:mt-10 xl:mt-12">
                <div className="aspect-[4/5] md:aspect-[3/4] lg:aspect-[4/5] mb-3 overflow-hidden relative bg-gray-200">
                  <Image
                    src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
                    alt="Heal"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    quality={90}
                    unoptimized
                  />
                </div>
                <h3 className="text-gray-900 text-base md:text-lg lg:text-xl font-medium tracking-[0.05em] uppercase">HEAL</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Notre Vision Section - Part 1: About Us Style */}
      <section id="about" className="py-24 bg-white">
        <div className="max-w-[1920px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
          {/* Title */}
          <div className="mb-12">
            <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-gray-900 tracking-tight">
              NOTRE VISION
            </h2>
          </div>

          {/* Large Image */}
          <div className="w-full aspect-[16/9] md:aspect-[21/9] lg:aspect-[24/9] relative overflow-hidden bg-gray-200 mb-8">
            <Image
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
              alt="Équipe d'architectes"
              fill
              className="object-cover grayscale"
              quality={90}
              unoptimized
            />
          </div>
        </div>
      </section>

      {/* Notre Vision Section - Part 2: Two Column Layout */}
      <section className="pt-8 pb-24 bg-white">
        <div className="max-w-[1920px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Left Column */}
            <div className="lg:col-span-4">
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
                <span className="block">NOTRE ÉQUIPE,</span>
                <span className="block">NOTRE HISTOIRE</span>
              </h3>
              <p className="text-gray-600 text-base md:text-lg mb-8 leading-relaxed">
                Nous visons à rassembler des esprits divers, transformant les idées en expériences qui comptent.
              </p>

              {/* Profile */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-300 flex-shrink-0">
                  <Image
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3"
                    alt="Profil"
                    width={64}
                    height={64}
                    className="object-cover w-full h-full"
                    quality={90}
                    unoptimized
                  />
                </div>
                <div>
                  <div className="text-gray-900 font-bold text-lg">Jeanne Bertolli</div>
                  <div className="text-gray-600 text-sm">Directrice</div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-8">
              <p className="text-gray-900 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-relaxed">
                Nous sommes une équipe de créateurs, de penseurs et de bâtisseurs qui croient en la création d'expériences qui créent de véritables connexions. Notre histoire est construite sur la passion, l'innovation et la volonté de donner vie à des idées significatives.
              </p>
            </div>
          </div>
          
          {/* Button */}
          <div className="flex justify-center mt-12 md:mt-16">
            <a 
              href="#team" 
              className="px-8 py-4 bg-gray-900 text-white hover:bg-gray-800 transition-colors font-medium tracking-wide inline-flex items-center gap-2"
            >
              Découvrir les membres de notre équipe
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-24 bg-gray-50">
        <div className="max-w-[1920px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
          {/* Title */}
          <div className="mb-6">
            <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-gray-900 tracking-tight">
              PROCESS
            </h2>
          </div>

          {/* Description */}
          <p className="text-gray-600 text-base md:text-lg mb-16 max-w-2xl">
            Notre approche complète pour livrer des résultats exceptionnels grâce à une méthodologie structurée
          </p>

          {/* Process Steps */}
          <div className="space-y-0">
            {/* Step 1 - Esquisse */}
            <div className="w-full h-24 md:h-28 lg:h-32 flex items-center justify-between px-6 md:px-8 lg:px-12 bg-blue-100">
              <div className="flex items-center gap-3 md:gap-4">
                <span className="text-2xl md:text-3xl">↓</span>
                <span className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900">Esquisse</span>
              </div>
              <div className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white">0001</div>
            </div>

            {/* Step 2 - Conception */}
            <div className="w-full h-24 md:h-28 lg:h-32 flex items-center justify-between px-6 md:px-8 lg:px-12 bg-blue-200">
              <div className="flex items-center gap-3 md:gap-4">
                <span className="text-2xl md:text-3xl">↓</span>
                <span className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900">Conception</span>
              </div>
              <div className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white">0002</div>
            </div>

            {/* Step 3 - Permis */}
            <div className="w-full h-24 md:h-28 lg:h-32 flex items-center justify-between px-6 md:px-8 lg:px-12 bg-blue-300">
              <div className="flex items-center gap-3 md:gap-4">
                <span className="text-2xl md:text-3xl">↓</span>
                <span className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900">Permis</span>
              </div>
              <div className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white">0003</div>
            </div>

            {/* Step 4 - Chantier */}
            <div className="w-full h-24 md:h-28 lg:h-32 flex items-center justify-between px-6 md:px-8 lg:px-12 bg-blue-400">
              <div className="flex items-center gap-3 md:gap-4">
                <span className="text-2xl md:text-3xl">↓</span>
                <span className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900">Chantier</span>
              </div>
              <div className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white">0004</div>
            </div>

            {/* Step 5 - Livraison */}
            <div className="w-full h-24 md:h-28 lg:h-32 flex items-center justify-between px-6 md:px-8 lg:px-12 bg-blue-500">
              <div className="flex items-center gap-3 md:gap-4">
                <span className="text-2xl md:text-3xl">↓</span>
                <span className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900">Livraison</span>
              </div>
              <div className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white">0005</div>
            </div>
          </div>
        </div>
      </section>

      {/* Galerie Section */}
      <section id="gallery" className="py-24 bg-white">
        <div className="max-w-[1920px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
          {/* Title - Top Right */}
          <div className="flex justify-end mb-12">
            <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-gray-900 tracking-tight">
              GALERIE
            </h2>
          </div>

          <div className="space-y-6 md:space-y-8">
            {/* Top Row - Two Images Side by Side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {/* Top Left Image */}
              <div className="aspect-[4/3] md:aspect-[5/4] relative overflow-hidden rounded-none bg-gray-200">
                <Image
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
                  alt="Maison moderne"
                  fill
                  className="object-cover"
                  quality={90}
                  unoptimized
                />
              </div>

              {/* Top Right Image */}
              <div className="aspect-[4/3] md:aspect-[5/4] relative overflow-hidden rounded-none bg-gray-200">
                <Image
                  src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
                  alt="Paysage montagneux"
                  fill
                  className="object-cover grayscale"
                  quality={90}
                  unoptimized
                />
              </div>
            </div>

            {/* Bottom Row - Single Wide Image */}
            <div className="w-full aspect-[16/6] md:aspect-[16/5] relative overflow-hidden rounded-none bg-gray-200">
              <Image
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
                alt="Architecture moderne"
                fill
                className="object-cover grayscale"
                quality={90}
                unoptimized
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-black">
        <div className="max-w-[1920px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Left Column */}
            <div>
              {/* Title */}
              <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-8 tracking-tight">
                NOUS CONTACTER
              </h2>

              {/* Description */}
              <p className="text-gray-400 text-base md:text-lg mb-12 leading-relaxed">
                Discutons de votre projet et découvrons comment nous pouvons transformer vos idées en réalité architecturale qui correspond à votre vision.
              </p>

              {/* Contact Information */}
              <div className="flex flex-col sm:flex-row gap-8 sm:gap-12">
                {/* Phone */}
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="text-gray-400 text-base md:text-lg">+33 1 23 45 67 89</span>
                </div>

                {/* Email */}
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-gray-400 text-base md:text-lg">contact@archstudio.fr</span>
                </div>
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div>
              <form className="space-y-8">
                {/* Name Field */}
                <div>
                  <input
                    type="text"
                    placeholder="Nom*"
                    className="w-full bg-transparent border-0 border-b border-gray-400 text-white placeholder-gray-400 focus:outline-none focus:border-white transition-colors pb-3 text-base md:text-lg"
                  />
                </div>

                {/* Email Field */}
                <div>
                  <input
                    type="email"
                    placeholder="Email*"
                    className="w-full bg-transparent border-0 border-b border-gray-400 text-white placeholder-gray-400 focus:outline-none focus:border-white transition-colors pb-3 text-base md:text-lg"
                  />
                </div>

                {/* Message Field */}
                <div>
                  <textarea
                    placeholder="Message (Parlez-nous de votre projet)"
                    rows={4}
                    className="w-full bg-transparent border-0 border-b border-gray-400 text-white placeholder-gray-400 focus:outline-none focus:border-white transition-colors pb-3 resize-none text-base md:text-lg"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="flex items-center gap-2 text-white text-base md:text-lg hover:opacity-80 transition-opacity"
                >
                  <span>→</span>
                  <span>NOUS CONTACTER</span>
                </button>
              </form>
            </div>
          </div>

          {/* Footer Text */}
          <div className="mt-16 pt-8 border-t border-gray-800">
            <p className="text-gray-400 text-sm text-center">
              2026 - ARCHSTUDIO
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
