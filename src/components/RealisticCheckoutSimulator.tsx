import React, { useState } from 'react';
import {
  Bot,
  ShieldAlert,
  Zap,
  Lock,
  CreditCard,
  CheckCircle2,
  X,
  Sliders,
  DollarSign,
  AlertOctagon,
  Terminal,
  Layers,
  Sparkles,
} from 'lucide-react';
import { AccessLog } from '../types';

interface RealisticCheckoutSimulatorProps {
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

export const RealisticCheckoutSimulator: React.FC<RealisticCheckoutSimulatorProps> = ({
  onInjectNormalOrder,
  onInjectBotSwarm,
  language = 'en',
  totalProtectedUsd = 0,
  totalThreats = 0,
}) => {
  const isAr = language === 'ar';

  // WooCommerce Checkout State (Innocent UI)
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'paypal'>('cod');
  const [billingName, setBillingName] = useState('John Doe');
  const [billingEmail, setBillingEmail] = useState('john.doe@example.com');
  const [billingAddress, setBillingAddress] = useState('123 Cyber Way, Suite 400');

  // Secret Modal State
  const [isAttackModalOpen, setIsAttackModalOpen] = useState(false);
  const [botCount, setBotCount] = useState<number>(50);
  const [targetCartValue, setTargetCartValue] = useState<number>(2499.0);
  const [attackSignature, setAttackSignature] = useState<string>('[BOT-SWARM-A]');
  const [simulatedFailures, setSimulatedFailures] = useState<number>(28);
  const [isLaunching, setIsLaunching] = useState(false);

  // Apply Coupon Handler
  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.trim()) {
      setCouponApplied(true);
    }
  };

  // Triggered when user clicks the massive Coral "Place order" button
  const handlePlaceOrderClick = (e: React.FormEvent) => {
    e.preventDefault();
    // SECRET INTERCEPT: Open dark-themed Hacker Modal Window instead of standard submit
    setIsAttackModalOpen(true);
  };

  // Launch Attack from Modal
  const handleExecuteAttack = () => {
    setIsLaunching(true);

    setTimeout(() => {
      setIsLaunching(false);
      setIsAttackModalOpen(false);

      if (onInjectBotSwarm) {
        onInjectBotSwarm(
          botCount,
          attackSignature,
          `${botCount}x ${attackSignature}`,
          targetCartValue
        );
      }
    }, 600);
  };

  // Alternative: Safe Normal Order
  const handleExecuteNormal = () => {
    setIsAttackModalOpen(false);
    if (onInjectNormalOrder) {
      onInjectNormalOrder({
        ip_address: `192.168.1.${Math.floor(Math.random() * 180) + 20}`,
        cart_value_usd: couponApplied ? 18.0 : 20.0,
        session_duration: 240,
        payment_failures: 0,
        threat_type: 'Legitimate Buyer',
      });
    }
  };

  const finalTotal = couponApplied ? 18.0 : 20.0;

  return (
    <div
      className="bg-[#f9fafb] text-[#333333] font-sans py-8 px-4 sm:px-6 lg:px-8 min-h-[85vh] transition-colors"
      dir={isAr ? 'rtl' : 'ltr'}
    >
      <div className="max-w-4xl mx-auto">
        {/* Top Notice Bar */}
        <div className="mb-6 bg-white border border-gray-200 rounded-md p-4 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-2.5 text-sm text-gray-600">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>
              {isAr
                ? 'لديك كوبون تخفيض؟ '
                : 'Have a coupon? '}
              <a
                href="#coupon-section"
                className="text-[#ff5722] hover:underline font-medium"
              >
                {isAr ? 'انقر هنا لإدخال الكود' : 'Click here to enter your code'}
              </a>
            </span>
          </div>
          <span className="text-xs text-gray-400 font-mono hidden sm:inline-block">
            SSL 256-bit Secure
          </span>
        </div>

        {/* Main 2-Column WooCommerce Layout */}
        <form onSubmit={handlePlaceOrderClick} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Billing Details (Innocent standard fields) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white p-6 rounded-md border border-gray-200 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-6 pb-3 border-b border-gray-100">
                {isAr ? 'تفاصيل الفاتورة' : 'Billing details'}
              </h2>

              <div className="space-y-4 text-sm">
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    {isAr ? 'الاسم الكامل *' : 'Full Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={billingName}
                    onChange={(e) => setBillingName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded focus:border-[#ff5722] focus:ring-1 focus:ring-[#ff5722] outline-none text-gray-800"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    {isAr ? 'البريد الإلكتروني *' : 'Email address *'}
                  </label>
                  <input
                    type="email"
                    required
                    value={billingEmail}
                    onChange={(e) => setBillingEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded focus:border-[#ff5722] focus:ring-1 focus:ring-[#ff5722] outline-none text-gray-800"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    {isAr ? 'عنوان الشارع *' : 'Street address *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={billingAddress}
                    onChange={(e) => setBillingAddress(e.target.value)}
                    placeholder={isAr ? 'رقم المنزل واسم الشارع' : 'House number and street name'}
                    className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded focus:border-[#ff5722] focus:ring-1 focus:ring-[#ff5722] outline-none text-gray-800"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">
                      {isAr ? 'المدينة *' : 'Town / City *'}
                    </label>
                    <input
                      type="text"
                      defaultValue="San Francisco"
                      className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded focus:border-[#ff5722] focus:ring-1 focus:ring-[#ff5722] outline-none text-gray-800"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">
                      {isAr ? 'الرمز البريدي *' : 'Postcode / ZIP *'}
                    </label>
                    <input
                      type="text"
                      defaultValue="94105"
                      className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded focus:border-[#ff5722] focus:ring-1 focus:ring-[#ff5722] outline-none text-gray-800 font-mono"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Coupon Section */}
            <div id="coupon-section" className="bg-white p-5 rounded-md border border-gray-200 shadow-sm">
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
                {isAr ? 'كوبون التخفيض' : 'Coupon Code'}
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder={isAr ? 'رمز الكوبون...' : 'Coupon code...'}
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1 px-3.5 py-2 bg-white border border-gray-300 rounded text-sm focus:border-[#ff5722] outline-none"
                />
                <button
                  type="button"
                  onClick={handleApplyCoupon}
                  className="px-5 py-2 bg-[#ff5722] hover:bg-[#f4511e] text-white text-sm font-semibold rounded transition-colors shadow-sm cursor-pointer"
                >
                  {isAr ? 'تطبيق' : 'Apply'}
                </button>
              </div>
              {couponApplied && (
                <p className="mt-2 text-xs text-emerald-600 font-medium flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {isAr ? 'تم تطبيق خصم 10% بنجاح!' : 'Coupon "SENTINEL10" applied successfully! ($2.00 off)'}
                </p>
              )}
            </div>
          </div>

          {/* Right Column: WooCommerce "Your order" Table & Payment Box */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white p-6 rounded-md border border-gray-200 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                {isAr ? 'طلبك' : 'Your order'}
              </h3>

              {/* Order Table with Dashed Borders */}
              <div className="border-t border-b border-dashed border-gray-300 divide-y divide-dashed divide-gray-300 text-sm">
                
                {/* Table Header */}
                <div className="py-2.5 flex justify-between font-bold text-gray-800 uppercase tracking-wider text-xs">
                  <span>{isAr ? 'المنتج' : 'Product'}</span>
                  <span>{isAr ? 'المجموع الفرعي' : 'Subtotal'}</span>
                </div>

                {/* Row 1: Ninja Silhouette */}
                <div className="py-3.5 flex justify-between items-center text-gray-700">
                  <span className="font-medium text-gray-800">
                    Ninja Silhouette <strong className="text-gray-900">× 1</strong>
                  </span>
                  <span className="font-semibold text-gray-900">$20.00</span>
                </div>

                {/* Row 2: Subtotal */}
                <div className="py-3 flex justify-between items-center text-gray-600">
                  <span className="font-medium">{isAr ? 'المجموع الفرعي' : 'Subtotal'}</span>
                  <span className="font-semibold text-gray-900">$20.00</span>
                </div>

                {/* Row 3: Discount if applied */}
                {couponApplied && (
                  <div className="py-2.5 flex justify-between items-center text-emerald-600 text-xs font-semibold">
                    <span>{isAr ? 'خصم الكوبون' : 'Coupon Discount'}</span>
                    <span>-$2.00</span>
                  </div>
                )}

                {/* Row 4: Shipping */}
                <div className="py-3 flex justify-between items-center text-gray-600">
                  <span className="font-medium">{isAr ? 'الشحن' : 'Shipping'}</span>
                  <span className="text-gray-800">{isAr ? 'شحن مجاني' : 'Free shipping'}</span>
                </div>

                {/* Row 5: Final Total */}
                <div className="py-4 flex justify-between items-center text-base font-bold text-gray-900 bg-gray-50/50 px-2 -mx-2">
                  <span>{isAr ? 'الإجمالي' : 'Total'}</span>
                  <span className="text-xl font-bold text-[#ff5722]">
                    ${finalTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Gray Payment Box */}
              <div className="mt-6 bg-[#f7f7f7] border border-gray-200 rounded-md p-4 space-y-4">
                {/* Option 1: Cash on delivery */}
                <label className="flex items-start gap-3 cursor-pointer select-none">
                  <input
                    type="radio"
                    name="payment_gateway"
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                    className="mt-1 text-[#ff5722] focus:ring-[#ff5722]"
                  />
                  <div>
                    <span className="font-semibold text-gray-800 text-sm block">
                      {isAr ? 'الدفع عند الاستلام' : 'Cash on delivery'}
                    </span>
                    {paymentMethod === 'cod' && (
                      <p className="mt-1.5 text-xs text-gray-600 bg-white p-2.5 rounded border border-gray-200">
                        {isAr
                          ? 'ادفع نقدًا عند استلام طلبك.'
                          : 'Pay with cash upon delivery.'}
                      </p>
                    )}
                  </div>
                </label>

                {/* Option 2: PayPal */}
                <label className="flex items-start gap-3 cursor-pointer select-none border-t border-gray-200 pt-3">
                  <input
                    type="radio"
                    name="payment_gateway"
                    value="paypal"
                    checked={paymentMethod === 'paypal'}
                    onChange={() => setPaymentMethod('paypal')}
                    className="mt-1 text-[#ff5722] focus:ring-[#ff5722]"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-gray-800 text-sm">
                        PayPal
                      </span>
                      <span className="text-[11px] font-bold text-[#003087] bg-white px-2 py-0.5 rounded border border-gray-200">
                        PayPal / Card
                      </span>
                    </div>
                    {paymentMethod === 'paypal' && (
                      <p className="mt-1.5 text-xs text-gray-600 bg-white p-2.5 rounded border border-gray-200">
                        {isAr
                          ? 'الدفع عبر PayPal؛ يمكنك الدفع ببطاقتك الائتمانية حتى بدون حساب PayPal.'
                          : 'Pay via PayPal; you can pay with your credit card if you don’t have a PayPal account.'}
                      </p>
                    )}
                  </div>
                </label>
              </div>

              {/* Privacy Notice */}
              <p className="mt-4 text-xs text-gray-500 leading-relaxed">
                {isAr
                  ? 'سيتم استخدام بياناتك الشخصية لمعالجة طلبك ودعم تجربتك في جميع أنحاء هذا الموقع.'
                  : 'Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our privacy policy.'}
              </p>

              {/* MASSIVE CORAL-RED "PLACE ORDER" BUTTON */}
              <button
                type="submit"
                id="btn-place-order"
                className="mt-6 w-full py-4 px-6 bg-[#ff5722] hover:bg-[#f4511e] active:scale-[0.99] text-white font-extrabold text-lg uppercase tracking-wider rounded-md shadow-md hover:shadow-lg transition-all duration-150 cursor-pointer flex items-center justify-center gap-2 group"
              >
                <Lock className="w-5 h-5 text-white/80 group-hover:scale-110 transition-transform" />
                <span>{isAr ? 'تأكيد الطلب' : 'Place order'}</span>
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* ========================================================================= */}
      {/* PART 2: THE SECRET ATTACK WINDOW (DARK-THEMED HACKER OVERLAY MODAL) */}
      {/* ========================================================================= */}
      {isAttackModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div
            className="w-full max-w-xl bg-[#090d09] border-2 border-[#a3ff00]/60 rounded-2xl shadow-[0_0_50px_rgba(163,255,0,0.25)] text-white overflow-hidden relative"
            dir={isAr ? 'rtl' : 'ltr'}
          >
            {/* Top Scanning Cyber Line */}
            <div className="h-1 bg-gradient-to-r from-transparent via-[#a3ff00] to-transparent animate-pulse" />

            {/* Modal Header */}
            <div className="p-5 sm:p-6 border-b border-[#1f2e1f] bg-[#0c140c] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#a3ff00]/10 border border-[#a3ff00]/40 flex items-center justify-center text-[#a3ff00] shadow-[0_0_15px_rgba(163,255,0,0.3)]">
                  <Bot className="w-6 h-6 animate-bounce" />
                </div>
                <div>
                  <h3 className="font-mono font-black text-lg sm:text-xl text-white tracking-wide flex items-center gap-2">
                    <span>🤖</span>
                    <span>{isAr ? 'بروتوكول حقن سرب البوتات' : 'Bot Swarm Injection Protocol'}</span>
                  </h3>
                  <p className="text-xs font-mono text-[#a3ff00]/80">
                    DEVSECOPS ATTACK VECTOR CONTROLLER • v2.4
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsAttackModalOpen(false)}
                className="text-gray-400 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body / Attack Configuration */}
            <div className="p-6 space-y-6 bg-[#070b07] font-mono text-sm">
              
              {/* Info Callout */}
              <div className="p-3 bg-[#111c11] border border-[#a3ff00]/30 rounded-lg flex items-start gap-2.5 text-xs text-gray-300">
                <Terminal className="w-4 h-4 text-[#a3ff00] shrink-0 mt-0.5" />
                <p>
                  {isAr
                    ? 'تم اعتراض عملية الشراء. قم بتهيئة حمولة هجوم البوتات واختبار استجابة خوارزمية Isolation Forest AI في الوقت الفعلي.'
                    : 'Checkout intercepted. Configure your bot attack payload and evaluate the real-time Isolation Forest AI Sentinel defense.'}
                </p>
              </div>

              {/* Control 1: Slider for Number of Bots (1 to 500) */}
              <div className="space-y-2 bg-[#0c130c] p-4 rounded-xl border border-[#1f2e1f]">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-gray-300 uppercase tracking-wider flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-[#a3ff00]" />
                    {isAr ? '1. عدد البوتات (1 إلى 500)' : '1. Number of Bots (1 to 500)'}
                  </label>
                  <span className="px-2.5 py-0.5 rounded bg-[#a3ff00]/20 border border-[#a3ff00] text-[#a3ff00] font-black text-sm">
                    {botCount} BOTS
                  </span>
                </div>

                <input
                  type="range"
                  min="1"
                  max="500"
                  value={botCount}
                  onChange={(e) => setBotCount(Number(e.target.value))}
                  className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-[#a3ff00]"
                />

                <div className="flex justify-between text-[10px] text-gray-500 font-mono">
                  <span>1 Single Probe</span>
                  <span>100 Swarm</span>
                  <span>250 Surge</span>
                  <span>500 Massive DDoS</span>
                </div>
              </div>

              {/* Control 2: Target Cart Value ($) */}
              <div className="space-y-2 bg-[#0c130c] p-4 rounded-xl border border-[#1f2e1f]">
                <label className="text-xs font-bold text-gray-300 uppercase tracking-wider flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-[#a3ff00]" />
                  {isAr ? '2. قيمة السلة المستهدفة ($)' : '2. Target Cart Value ($)'}
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 ltr:left-3 rtl:right-3 flex items-center text-gray-400 font-bold">
                    $
                  </span>
                  <input
                    type="number"
                    min="1"
                    step="1"
                    value={targetCartValue}
                    onChange={(e) => setTargetCartValue(Number(e.target.value))}
                    className="w-full bg-[#050805] border border-[#1f2e1f] rounded-lg py-2.5 ltr:pl-8 rtl:pr-8 px-3 text-white font-bold focus:border-[#a3ff00] outline-none"
                    placeholder="2499.00"
                  />
                </div>
                <p className="text-[11px] text-gray-400">
                  {isAr
                    ? 'يختبر قدرة الذكاء الاصطناعي على حظر عمليات الاحتيال عالية القيمة.'
                    : 'Tests high-value checkout fraud anomaly detection.'}
                </p>
              </div>

              {/* Control 3: Attack Signature Dropdown */}
              <div className="space-y-2 bg-[#0c130c] p-4 rounded-xl border border-[#1f2e1f]">
                <label className="text-xs font-bold text-gray-300 uppercase tracking-wider flex items-center gap-2">
                  <AlertOctagon className="w-4 h-4 text-[#a3ff00]" />
                  {isAr ? '3. بصمة الهجوم (Attack Signature)' : '3. Attack Signature'}
                </label>
                <select
                  value={attackSignature}
                  onChange={(e) => setAttackSignature(e.target.value)}
                  className="w-full bg-[#050805] border border-[#1f2e1f] rounded-lg p-2.5 text-white font-mono text-xs focus:border-[#a3ff00] outline-none"
                >
                  <option value="[BOT-SWARM-A]">[BOT-SWARM-A] - Carding & Brute Velocity Attack</option>
                  <option value="[DDoS-PAYMENT]">[DDoS-PAYMENT] - Gateway Resource Depletion</option>
                  <option value="[SQL-INJECTION-TEST]">[SQL-INJECTION-TEST] - Malformed Query Payload</option>
                  <option value="[CARD-TESTING-BOT]">[CARD-TESTING-BOT] - Rapid Low-Value CVV Probing</option>
                  <option value="[CREDENTIAL-STUFFING]">[CREDENTIAL-STUFFING] - Account Takeover Wave</option>
                </select>
              </div>

              {/* Estimated Impact Telemetry */}
              <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                <div className="bg-[#111911] p-3 rounded-lg border border-[#1f2e1f]">
                  <span className="text-gray-400 block text-[11px]">{isAr ? 'إجمالي الحجم المحتمل' : 'Estimated Volume'}</span>
                  <span className="text-base font-bold text-white font-mono">
                    ${(botCount * targetCartValue).toLocaleString()} USD
                  </span>
                </div>
                <div className="bg-[#111911] p-3 rounded-lg border border-[#1f2e1f]">
                  <span className="text-gray-400 block text-[11px]">{isAr ? 'معدل الفشل المتوقع' : 'Payment Failures'}</span>
                  <span className="text-base font-bold text-[#ff3344] font-mono">
                    25-45 / sec
                  </span>
                </div>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="p-5 bg-[#0c140c] border-t border-[#1f2e1f] flex flex-col sm:flex-row gap-3">
              {/* Innocent Normal Order Option */}
              <button
                type="button"
                onClick={handleExecuteNormal}
                className="sm:w-1/3 py-3 px-4 rounded-xl border border-gray-700 bg-gray-800/80 hover:bg-gray-700 text-gray-200 text-xs font-bold transition-all cursor-pointer text-center"
              >
                {isAr ? 'إرسال كطلب طبيعي (1x)' : 'Send as Normal Order (1x)'}
              </button>

              {/* GLOWING NEON-GREEN "LAUNCH ATTACK" BUTTON */}
              <button
                type="button"
                id="btn-launch-attack"
                onClick={handleExecuteAttack}
                disabled={isLaunching}
                className="flex-1 py-3.5 px-6 rounded-xl bg-[#a3ff00] hover:bg-[#b8ff33] text-black font-mono font-black text-sm sm:text-base uppercase tracking-wider shadow-[0_0_25px_rgba(163,255,0,0.4)] hover:shadow-[0_0_35px_rgba(163,255,0,0.6)] transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Zap className="w-5 h-5 text-black fill-current animate-pulse" />
                <span>
                  {isLaunching
                    ? isAr
                      ? 'جاري إطلاق الهجوم...'
                      : 'LAUNCHING ATTACK...'
                    : isAr
                    ? `إطلاق الهجوم (${botCount} بوت)`
                    : `LAUNCH ATTACK (${botCount} BOTS)`}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
