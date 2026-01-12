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
          background: "linear-gradient(135deg, #0fb06b 0%, #3bd18b 100%)"
        }}
      >
        <div className="relative z-10 flex flex-col justify-center px-12 xl:px-16 py-12 w-full">
          <h1 className="font-display text-4xl xl:text-5xl font-bold text-white leading-tight mb-4">
            Smart Crop<br />Prediction System
          </h1>
          <p className="text-white/90 text-lg xl:text-xl max-w-md leading-relaxed">
            Empowering Sri Lankan farmers with data-driven agricultural predictions.
          </p>
        </div>
        
        {/* Farm Illustration */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-center">
          <img 
            src={farmIllustration} 
            alt="Farm illustration with barn and crops"
            className="w-full max-w-lg object-contain"
          />
        </div>
        
        {/* Decorative gradient overlay */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 50%)"
          }}
        />
      </div>

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
