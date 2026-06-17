'use client';

import { useState } from 'react';
import { sendContactForm } from './contactForm';

const inputClass =
  'w-full border-2 border-[var(--text-main)] bg-[var(--bg-page)] text-[var(--text-main)] placeholder:text-[var(--text-muted)] p-3 font-medium outline-none focus:bg-[var(--bg-card)] transition-colors';

const primaryBtnClass =
  'bg-[var(--text-main)] text-[var(--bg-page)] font-bold p-3 border-2 border-[var(--text-main)] hover:bg-[var(--bg-page)] hover:text-[var(--text-main)] disabled:opacity-50 disabled:pointer-events-none transition-colors';

const secondaryBtnClass =
  'border-2 border-[var(--text-main)] text-[var(--text-main)] font-bold p-3 hover:bg-[var(--text-main)] hover:text-[var(--bg-page)] transition-colors';

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
        error: result.error || 'Something went wrong while sending the form.' 
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
      <div className="bg-[var(--bg-page)] text-[var(--text-main)] border-4 border-[var(--text-main)] p-8 max-w-md w-full relative shadow-[8px_8px_0px_0px_var(--text-muted)] transition-colors">
        
        {/* Botón para cerrar todo */}
        <button 
          onClick={() => { setIsOpen(false); setStep(1); }} 
          className="absolute top-2 right-4 font-bold text-xl text-[var(--text-main)] hover:text-red-500 transition-colors"
        >
          ×
        </button>

        {step === 1 && (
          <div>
            <h3 className="text-xl font-black uppercase tracking-tight mb-2">What is your name?</h3>
            <p className="text-sm text-[var(--text-muted)] mb-4">Your name or your company&apos;s name.</p>
            <input 
              type="text" 
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. John Doe"
              className={inputClass}
            />
            <button 
              disabled={!formData.name.trim()} 
              onClick={nextStep} 
              className={`w-full mt-6 ${primaryBtnClass}`}
            >
              NEXT →
            </button>
          </div>
        )}

        {step === 2 && (
          <div>
            <h3 className="text-xl font-black uppercase tracking-tight mb-2">What is your email?</h3>
            <p className="text-sm text-[var(--text-muted)] mb-4">I&apos;ll reply to this address.</p>
            <input 
              type="email" 
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="example@email.com"
              className={inputClass}
            />
            <div className="flex gap-4 mt-6">
              <button onClick={prevStep} className={`w-1/3 ${secondaryBtnClass}`}>
                BACK
              </button>
              <button 
                disabled={!formData.email.includes('@')} 
                onClick={nextStep} 
                className={`w-2/3 ${primaryBtnClass}`}
              >
                NEXT →
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h3 className="text-xl font-black uppercase tracking-tight mb-2">Tell me your idea</h3>
            <p className="text-sm text-[var(--text-muted)] mb-4">What project are you thinking about?</p>
            <textarea 
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Write the project details here..."
              className={`${inputClass} resize-none`}
            />
            {status.error && <p className="text-red-500 font-bold text-xs mt-2">❌ {status.error}</p>}
            <div className="flex gap-4 mt-6">
              <button onClick={prevStep} disabled={status.loading} className={`w-1/3 ${secondaryBtnClass} disabled:opacity-50`}>
                BACK
              </button>
              <button 
                disabled={!formData.description.trim() || status.loading} 
                onClick={handleSubmit} 
                className={`w-2/3 ${primaryBtnClass}`}
              >
                {status.loading ? 'SENDING...' : (
                  <span className="flex items-center justify-center gap-2">
                    SEND
                    <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="currentColor">
                      <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/>
                    </svg>
                  </span>
                )}
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="text-center py-4">
            <div className="text-4xl mb-4">🎉</div>
            <h3 className="text-2xl font-black uppercase tracking-tight mb-2">All set!</h3>
            <p className="text-sm text-[var(--text-muted)] mb-6">Your message has been sent successfully. I&apos;ll get back to you as soon as possible.</p>
          </div>
        )}

      </div>
    </div>
  );
}