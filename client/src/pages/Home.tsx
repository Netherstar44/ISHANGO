import { Section } from "@/components/Section";
import { NumberConverter } from "@/components/NumberConverter";
import { motion, useScroll, useSpring } from "framer-motion";
import { ChevronDown, Infinity, Layers, Globe2, Cpu } from "lucide-react";

export default function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="w-full bg-background text-foreground overflow-x-hidden snap-y-mandatory h-screen overflow-y-scroll">
      
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 origin-left z-50"
        style={{ scaleX }}
      />

      {/* 1. HERO SECTION */}
      <Section className="bg-[#0a0a0a] text-white">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] -top-20 -left-20 animate-pulse" />
          <div className="absolute w-[400px] h-[400px] bg-blue-600/20 rounded-full blur-[100px] bottom-0 right-0 animate-pulse delay-700" />
        </div>
        
        <div className="flex flex-col items-center text-center space-y-8 relative z-10">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, type: "spring" }}
            className="mb-6"
          >
            <span className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-sm font-mono tracking-widest uppercase text-purple-300 mb-6">
              Proyecto Educativo
            </span>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-br from-white via-white to-white/50 pb-2">
              La Evolución <br /> de los Números
            </h1>
            <p className="text-xl md:text-2xl text-white/60 max-w-2xl mx-auto font-light leading-relaxed">
              Un viaje interactivo desde las piedras hasta los bits.
            </p>
          </motion.div>

          <div className="flex flex-col items-center gap-4 mt-12 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <h3 className="text-sm font-mono text-white/40 uppercase tracking-widest">Creado por</h3>
            <div className="flex flex-col md:flex-row gap-6 md:gap-12">
              <div className="text-center">
                <p className="font-bold text-lg">Jose David Correa Nuñez</p>
                <p className="text-xs text-white/40">Investigación & Contenido</p>
              </div>
              <div className="w-px h-10 bg-white/10 hidden md:block" />
              <div className="text-center">
                <p className="font-bold text-lg">Simon Santiago Puentes Peña</p>
                <p className="text-xs text-white/40">Desarrollo & Diseño</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* 2. ANTIGÜEDAD (Stones/Bones) */}
      <Section 
        className="bg-[#3d342b] text-[#e8dcc5]" 
        overlayColor="rgba(30, 25, 20, 0.85)"
        // Note: Using descriptive comment for unsplash image as requested
        /* Unsplash: Prehistoric cave painting texture */
        bgImage="Ishango.JPG"
      >
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="flex items-center gap-4 text-[#d4a373]">
              <Layers className="w-8 h-8" />
              <span className="font-hand text-xl font-bold tracking-widest">30,000 A.C.</span>
            </div>
            <h2 className="font-hand text-5xl md:text-7xl font-bold leading-none text-[#deb887]">
              La Necesidad de Contar
            </h2>
            <p className="text-lg md:text-xl font-hand opacity-90 leading-relaxed">
              Antes de los símbolos escritos, la humanidad utilizaba lo que la naturaleza ofrecía. 
              El <span className="text-[#d4a373] font-bold">Hueso de Ishango</span> es uno de los primeros testimonios: 
              marcas talladas que sugieren conteo lunar o cálculos simples.
            </p>
            <div className="p-6 border-l-4 border-[#d4a373] bg-black/20 italic font-hand text-xl">
              "Uno, dos, muchos... así comenzó nuestra relación con el infinito."
            </div>
          </div>
          <div className="relative group">
            <div className="absolute inset-0 bg-[#d4a373] rounded-lg rotate-3 opacity-20 group-hover:rotate-6 transition-transform duration-500 z-0" />
            {/* Unsplash: Close up of stone texture or bone artifact */}
            <a
              href="https://es.wikipedia.org/wiki/Hueso_de_Ishango"
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-20 block"
            >
              <img 
                src="/Ishango.JPG"
                alt="Hueso de Ishango y piedras"
                loading="lazy"
                decoding="async"
                className="rounded-lg shadow-2xl relative z-20 sepia-[.3] contrast-125 hover:sepia-0 transition-all duration-500"
              />
            </a>
          </div>
        </div>
      </Section>

      {/* 3. PRIMEROS SISTEMAS (Babylon/Egypt/Rome) */}
      <Section 
        className="bg-[#f4e4bc] text-[#4a3b2a]"
        overlayColor="rgba(244, 228, 188, 0.9)"
        /* Unsplash: Egyptian hieroglyphs or roman architecture */
        bgImage="https://images.unsplash.com/photo-1565029648967-b873528f8045?q=80&w=2000&auto=format&fit=crop"
      >
        <div className="text-center max-w-4xl mx-auto mb-16">
          <Globe2 className="w-12 h-12 mx-auto mb-6 text-[#8b4513]" />
          <h2 className="font-serif text-5xl md:text-7xl font-bold text-[#8b4513] mb-6 uppercase tracking-wider">
            Imperios y Símbolos
          </h2>
          <p className="font-serif text-xl md:text-2xl text-[#5d4037] leading-relaxed">
            Las grandes civilizaciones necesitaban administrar cosechas, ejércitos y comercio.
            Así nacieron los sistemas aditivos y posicionales.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div 
            whileHover={{ y: -10 }}
            className="bg-[#fff8e1] p-8 rounded-sm shadow-xl border-t-4 border-[#c17900] text-center"
          >
            <div className="text-6xl mb-4 font-serif text-[#c17900]">I, V, X</div>
            <h3 className="text-2xl font-bold font-serif mb-2">Roma</h3>
            <p className="text-[#5d4037]">Sistema aditivo basado en letras. Elegante pero ineficiente para cálculos grandes.</p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -10 }}
            className="bg-[#fff8e1] p-8 rounded-sm shadow-xl border-t-4 border-[#2e7d32] text-center"
          >
            <div className="text-6xl mb-4 font-serif text-[#2e7d32]">𓆼𓆐</div>
            <h3 className="text-2xl font-bold font-serif mb-2">Egipto</h3>
            <p className="text-[#5d4037]">Jeroglíficos decimales. Un millón era representado por un dios arrodillado.</p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -10 }}
            className="bg-[#fff8e1] p-8 rounded-sm shadow-xl border-t-4 border-[#1565c0] text-center"
          >
            <div className="text-6xl mb-4 font-serif text-[#1565c0]">▼ ◀</div>
            <h3 className="text-2xl font-bold font-serif mb-2">Babilonia</h3>
            <p className="text-[#5d4037]">Sistema sexagesimal (base 60). Herencia que aún usamos para medir el tiempo.</p>
          </motion.div>
        </div>
      </Section>

      {/* 4. CERO Y POSICIONAL (India/Maya/Arab) */}
      <Section 
        className="bg-[#0f172a] text-[#e2e8f0]"
        overlayColor="rgba(15, 23, 42, 0.92)"
        /* Unsplash: Starry sky or abstract mathematics */
        bgImage="https://images.unsplash.com/photo-1506318137071-a8bcbf671158?q=80&w=2000&auto=format&fit=crop"
      >
        <div className="flex flex-col md:flex-row-reverse items-center gap-16">
          <div className="flex-1 space-y-8 text-right md:text-left">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-cyan-900/30 text-cyan-400 border border-cyan-800">
              <Infinity className="w-5 h-5" />
              <span className="font-elegant font-bold tracking-wider text-sm uppercase">La Revolución del Vacío</span>
            </div>
            
            <h2 className="font-elegant text-5xl md:text-7xl font-bold text-white mb-6">
              El Poder del <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Cero</span>
            </h2>
            
            <p className="font-elegant text-xl leading-relaxed text-slate-300">
              La mayor invención matemática no fue un número, sino la ausencia de cantidad. 
              <strong className="text-cyan-400"> Mayas</strong> e <strong className="text-cyan-400">Indios</strong> 
              descubrieron que el "nada" permitía el sistema posicional.
            </p>

            <ul className="space-y-4 font-elegant text-lg text-slate-400">
              <li className="flex items-center gap-4">
                <span className="w-2 h-2 rounded-full bg-cyan-500" />
                Permitió representar cifras infinitas.
              </li>
              <li className="flex items-center gap-4">
                <span className="w-2 h-2 rounded-full bg-cyan-500" />
                Facilitó algoritmos complejos de cálculo.
              </li>
              <li className="flex items-center gap-4">
                <span className="w-2 h-2 rounded-full bg-cyan-500" />
                Los árabes lo llevaron a Europa como "sifr".
              </li>
            </ul>
          </div>

          <div className="flex-1 flex justify-center items-center relative">
            <div className="absolute inset-0 bg-cyan-500/10 blur-[80px] rounded-full animate-pulse" />
            <div className="relative z-10 w-64 h-64 md:w-96 md:h-96 rounded-full border border-cyan-500/30 flex items-center justify-center bg-black/50 backdrop-blur-sm shadow-[0_0_50px_rgba(6,182,212,0.3)]">
              <span className="text-9xl md:text-[12rem] font-elegant text-cyan-400">0</span>
            </div>
          </div>
        </div>
      </Section>

      {/* 5. ERA DIGITAL (Binary/Hex) */}
      <Section 
        className="bg-[#050505] text-[#00ff00]"
        overlayColor="rgba(5, 5, 5, 0.95)"
        /* Unsplash: Matrix code or cyberpunk city */
        bgImage="https://images.unsplash.com/photo-1510906594845-bc082582c8cc?q=80&w=2000&auto=format&fit=crop"
      >
        <div className="w-full">
          <div className="flex items-center gap-4 mb-12 border-b border-green-900/50 pb-6">
            <Cpu className="w-10 h-10 text-green-500 animate-pulse" />
            <h2 className="font-mono text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-700">
              01001000 01101001
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-16">
            <div className="space-y-6">
              <h3 className="font-mono text-3xl font-bold text-green-400">La Era de la Información</h3>
              <p className="font-mono text-green-800/80 text-lg leading-relaxed">
                Hoy en día, todo lo que ves en esta pantalla se reduce a interruptores encendidos y apagados.
                El sistema <span className="text-green-400 font-bold">Binario (Base 2)</span> es el lenguaje de las máquinas.
              </p>
              
              <div className="bg-green-950/20 p-6 rounded border border-green-900/50 font-mono text-sm">
                <p className="mb-2 text-green-600">// Ejemplo de código</p>
                <p>const futuro = "digital";</p>
                <p>let sistemas = ["Binario", "Hexadecimal", "Octal"];</p>
                <p>console.log("Bienvenido a la modernidad");</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="bg-black border border-green-500/30 p-6 rounded flex flex-col items-center justify-center aspect-square hover:bg-green-900/10 transition-colors cursor-default"
              >
                <span className="text-4xl font-mono font-bold text-green-500 mb-2">HEX</span>
                <span className="text-xs font-mono text-green-800 text-center">#FFFFFF<br/>Base 16<br/>Colores Web</span>
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="bg-black border border-green-500/30 p-6 rounded flex flex-col items-center justify-center aspect-square hover:bg-green-900/10 transition-colors cursor-default"
              >
                <span className="text-4xl font-mono font-bold text-green-500 mb-2">OCT</span>
                <span className="text-xs font-mono text-green-800 text-center">0755<br/>Base 8<br/>Permisos Linux</span>
              </motion.div>

              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="bg-black border border-green-500/30 p-6 rounded flex flex-col items-center justify-center aspect-square hover:bg-green-900/10 transition-colors cursor-default col-span-2"
              >
                <span className="text-4xl font-mono font-bold text-green-500 mb-2">BIN</span>
                <span className="text-xs font-mono text-green-800 text-center">101010<br/>Base 2<br/>Lógica Booleana</span>
              </motion.div>
            </div>
          </div>
        </div>
      </Section>

      {/* 6. INTERACTIVE CONVERTER */}
      <Section 
        id="converter"
        className="bg-[#1a1a2e] text-white" 
        overlayColor="rgba(26, 26, 46, 0.9)"
        bgImage="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2000&auto=format&fit=crop"
      >
        <div className="w-full flex flex-col items-center">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400 mb-4">
              Laboratorio de Conversión
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Experimenta traduciendo números entre los diferentes lenguajes matemáticos que hemos explorado.
            </p>
          </div>

          <NumberConverter />

          <footer className="mt-20 text-white/20 text-sm font-mono text-center">
            &copy; {new Date().getFullYear()} Historia de los Números. Proyecto Académico.
          </footer>
        </div>
      </Section>

    </div>
  );
}


