import React, { useState } from 'react';
import {
  Sliders,
  CheckCircle2,
  AlertTriangle,
  Play,
  Bot,
  Zap,
  CreditCard,
  Lock,
  RotateCcw,
  ShieldCheck,
} from 'lucide-react';
import { AccessLog } from '../types';

interface CheckoutSimulatorProps {
  onInjectNormalOrder?: (payload: Partial<AccessLog>) => void;
  onInjectBotSwarm?: (
    count: number,
    signature: string,
    modeName: string,
    cartValue?: number
  ) => void;
  language?: 'ar' | 'en';
  totalProtectedUsd?: number;
  totalThreats?: number;
}

export const CheckoutSimulator: React.FC<CheckoutSimulatorProps> = ({
  onInjectNormalOrder,
  onInjectBotSwarm,
  language = 'ar',
}) => {
  const isAr = language === 'ar';

  // Attack Configuration States
  const [botCount, setBotCount] = useState<number>(10);
  const [cartValue, setCartValue] = useState<number>(2499);
  const [attackSignature, setAttackSignature] = useState<string>('[BOT-SWARM-A]');
  const [isLaunching, setIsLaunching] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>('');

  // Checkout UI States
  const [couponCode, setCouponCode] = useState<string>('');
  const [couponApplied, setCouponApplied] = useState<boolean>(false);
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'paypal'>('cod');

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLaunching(true);
    setSuccessMessage('');

    setTimeout(() => {
      setIsLaunching(false);
      const effectiveCart = couponApplied ? Math.max(1, cartValue - 20) : cartValue;
      setSuccessMessage(
        isAr
          ? `تم بنجاح حقن سرب من ${botCount} بوتات بقيمة سلة $${effectiveCart} (بصمة: ${attackSignature}). تم اعتراض الهجوم وتحليله بواسطة Sentinel AI.`
          : `Successfully injected bot swarm of ${botCount} bots ($${effectiveCart} cart value, Signature: ${attackSignature}). Intercepted & analyzed by Sentinel AI.`
      );

      if (onInjectBotSwarm) {
        onInjectBotSwarm(
          botCount,
          attackSignature,
          `${botCount}x ${attackSignature}`,
          effectiveCart
        );
      }
    }, 900);
  };

  const handleSimulateLegitimateOrder = () => {
    if (onInjectNormalOrder) {
      onInjectNormalOrder({
        cart_value_usd: currentTotal,
        session_duration: 180,
        payment_failures: 0,
      });
    }
    setSuccessMessage(
      isAr
        ? `تم تمرير معاملة شراء حقيقية آمنة بقيمة $${currentTotal}.00 واعتمدها النظام.`
        : `Safe customer order of $${currentTotal}.00 successfully processed and approved.`
    );
  };

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.trim()) {
      setCouponApplied(true);
    }
  };

  const currentTotal = couponApplied ? Math.max(1, cartValue - 20) : cartValue;

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 pb-24 lg:pb-12 max-w-7xl mx-auto w-full">
      {/* Header section */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-100">
          {isAr ? 'محاكي هجمات بوابات الدفع والمتاجر' : 'Checkout & Attack Simulator'}
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400 mt-1">
          {isAr
            ? 'قم بتهيئة معاملات الدفع الاحتيالية واختبر استجابة خوارزمية العزل الآلي في الوقت الفعلي.'
            : 'Configure simulated high-velocity checkout fraud attacks and evaluate automated Isolation Forest response.'}
        </p>
      </div>

      {/* Simulator Layout: Stacked Vertically on Mobile/Tablet (flex flex-col), 2-Column Grid on Large Desktop (lg:grid lg:grid-cols-2) */}
      <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 lg:gap-8 items-start w-full">
        
        {/* Panel 1: Dark Attack Configuration Panel (On top on mobile) */}
        <div className="w-full bg-[#18181b] border border-[#27272a] rounded-2xl p-4 sm:p-6 lg:p-8 space-y-6 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-[#27272a]">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#27272a] flex items-center justify-center text-[#a3ff00] shrink-0">
                <Sliders className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-zinc-100">
                  {isAr ? 'إعدادات بروتوكول الهجوم' : 'Attack Configuration Panel'}
                </h3>
                <p className="text-xs text-zinc-400">
                  {isAr ? 'تخصيص بارامترات سرب البوتات' : 'Bot swarm simulation parameters'}
                </p>
              </div>
            </div>

            <span className="text-[11px] sm:text-xs font-mono font-medium px-2.5 py-1 rounded-md bg-[#27272a] text-zinc-300 shrink-0">
              Protocol v1.2
            </span>
          </div>

          <div className="space-y-5">
            {/* Concurrent Bots Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-semibold text-zinc-300">
                  {isAr ? 'عدد البوتات المتزامنة:' : 'Concurrent Bots:'}
                </label>
                <span className="text-xs font-mono font-bold text-[#a3ff00] bg-[#a3ff00]/10 px-2 py-0.5 rounded border border-[#a3ff00]/20">
                  {botCount} {isAr ? 'بوت' : 'Bots'}
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="100"
                value={botCount}
                onChange={(e) => setBotCount(Number(e.target.value))}
                className="w-full accent-[#a3ff00] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-zinc-500 font-mono mt-1">
                <span>1 (Single)</span>
                <span>50 (Swarm)</span>
                <span>100 (DDoS)</span>
              </div>
            </div>

            {/* Target Cart Value */}
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                {isAr ? 'قيمة السلة المستهدفة ($):' : 'Target Cart Value ($):'}
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 ltr:left-3 rtl:right-3 flex items-center text-zinc-500 font-mono text-sm">
                  $
                </span>
                <input
                  type="number"
                  value={cartValue}
                  onChange={(e) => setCartValue(Math.max(1, Number(e.target.value)))}
                  className="w-full bg-[#121215] border border-[#27272a] rounded-xl py-2.5 ltr:pl-8 ltr:pr-3 rtl:pr-8 rtl:pl-3 text-sm text-zinc-100 font-mono focus:border-[#a3ff00] focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Attack Signature Selector */}
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                {isAr ? 'بصمة الهجوم (Attack Signature):' : 'Attack Signature:'}
              </label>
              <select
                value={attackSignature}
                onChange={(e) => setAttackSignature(e.target.value)}
                className="w-full bg-[#121215] border border-[#27272a] rounded-xl p-2.5 text-xs text-zinc-200 font-mono focus:border-[#a3ff00] focus:outline-none transition-colors"
              >
                <option value="[BOT-SWARM-A]">{isAr ? '[BOT-SWARM-A] - هجوم سريع لاختبار البطاقات (Card Testing)' : '[BOT-SWARM-A] - High-Velocity Card Testing'}</option>
                <option value="[DDoS-PAYMENT]">{isAr ? '[DDoS-PAYMENT] - إغراق بوابة الدفع (Payment Gateway Flood)' : '[DDoS-PAYMENT] - Gateway Flood Probing'}</option>
                <option value="[SQL-INJECTION]">{isAr ? '[SQL-INJECTION] - حقن بارامترات الشراء (Query Tampering)' : '[SQL-INJECTION] - Checkout Query Tampering'}</option>
              </select>
            </div>
          </div>

          {/* Preset Quick Actions */}
          <div className="pt-2">
            <label className="block text-[11px] font-bold text-zinc-500 uppercase tracking-wider font-mono mb-2">
              {isAr ? 'قوالب هجوم جاهزة' : 'Quick Scenario Presets'}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  setBotCount(5);
                  setCartValue(499);
                  setAttackSignature('[BOT-SWARM-A]');
                }}
                className="p-2.5 rounded-lg bg-[#121215] hover:bg-[#202024] text-zinc-300 border border-[#27272a] text-xs font-medium transition-colors text-center cursor-pointer"
              >
                {isAr ? 'هجوم خفيف (5 بوتات)' : 'Light Probe (5 Bots)'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setBotCount(75);
                  setCartValue(4800);
                  setAttackSignature('[DDoS-PAYMENT]');
                }}
                className="p-2.5 rounded-lg bg-[#121215] hover:bg-[#202024] text-zinc-300 border border-[#27272a] text-xs font-medium transition-colors text-center cursor-pointer"
              >
                {isAr ? 'إغراق عنيف (75 بوت)' : 'Mass Swarm (75 Bots)'}
              </button>
            </div>
          </div>

          {/* Status & Legitimate Buyer Alternative */}
          <div className="pt-4 border-t border-[#27272a] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <button
              type="button"
              onClick={handleSimulateLegitimateOrder}
              className="text-xs font-medium text-zinc-400 hover:text-emerald-400 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>{isAr ? 'محاكاة مشتري حقيقي آمن' : 'Simulate Clean Customer'}</span>
            </button>

            <span className="text-[11px] font-mono text-zinc-500">
              Ready for Execution
            </span>
          </div>
        </div>

        {/* Panel 2: Target Checkout Mockup - Clean Light Theme (Underneath on mobile) */}
        <div className="w-full bg-white text-zinc-800 rounded-2xl p-4 sm:p-6 lg:p-8 shadow-md border border-zinc-200 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-zinc-200">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-zinc-900">
                {isAr ? 'ملخص الطلب (Your Order)' : 'Your Order'}
              </h3>
              <p className="text-xs text-zinc-500">
                {isAr ? 'بوابة المتجر الإلكتروني المستهدفة' : 'Target E-Commerce Store Checkout'}
              </p>
            </div>
            <span className="text-[11px] sm:text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 shrink-0">
              {isAr ? 'بوابة دفع نشطة' : 'Gateway Online'}
            </span>
          </div>

          {/* Line items table */}
          <div className="space-y-3 text-sm">
            <div className="flex justify-between pb-2 border-b border-zinc-200 text-xs font-bold uppercase tracking-wider text-zinc-500 font-mono">
              <span>{isAr ? 'المنتج' : 'Product'}</span>
              <span>{isAr ? 'المجموع الفرعي' : 'Subtotal'}</span>
            </div>

            <div className="flex justify-between items-center py-2 border-b border-zinc-100 text-zinc-700 gap-2">
              <div className="min-w-0">
                <p className="font-semibold text-zinc-900 text-xs sm:text-sm truncate">Enterprise Cloud License × 1</p>
                <p className="text-[11px] text-zinc-400">SKU: SENTINEL-ENT-902</p>
              </div>
              <span className="font-mono font-bold text-zinc-900 shrink-0 text-sm">${cartValue}.00</span>
            </div>

            {couponApplied && (
              <div className="flex justify-between items-center py-1.5 text-emerald-600 font-medium text-xs">
                <span>{isAr ? 'كوبون الخصم الترويجي' : 'Promo Coupon Discount'}</span>
                <span className="font-mono">-$20.00</span>
              </div>
            )}

            <div className="flex justify-between items-center py-1 text-zinc-500 text-xs">
              <span>{isAr ? 'الشحن والتوصيل الفوري' : 'Instant Delivery'}</span>
              <span className="text-emerald-600 font-semibold">{isAr ? 'مجاني' : 'Free'}</span>
            </div>

            <div className="flex justify-between items-center pt-3 border-t-2 border-zinc-200 text-sm sm:text-base font-bold text-zinc-900">
              <span>{isAr ? 'المبلغ الإجمالي' : 'Total Amount'}</span>
              <span className="text-xl sm:text-2xl font-black font-mono text-zinc-900">${currentTotal}.00</span>
            </div>
          </div>

          {/* Coupon input */}
          <div className="flex gap-2">
            <input
              type="text"
              placeholder={isAr ? 'رمز الكوبون' : 'Coupon Code'}
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              className="flex-1 min-w-0 bg-zinc-50 border border-zinc-300 rounded-xl px-3 sm:px-3.5 py-2 text-xs text-zinc-800 focus:border-zinc-900 focus:outline-none"
            />
            <button
              type="button"
              onClick={handleApplyCoupon}
              className="bg-zinc-900 hover:bg-zinc-800 text-white px-3.5 sm:px-4 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer shrink-0"
            >
              {isAr ? 'تطبيق' : 'Apply'}
            </button>
          </div>

          {/* Payment Method Radio Selection */}
          <form onSubmit={handlePlaceOrder} className="space-y-4 pt-2">
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500">
                {isAr ? 'طريقة الدفع' : 'Payment Method'}
              </label>

              <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-3 sm:p-3.5 space-y-3">
                <label className="flex items-center gap-3 text-xs font-semibold text-zinc-800 cursor-pointer">
                  <input
                    type="radio"
                    name="payment_choice"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                    className="accent-zinc-900 shrink-0"
                  />
                  <span>{isAr ? 'الدفع عند الاستلام (Cash on Delivery)' : 'Cash on Delivery'}</span>
                </label>

                <label className="flex items-center gap-3 text-xs font-semibold text-zinc-800 cursor-pointer">
                  <input
                    type="radio"
                    name="payment_choice"
                    checked={paymentMethod === 'paypal'}
                    onChange={() => setPaymentMethod('paypal')}
                    className="accent-zinc-900 shrink-0"
                  />
                  <span>PayPal Express Checkout</span>
                </label>
              </div>
            </div>

            {/* Submit / Place Order Button */}
            <button
              type="submit"
              disabled={isLaunching}
              className="w-full bg-[#ff3344] hover:bg-[#e62939] text-white py-3.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isLaunching ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin shrink-0" />
                  <span>{isAr ? 'جاري إطلاق الحقن ورصد التهديد...' : 'Injecting Bot Swarm & Analyzing...'}</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current shrink-0" />
                  <span>
                    {isAr
                      ? `إطلاق هجوم السرب وتأكيد الطلب (${botCount} بوت)`
                      : `Launch Bot Attack (${botCount} Bots)`}
                  </span>
                </>
              )}
            </button>
          </form>

          {/* Feedback message banner */}
          {successMessage && (
            <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xl text-xs font-mono flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <p className="leading-relaxed break-words">{successMessage}</p>
            </div>
          )}

          {/* Footnote */}
          <div className="pt-2 text-center text-[11px] text-zinc-400 flex items-center justify-center gap-1.5">
            <Lock className="w-3 h-3 text-zinc-400" />
            <span>256-Bit SSL Encrypted Target Simulation</span>
          </div>
        </div>

      </div>
    </div>
  );
};
