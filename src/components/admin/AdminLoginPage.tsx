import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Lock, Mail, ArrowRight, ShieldCheck, AlertCircle, Sparkles } from 'lucide-react';
import { GlassLogoBackground } from '../GlassLogoBackground';
import { motion } from 'motion/react';

export const AdminLoginPage: React.FC = () => {
  const { loginAdmin, navigate } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setLoading(true);
    setErrorMessage(null);

    const result = await loginAdmin(email, password);

    setLoading(false);

    if (result.success) {
      navigate('/admin');
    } else {
      setErrorMessage(result.error || 'Credenciais inválidas ou sem permissão de administrador.');
    }
  };

  return (
    <div className="relative min-h-screen bg-[#FCFAF7] flex items-center justify-center p-4 selection:bg-[#E5C158]/30 overflow-hidden">
      {/* Golden Background Animation */}
      <GlassLogoBackground />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 max-w-md w-full bg-white/90 backdrop-blur-xl rounded-3xl border border-[#E5C158]/50 shadow-[0_25px_60px_rgba(44,24,16,0.12),0_0_30px_rgba(229,193,88,0.2)] p-8 sm:p-10 overflow-hidden"
      >
        {/* Top Gold Accent Bar */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#E5C158] via-[#FFD700] to-[#C5A059]" />

        {/* Logo & Header */}
        <div className="text-center mb-8 pt-2">
          <div className="w-16 h-16 bg-[#523626] border-2 border-[#E5C158]/70 text-[#E5C158] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-[#E5C158]/20 font-serif font-bold text-2xl">
            M
          </div>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8C6E5D] bg-[#F8F5F2] px-3.5 py-1 rounded-full border border-[#E5C158]/40 shadow-xs inline-flex items-center gap-1.5">
            <Lock className="w-3 h-3 text-[#C5A059]" />
            Acesso Restrito
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#523626] mt-3">
            Mariana Leone
          </h1>
          <p className="text-xs text-[#8C6E5D] mt-1 font-serif italic">
            Painel Administrativo do Estúdio
          </p>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="mb-6 p-4 rounded-2xl bg-rose-50/90 backdrop-blur-sm border border-rose-200 flex items-start gap-3 text-rose-800 text-xs animate-in fade-in">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Acesso Negado</p>
              <p className="mt-0.5 opacity-90">{errorMessage}</p>
            </div>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#523626] mb-2">
              <Mail className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>E-mail do Administrador</span>
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@marinail.com"
              className="w-full px-4 py-3 rounded-2xl border border-[#EADEDA] focus:border-[#E5C158] focus:ring-2 focus:ring-[#E5C158]/30 outline-none text-sm text-[#523626] bg-white/95 font-medium transition-all shadow-xs"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#523626] mb-2">
              <Lock className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Senha de Acesso</span>
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-2xl border border-[#EADEDA] focus:border-[#E5C158] focus:ring-2 focus:ring-[#E5C158]/30 outline-none text-sm text-[#523626] bg-white/95 font-medium transition-all shadow-xs"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 bg-gradient-to-r from-[#E5C158] via-[#FFD700] to-[#C5A059] hover:from-[#C5A059] hover:to-[#E5C158] text-[#3D2314] py-3.5 rounded-full font-bold uppercase tracking-widest text-xs shadow-lg shadow-[#E5C158]/30 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
          >
            {loading ? (
              <span>Autenticando...</span>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4 text-[#3D2314]" />
                <span>ENTRAR NO PAINEL</span>
                <ArrowRight className="w-4 h-4 text-[#3D2314]" />
              </>
            )}
          </button>
        </form>

        {/* Back to Public Site */}
        <div className="mt-8 text-center pt-6 border-t border-[#EADEDA]/60">
          <button
            onClick={() => navigate('/')}
            className="text-xs text-[#8C6E5D] hover:text-[#523626] transition-colors font-medium flex items-center justify-center gap-1.5 mx-auto hover:underline"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Voltar para o site público</span>
          </button>
        </div>

      </motion.div>
    </div>
  );
};
