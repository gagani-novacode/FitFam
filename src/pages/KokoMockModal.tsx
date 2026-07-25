import React, { useState } from 'react';
import { Loader2, X, CheckCircle2, ShieldCheck } from 'lucide-react';

interface KokoMockModalProps {
    orderRef: string;
    total: number;
    onConfirm: () => void;
    onCancel: () => void;
}

export const KokoMockModal: React.FC<KokoMockModalProps> = ({
    orderRef,
    total,
    onConfirm,
    onCancel,
}) => {
    const [step, setStep] = useState<'phone' | 'plan' | 'processing' | 'success'>('phone');
    const [phone, setPhone] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const installment = total / 3;
    const fmt = (n: number) =>
        'රු' + n.toLocaleString('en-US', { minimumFractionDigits: 2 });

    const handlePhoneSubmit = () => {
        if (!/^0[0-9]{9}$/.test(phone)) {
            setPhoneError('Enter a valid mobile number (e.g. 077XXXXXXX)');
            return;
        }
        setPhoneError('');
        setStep('plan');
    };

    const handleConfirm = () => {
        setStep('processing');
        setTimeout(() => setStep('success'), 2000);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
            <div className="bg-white w-full max-w-sm rounded-lg shadow-2xl overflow-hidden">

                {/* Header */}
                <div className="bg-indigo-600 px-5 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="text-white font-black text-xl tracking-tight">KOKO</span>
                        <span className="text-indigo-200 text-xs font-medium">Pay Later</span>
                    </div>
                    {(step === 'phone' || step === 'plan') && (
                        <button onClick={onCancel} className="text-indigo-200 hover:text-white transition-colors">
                            <X className="w-5 h-5" />
                        </button>
                    )}
                </div>

                {/* Body */}
                <div className="px-5 py-6">

                    {/* ── Step 1: Phone number ── */}
                    {step === 'phone' && (
                        <>
                            <p className="text-[13px] text-gray-600 mb-1">
                                Enter your Koko-registered mobile number to continue:
                            </p>
                            <p className="text-[11px] text-gray-400 mb-5">
                                We'll verify your Koko account before showing your installment plan.
                            </p>

                            <label className="block text-[12px] text-gray-500 font-medium mb-1.5">
                                Mobile number
                            </label>
                            <div className="flex gap-2 mb-1.5">
                                <span className="border border-gray-300 px-3 py-2.5 text-sm bg-gray-50 text-gray-500 rounded select-none">
                                    +94
                                </span>
                                <input
                                    type="tel"
                                    placeholder="077XXXXXXX"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="flex-1 border border-gray-300 px-3 py-2.5 text-sm rounded outline-none focus:border-indigo-400"
                                    maxLength={10}
                                />
                            </div>
                            {phoneError && (
                                <p className="text-[11px] text-red-500 mb-2">{phoneError}</p>
                            )}

                            <p className="text-[10px] text-gray-400 mt-3 mb-6">
                                This is a simulated payment environment. No real charges will be made.
                            </p>

                            <div className="flex gap-3">
                                <button
                                    onClick={onCancel}
                                    className="flex-1 border border-gray-300 text-gray-600 text-sm py-2.5 rounded hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handlePhoneSubmit}
                                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold py-2.5 rounded transition-colors"
                                >
                                    Continue
                                </button>
                            </div>
                        </>
                    )}

                    {/* ── Step 2: Installment plan ── */}
                    {step === 'plan' && (
                        <>
                            <p className="text-xs text-gray-400 mb-1">Order reference</p>
                            <p className="text-sm font-mono font-semibold text-gray-700 mb-5">{orderRef}</p>

                            <p className="text-[13px] text-gray-600 mb-4">
                                Split your payment into{' '}
                                <span className="font-bold text-indigo-600">3 interest-free installments</span>:
                            </p>

                            <div className="space-y-3 mb-6">
                                {[
                                    { label: '1st payment', note: 'Due today' },
                                    { label: '2nd payment', note: 'Due in 30 days' },
                                    { label: '3rd payment', note: 'Due in 60 days' },
                                ].map(({ label, note }, i) => (
                                    <div
                                        key={i}
                                        className={`flex items-center justify-between rounded-md px-4 py-3 border ${i === 0 ? 'border-indigo-300 bg-indigo-50' : 'border-gray-200 bg-gray-50'
                                            }`}
                                    >
                                        <div>
                                            <p className={`text-[13px] font-semibold ${i === 0 ? 'text-indigo-700' : 'text-gray-700'}`}>
                                                {label}
                                            </p>
                                            <p className="text-[11px] text-gray-400">{note}</p>
                                        </div>
                                        <span className={`text-[15px] font-bold ${i === 0 ? 'text-indigo-700' : 'text-gray-600'}`}>
                                            {fmt(installment)}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div className="flex items-center gap-1.5 text-[11px] text-gray-400 mb-6">
                                <ShieldCheck className="w-3.5 h-3.5 text-indigo-400 flex-shrink-0" />
                                Secured by Koko. No hidden fees. 0% interest.
                            </div>

                            <div className="flex gap-3">
                                <button
                                    onClick={onCancel}
                                    className="flex-1 border border-gray-300 text-gray-600 text-sm py-2.5 rounded hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleConfirm}
                                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold py-2.5 rounded transition-colors"
                                >
                                    Pay {fmt(installment)} now
                                </button>
                            </div>
                        </>
                    )}

                    {/* ── Step 3: Processing ── */}
                    {step === 'processing' && (
                        <div className="flex flex-col items-center py-8 gap-4">
                            <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
                            <p className="text-sm text-gray-600 font-medium">Processing your payment…</p>
                            <p className="text-xs text-gray-400">Please don't close this window.</p>
                        </div>
                    )}

                    {/* ── Step 4: Success ── */}
                    {step === 'success' && (
                        <div className="flex flex-col items-center py-8 gap-4 text-center">
                            <CheckCircle2 className="w-12 h-12 text-green-500" />
                            <div>
                                <p className="text-base font-bold text-gray-800">Payment successful!</p>
                                <p className="text-xs text-gray-400 mt-1">
                                    First installment of {fmt(installment)} confirmed.
                                </p>
                            </div>
                            <button
                                onClick={onConfirm}
                                className="mt-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-8 py-2.5 rounded transition-colors"
                            >
                                Continue
                            </button>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};