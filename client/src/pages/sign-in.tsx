import { useState, useRef } from "react";
import { User, Lock, Eye, EyeOff, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import farmIllustration from "@assets/generated_images/3d_farm_scene_illustration.png";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const validateEmail = (value: string): boolean => {
    if (!value.trim()) {
      setEmailError("Email or username is required");
      return false;
    }
    if (value.includes("@")) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        setEmailError("Please enter a valid email address");
        return false;
      }
    }
    setEmailError("");
    return true;
  };

  const validatePassword = (value: string): boolean => {
    if (!value) {
      setPasswordError("Password is required");
      return false;
    }
    if (value.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    
    if (!isEmailValid) {
      emailRef.current?.focus();
      return;
    }
    
    if (!isPasswordValid) {
      passwordRef.current?.focus();
      return;
    }
    
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Sign in successful!",
        description: "Welcome back to Smart Crop Prediction System.",
      });
    }, 1000);
  };

  const handleGoogleSignIn = () => {
    toast({
      title: "Google Sign-in",
      description: "(UI only) Google Sign-in clicked",
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Panel - Branding */}
      <div 
        className="hidden lg:flex lg:w-1/2 relative overflow-hidden"
        style={{
          background: "linear-gradient(145deg, #0a8f56 0%, #0fb06b 40%, #3bd18b 100%)"
        }}
      >
        {/* Background pattern */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <div className="relative z-10 flex flex-col justify-between px-10 xl:px-14 py-12 w-full h-full">
          {/* Top section */}
          <div>
            {/* Logo/Brand */}
            <div className="flex items-center gap-3 mb-12">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-7 h-7 text-white" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <span className="font-display text-xl font-semibold text-white">CropPredict</span>
            </div>

            {/* Main heading */}
            <h1 className="font-display text-4xl xl:text-5xl font-bold text-white leading-tight mb-5">
              Smart Crop<br />Prediction System
            </h1>
            <p className="text-white/85 text-lg max-w-sm leading-relaxed mb-10">
              Empowering Sri Lankan farmers with data-driven agricultural predictions for better yields.
            </p>

            {/* Feature highlights */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white/15 backdrop-blur-sm rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-medium">Real-time Analytics</h3>
                  <p className="text-white/70 text-sm">Monitor crop health and weather patterns</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white/15 backdrop-blur-sm rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M12 6v6l4 2"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-medium">Smart Predictions</h3>
                  <p className="text-white/70 text-sm">AI-powered harvest timing recommendations</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white/15 backdrop-blur-sm rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-medium">Farmer Community</h3>
                  <p className="text-white/70 text-sm">Connect with 10,000+ local farmers</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom section with illustration */}
          <div className="relative mt-8">
            <img 
              src={farmIllustration} 
              alt="Farm illustration with barn and crops"
              className="w-full max-w-xs object-contain mx-auto drop-shadow-2xl"
            />
          </div>
        </div>
        
        {/* Decorative elements */}
        <div 
          className="absolute top-0 right-0 w-96 h-96 pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)"
          }}
        />
        <div 
          className="absolute bottom-0 left-0 w-64 h-64 pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)"
          }}
        />
        
        {/* Right edge blend into white */}
        <div 
          className="absolute top-0 right-0 bottom-0 w-32 pointer-events-none"
          style={{
            background: "linear-gradient(to right, transparent 0%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.4) 100%)"
          }}
        />
      </div>
      
      {/* Center divider blend */}
      <div 
        className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-24 -translate-x-1/2 pointer-events-none z-10"
        style={{
          background: "linear-gradient(to right, rgba(59, 209, 139, 0.3) 0%, rgba(59, 209, 139, 0.1) 30%, rgba(249, 250, 251, 0.1) 70%, rgba(249, 250, 251, 0.3) 100%)"
        }}
      />

      {/* Right Panel - Sign In Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 bg-gray-50/50">
        {/* Mobile branding header */}
        <div className="lg:hidden absolute top-0 left-0 right-0 p-6" style={{ background: "linear-gradient(135deg, #0fb06b 0%, #3bd18b 100%)" }}>
          <h1 className="font-display text-2xl font-bold text-white">Smart Crop Prediction</h1>
        </div>

        <div className="w-full max-w-[440px] mt-20 lg:mt-0">
          {/* Card */}
          <div 
            className="bg-white rounded-2xl p-8 lg:p-10 shadow-xl"
            style={{ 
              border: "1px solid rgba(0,0,0,0.06)",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.08)"
            }}
          >
            <h2 className="font-display text-2xl lg:text-3xl font-bold text-gray-900 mb-8">
              Sign In
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email/Username Input */}
              <div>
                <label htmlFor="email" className="sr-only">
                  Username or Email
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <User size={20} strokeWidth={1.5} />
                  </div>
                  <input
                    ref={emailRef}
                    id="email"
                    type="text"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (emailError) validateEmail(e.target.value);
                    }}
                    onBlur={() => email && validateEmail(email)}
                    placeholder="Username or Email"
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl text-gray-900 placeholder-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#0fb06b]/30 gradient-border input-shadow"
                    style={{ 
                      backgroundColor: "#fbefef",
                    }}
                    aria-invalid={!!emailError}
                    aria-describedby={emailError ? "email-error" : undefined}
                    data-testid="input-email"
                  />
                </div>
                {emailError && (
                  <p id="email-error" className="mt-2 text-sm text-red-500" role="alert">
                    {emailError}
                  </p>
                )}
              </div>

              {/* Password Input */}
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <Lock size={20} strokeWidth={1.5} />
                  </div>
                  <input
                    ref={passwordRef}
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (passwordError) validatePassword(e.target.value);
                    }}
                    onBlur={() => password && validatePassword(password)}
                    onKeyDown={handleKeyDown}
                    placeholder="Password"
                    className="w-full pl-12 pr-12 py-3.5 rounded-xl text-gray-900 placeholder-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#0fb06b]/30 gradient-border input-shadow"
                    style={{ 
                      backgroundColor: "#fbefef",
                    }}
                    aria-invalid={!!passwordError}
                    aria-describedby={passwordError ? "password-error" : undefined}
                    data-testid="input-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    data-testid="button-toggle-password"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {passwordError && (
                  <p id="password-error" className="mt-2 text-sm text-red-500" role="alert">
                    {passwordError}
                  </p>
                )}
              </div>

              {/* Remember Me / Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="sr-only"
                      data-testid="checkbox-remember"
                    />
                    <div 
                      className={`w-5 h-5 rounded border-2 transition-all duration-200 flex items-center justify-center ${
                        rememberMe 
                          ? "bg-[#0fb06b] border-[#0fb06b]" 
                          : "border-gray-300 group-hover:border-[#0fb06b]"
                      }`}
                    >
                      {rememberMe && <Check size={14} className="text-white" strokeWidth={3} />}
                    </div>
                  </div>
                  <span className="text-sm text-gray-600">Remember Me</span>
                </label>
                <a 
                  href="#" 
                  className="text-sm text-[#3147ff] hover:text-[#3147ff]/80 transition-colors font-medium"
                  data-testid="link-forgot-password"
                >
                  Forgot Password?
                </a>
              </div>

              {/* Sign In Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl font-semibold text-white transition-all duration-200 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                style={{
                  background: "linear-gradient(135deg, #0fb06b 0%, #3bd18b 100%)",
                  boxShadow: "0 4px 14px rgba(15, 176, 107, 0.35)"
                }}
                data-testid="button-submit"
              >
                {isSubmitting ? "Signing in..." : "Sign In"}
              </button>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-400">or</span>
                </div>
              </div>

              {/* Google Sign In Button */}
              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="w-full py-3.5 px-4 rounded-xl font-medium text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 flex items-center justify-center gap-3"
                data-testid="button-google"
              >
                <img src="/google.svg" alt="Google" className="w-5 h-5" />
                Sign in with Google
              </button>
            </form>

            {/* Create Account Link */}
            <p className="mt-8 text-center text-gray-500">
              New Here?{" "}
              <a 
                href="#" 
                className="text-[#0fb06b] hover:text-[#0fb06b]/80 font-semibold transition-colors"
                data-testid="link-create-account"
              >
                Create an Account
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
