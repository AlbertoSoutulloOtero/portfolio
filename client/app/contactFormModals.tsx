'use client';

import { useState } from 'react';
import { sendContactForm } from './contactForm'; 

export default function ContactFormModals() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    description: '',
  });

  const [status, setStatus] = useState<{ loading: boolean; error: string | null }>({
    loading: false,
    error: null,
  });

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleSubmit = async () => {
    setStatus({ loading: true, error: null });

    const result = await sendContactForm(formData);

    if (result.success) {
      setStatus({ loading: false, error: null });
      nextStep(); // Pasa al paso 4 (Mensaje de éxito)
    } else {
      setStatus({ 
        loading: false, 
        error: result.error || 'Algo salió mal al enviar el formulario.' 
      });
    }
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)} 
        className="fixed bottom-6 left-6 bg-[var(--bg-page)] text-[var(--text-main)] hover:bg-[var(--text-main)] hover:text-[var(--bg-page)] px-6 py-3 font-bold border-2 border-[var(--text-main)] transition-all duration-0 hover:duration-300 z-50 shadow-[4px_4px_0px_0px_var(--text-muted)] active:translate-y-1 active:shadow-none"
      >
        CONTACT
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white border-4 border-black p-8 max-w-md w-full relative shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        
        {/* Botón para cerrar todo */}
        <button 
          onClick={() => { setIsOpen(false); setStep(1); }} 
          className="absolute top-2 right-4 font-bold text-xl hover:text-red-500"
        >
          ×
        </button>

        {step === 1 && (
          <div>
            <h3 className="text-xl font-black uppercase tracking-tight mb-2">¿What is your name?</h3>
            <p className="text-sm text-gray-600 mb-4">Introduce tu nombre o el de tu empresa.</p>
            <input 
              type="text" 
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Ej. John Doe"
              className="w-full border-2 border-black p-3 font-medium outline-none focus:bg-gray-50"
            />
            <button 
              disabled={!formData.name.trim()} 
              onClick={nextStep} 
              className="w-full bg-black text-white font-bold p-3 mt-6 border-2 border-black hover:bg-white hover:text-black disabled:opacity-50 disabled:pointer-events-none transition-colors"
            >
              SIGUIENTE →
            </button>
          </div>
        )}

        {step === 2 && (
          <div>
            <h3 className="text-xl font-black uppercase tracking-tight mb-2">¿Cuál es tu email?</h3>
            <p className="text-sm text-gray-600 mb-4">Te responderé a esta dirección.</p>
            <input 
              type="email" 
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="ejemplo@correo.com"
              className="w-full border-2 border-black p-3 font-medium outline-none focus:bg-gray-50"
            />
            <div className="flex gap-4 mt-6">
              <button onClick={prevStep} className="w-1/3 border-2 border-black font-bold p-3 hover:bg-gray-100 transition-colors">
                ATRÁS
              </button>
              <button 
                disabled={!formData.email.includes('@')} 
                onClick={nextStep} 
                className="w-2/3 bg-black text-white font-bold p-3 border-2 border-black hover:bg-white hover:text-black disabled:opacity-50 disabled:pointer-events-none transition-colors"
              >
                SIGUIENTE →
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h3 className="text-xl font-black uppercase tracking-tight mb-2">Cuéntame tu idea</h3>
            <p className="text-sm text-gray-600 mb-4">¿En qué proyecto estás pensando?</p>
            <textarea 
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Escribe aquí los detalles del proyecto..."
              className="w-full border-2 border-black p-3 font-medium outline-none focus:bg-gray-50 resize-none"
            />
            {status.error && <p className="text-red-500 font-bold text-xs mt-2">❌ {status.error}</p>}
            <div className="flex gap-4 mt-6">
              <button onClick={prevStep} disabled={status.loading} className="w-1/3 border-2 border-black font-bold p-3 hover:bg-gray-100 transition-colors">
                ATRÁS
              </button>
              <button 
                disabled={!formData.description.trim() || status.loading} 
                onClick={handleSubmit} 
                className="w-2/3 bg-black text-white font-bold p-3 border-2 border-black hover:bg-white hover:text-black disabled:opacity-50 disabled:pointer-events-none transition-colors"
              >
                {status.loading ? 'ENVIANDO...' : 'ENVIAR MENSAJE 🚀'}
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="text-center py-4">
            <div className="text-4xl mb-4">🎉</div>
            <h3 className="text-2xl font-black uppercase tracking-tight mb-2">¡Todo listo!</h3>
            <p className="text-sm text-gray-600 mb-6">El mensaje se ha enviado correctamente. Te responderé lo antes posible.</p>
            <button 
              onClick={() => { setIsOpen(false); setStep(1); setFormData({ name: '', email: '', description: '' }); }} 
              className="bg-black text-white font-bold px-6 py-3 border-2 border-black hover:bg-white hover:text-black transition-colors"
            >
              CERRAR WINDOWS
            </button>
          </div>
        )}

      </div>
    </div>
  );
}