import { useState } from "react";
import { useCreateConversion, useConversions } from "@/hooks/use-conversions";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRightLeft, History, Calculator, Sparkles } from "lucide-react";

type System = "decimal" | "binary" | "octal" | "hex";

export function NumberConverter() {
  const [inputValue, setInputValue] = useState("");
  const [fromSystem, setFromSystem] = useState<System>("decimal");
  const [toSystem, setToSystem] = useState<System>("binary");
  const [result, setResult] = useState("");
  
  const createConversion = useCreateConversion();
  const { data: history } = useConversions();

  const handleConvert = () => {
    if (!inputValue) return;

    let decimalValue: number;

    // Parse input to decimal first
    try {
      switch (fromSystem) {
        case "decimal":
          decimalValue = parseInt(inputValue, 10);
          break;
        case "binary":
          decimalValue = parseInt(inputValue, 2);
          break;
        case "octal":
          decimalValue = parseInt(inputValue, 8);
          break;
        case "hex":
          decimalValue = parseInt(inputValue, 16);
          break;
      }
    } catch (e) {
      setResult("Error de formato");
      return;
    }

    if (isNaN(decimalValue)) {
      setResult("Número inválido");
      return;
    }

    // Convert decimal to target
    let converted = "";
    switch (toSystem) {
      case "decimal":
        converted = decimalValue.toString(10);
        break;
      case "binary":
        converted = decimalValue.toString(2);
        break;
      case "octal":
        converted = decimalValue.toString(8);
        break;
      case "hex":
        converted = decimalValue.toString(16).toUpperCase();
        break;
    }

    setResult(converted);

    // Save to history
    createConversion.mutate({
      fromSystem,
      toSystem,
      inputValue,
      resultValue: converted
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
      {/* Calculator Card */}
      <div className="space-y-6">
        <motion.div 
          className="bg-black/40 backdrop-blur-xl border border-primary/20 p-8 rounded-3xl shadow-2xl relative overflow-hidden"
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.3 }}
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
          
          <div className="flex items-center gap-3 mb-6">
            <Calculator className="w-6 h-6 text-primary" />
            <h3 className="text-2xl font-mono font-bold text-white">Convertidor Universal</h3>
          </div>

          <div className="space-y-6">
            {/* From */}
            <div className="space-y-2">
              <label className="text-sm font-mono text-primary/80">Desde:</label>
              <div className="flex gap-2">
                <select 
                  value={fromSystem}
                  onChange={(e) => setFromSystem(e.target.value as System)}
                  className="bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-primary outline-none flex-1 font-mono transition-all"
                >
                  <option value="decimal">Decimal (10)</option>
                  <option value="binary">Binario (2)</option>
                  <option value="octal">Octal (8)</option>
                  <option value="hex">Hexadecimal (16)</option>
                </select>
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ingresa valor..."
                  className="bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-primary outline-none flex-[2] font-mono placeholder:text-white/20 transition-all"
                />
              </div>
            </div>

            <div className="flex justify-center">
              <div className="bg-primary/10 p-2 rounded-full border border-primary/20">
                <ArrowRightLeft className="w-5 h-5 text-primary rotate-90 md:rotate-0" />
              </div>
            </div>

            {/* To */}
            <div className="space-y-2">
              <label className="text-sm font-mono text-primary/80">Hacia:</label>
              <div className="flex gap-2">
                <select 
                  value={toSystem}
                  onChange={(e) => setToSystem(e.target.value as System)}
                  className="bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-primary outline-none flex-1 font-mono transition-all"
                >
                  <option value="decimal">Decimal (10)</option>
                  <option value="binary">Binario (2)</option>
                  <option value="octal">Octal (8)</option>
                  <option value="hex">Hexadecimal (16)</option>
                </select>
                <div className="flex-[2] bg-primary/10 border border-primary/20 rounded-lg px-4 py-3 text-primary font-mono font-bold flex items-center min-h-[50px] overflow-x-auto">
                  {result || <span className="text-primary/30 font-normal italic">Resultado...</span>}
                </div>
              </div>
            </div>

            <button
              onClick={handleConvert}
              disabled={createConversion.isPending || !inputValue}
              className="w-full mt-4 py-4 rounded-xl font-bold font-mono tracking-wider uppercase
                bg-gradient-to-r from-primary to-purple-600 text-white shadow-lg shadow-primary/25
                hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-1 active:translate-y-0
                disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
                transition-all duration-200 ease-out group"
            >
              <span className="flex items-center justify-center gap-2">
                {createConversion.isPending ? "Procesando..." : "Convertir Ahora"}
                {!createConversion.isPending && <Sparkles className="w-4 h-4 group-hover:spin-slow" />}
              </span>
            </button>
          </div>
        </motion.div>

        {/* Formulas Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-black/40 backdrop-blur-md border border-white/5 p-6 rounded-3xl"
        >
          <h4 className="text-lg font-mono font-bold text-white mb-4 flex items-center gap-2">
            <Calculator className="w-4 h-4 text-purple-400" />
            Métodos y Ejemplos de Conversión
          </h4>
          <div className="space-y-4 text-sm font-mono text-white/60">
            <div className="p-4 bg-white/5 rounded-xl border border-white/5">
              <p className="text-purple-400 font-bold mb-2">Cualquier Base a Decimal:</p>
              <p className="mb-2">Σ (dígito × base<sup>posición</sup>)</p>
              <div className="text-xs p-2 bg-black/30 rounded border border-white/5 italic">
                <p className="text-white/40 mb-1">Ejemplo: Binario 101 a Decimal</p>
                <p>(1 × 2²) + (0 × 2¹) + (1 × 2⁰) = 4 + 0 + 1 = <span className="text-purple-400">5</span></p>
              </div>
            </div>
            <div className="p-4 bg-white/5 rounded-xl border border-white/5">
              <p className="text-emerald-400 font-bold mb-2">Decimal a Cualquier Base:</p>
              <p className="mb-2">Divisiones sucesivas por la base destino.</p>
              <div className="text-xs p-2 bg-black/30 rounded border border-white/5 italic">
                <p className="text-white/40 mb-1">Ejemplo: Decimal 13 a Binario</p>
                <p>13 ÷ 2 = 6 (Residuo <span className="text-emerald-400">1</span>)</p>
                <p>6 ÷ 2 = 3 (Residuo <span className="text-emerald-400">0</span>)</p>
                <p>3 ÷ 2 = 1 (Residuo <span className="text-emerald-400">1</span>)</p>
                <p>1 ÷ 2 = 0 (Residuo <span className="text-emerald-400">1</span>)</p>
                <p>Resultado (residuos al revés): <span className="text-emerald-400">1101</span></p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* History Card */}
      <motion.div 
        className="bg-black/40 backdrop-blur-md border border-white/5 p-8 rounded-3xl h-full max-h-[500px] overflow-hidden flex flex-col"
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center gap-3 mb-6">
          <History className="w-6 h-6 text-emerald-400" />
          <h3 className="text-2xl font-mono font-bold text-white">Historial Reciente</h3>
        </div>

        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-3">
          <AnimatePresence>
            {history?.slice().reverse().map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white/5 p-4 rounded-xl border border-white/5 hover:border-emerald-500/30 transition-colors"
              >
                <div className="flex justify-between items-center text-sm font-mono mb-1">
                  <span className="text-emerald-400/80 uppercase">{item.fromSystem}</span>
                  <ArrowRightLeft className="w-3 h-3 text-white/20" />
                  <span className="text-purple-400/80 uppercase">{item.toSystem}</span>
                </div>
                <div className="flex justify-between items-end">
                  <span className="text-white/60 truncate max-w-[40%]">{item.inputValue}</span>
                  <span className="text-white font-bold text-lg truncate max-w-[50%] text-right">{item.resultValue}</span>
                </div>
              </motion.div>
            ))}
            {(!history || history.length === 0) && (
              <div className="text-center py-10 text-white/20 font-mono text-sm italic">
                Aún no hay conversiones...
              </div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
