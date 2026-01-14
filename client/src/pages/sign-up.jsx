import { useState, useRef } from "react";
import { User, Lock, Eye, EyeOff, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import farmIllustration from "@assets/generated_images/3d_farm_scene_illustration.png";
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, isFirebaseConfigured } from '@/firebase';
import { useLocation } from 'wouter';

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agree, setAgree] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [nameError, setNameError] = useState("");
  const [agreeError, setAgreeError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const nameRef = useRef(null);
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const validateEmail = (value) => {
    if (!value.trim()) {
      setEmailError("Email is required");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      setEmailError("Please enter a valid email address");
      return false;
    }
    setEmailError("");
    return true;
  };

  const validatePassword = (value) => {
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

  const validateName = (value) => {
    if (!value.trim()) {
      setNameError("Name is required");
      return false;
    }
    setNameError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isNameValid = validateName(displayName);
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    const isAgreeValid = agree ? true : (setAgreeError("You must accept terms"), false);

    if (!isNameValid) { nameRef.current?.focus(); return; }
    if (!isEmailValid) { emailRef.current?.focus(); return; }
    if (!isPasswordValid) { passwordRef.current?.focus(); return; }
    if (!isAgreeValid) { return; }

    setIsSubmitting(true);
    setAgreeError("");
    try {
      if (!isFirebaseConfigured) {
        toast({
          title: "Firebase not configured",
          description: "Define VITE_FIREBASE_* in client/.env to enable signup.",
        });
        return;
      }
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      if (displayName) {
        await updateProfile(cred.user, { displayName });
      }
      toast({
        title: "Account created",
        description: "Welcome to Smart Crop Prediction System.",
      });
      setLocation("/home");
    } catch (err) {
      let message = "Failed to create account";
      // Firebase Auth error codes
      switch (err?.code) {
        case 'auth/email-already-in-use':
          message = 'Email is already in use';
          break;
        case 'auth/invalid-email':
          message = 'Invalid email address';
          break;
        case 'auth/weak-password':
          message = 'Password should be at least 6 characters';
          break;
        default:
          message = err?.message || message;
      }
      toast({ title: 'Signup error', description: message });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Panel - Branding (same as Sign In) */}
      <div 
        className="hidden lg:flex lg:w-1/2 relative overflow-hidden"
        style={{
          background: "linear-gradient(145deg, #0a8f56 0%, #0fb06b 40%, #3bd18b 100%)"
        }}
      >
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <div className="relative z-10 flex flex-col justify-between px-10 xl:px-14 py-12 w-full h-full">
          <div>
            <div className="flex items-center gap-3 mb-12">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-7 h-7 text-white" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <span className="font-display text-xl font-semibold text-white">CropPredict</span>
            </div>

            <h1 className="font-display text-4xl xl:text-5xl font-bold text-white leading-tight mb-5">
              Create your account
            </h1>
            <p className="text-white/85 text-lg max-w-sm leading-relaxed mb-10">
              Join thousands of farmers improving yields with data-driven insights.
            </p>
          </div>

          <div className="relative mt-8">
            <img 
              src={farmIllustration} 
              alt="Farm illustration with barn and crops"
              className="w-full max-w-xs object-contain mx-auto drop-shadow-2xl"
            />
          </div>
        </div>

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
        <div 
          className="absolute top-0 right-0 bottom-0 w-32 pointer-events-none"
          style={{
            background: "linear-gradient(to right, transparent 0%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.4) 100%)"
          }}
        />
      </div>

      <div 
        className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-24 -translate-x-1/2 pointer-events-none z-10"
        style={{
          background: "linear-gradient(to right, rgba(59, 209, 139, 0.3) 0%, rgba(59, 209, 139, 0.1) 30%, rgba(249, 250, 251, 0.1) 70%, rgba(249, 250, 251, 0.3) 100%)"
        }}
      />

      {/* Right Panel - Sign Up Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 bg-gray-50/50">
        <div className="lg:hidden absolute top-0 left-0 right-0 p-6" style={{ background: "linear-gradient(135deg, #0fb06b 0%, #3bd18b 100%)" }}>
          <h1 className="font-display text-2xl font-bold text-white">Create Account</h1>
        </div>

        <div className="w-full max-w-[440px] mt-20 lg:mt-0">
          <div 
            className="bg-white rounded-2xl p-8 lg:p-10 shadow-xl"
            style={{ 
              border: "1px solid rgba(0,0,0,0.06)",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.08)"
            }}
          >
            <h2 className="font-display text-2xl lg:text-3xl font-bold text-gray-900 mb-8">
              Sign Up
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div>
                <label htmlFor="name" className="sr-only">Name</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <User size={20} strokeWidth={1.5} />
                  </div>
                  <input
                    ref={nameRef}
                    id="name"
                    type="text"
                    value={displayName}
                    onChange={(e) => { setDisplayName(e.target.value); if (nameError) validateName(e.target.value); }}
                    onBlur={() => displayName && validateName(displayName)}
                    placeholder="Full name"
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl text-gray-900 placeholder-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#0fb06b]/30 gradient-border input-shadow"
                    style={{ backgroundColor: "#fbefef" }}
                    aria-invalid={!!nameError}
                    aria-describedby={nameError ? "name-error" : undefined}
                    data-testid="input-name"
                  />
                </div>
                {nameError && (
                  <p id="name-error" className="mt-2 text-sm text-red-500" role="alert">{nameError}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="sr-only">Email</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <User size={20} strokeWidth={1.5} />
                  </div>
                  <input
                    ref={emailRef}
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); if (emailError) validateEmail(e.target.value); }}
                    onBlur={() => email && validateEmail(email)}
                    placeholder="Email"
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl text-gray-900 placeholder-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#0fb06b]/30 gradient-border input-shadow"
                    style={{ backgroundColor: "#fbefef" }}
                    aria-invalid={!!emailError}
                    aria-describedby={emailError ? "email-error" : undefined}
                    data-testid="input-email"
                  />
                </div>
                {emailError && (
                  <p id="email-error" className="mt-2 text-sm text-red-500" role="alert">{emailError}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="sr-only">Password</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <Lock size={20} strokeWidth={1.5} />
                  </div>
                  <input
                    ref={passwordRef}
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); if (passwordError) validatePassword(e.target.value); }}
                    onBlur={() => password && validatePassword(password)}
                    onKeyDown={handleKeyDown}
                    placeholder="Password"
                    className="w-full pl-12 pr-12 py-3.5 rounded-xl text-gray-900 placeholder-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#0fb06b]/30 gradient-border input-shadow"
                    style={{ backgroundColor: "#fbefef" }}
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
                  <p id="password-error" className="mt-2 text-sm text-red-500" role="alert">{passwordError}</p>
                )}
              </div>

              {/* Terms */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={agree}
                      onChange={(e) => setAgree(e.target.checked)}
                      className="sr-only"
                      data-testid="checkbox-terms"
                    />
                    <div 
                      className={`w-5 h-5 rounded border-2 transition-all duration-200 flex items-center justify-center ${
                        agree 
                          ? "bg-[#0fb06b] border-[#0fb06b]" 
                          : "border-gray-300 group-hover:border-[#0fb06b]"
                      }`}
                    >
                      {agree && <Check size={14} className="text-white" strokeWidth={3} />}
                    </div>
                  </div>
                  <span className="text-sm text-gray-600">I agree to the Terms</span>
                </label>
              </div>
              {agreeError && (
                <p className="-mt-3 text-sm text-red-500" role="alert">{agreeError}</p>
              )}

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
                {isSubmitting ? "Creating account..." : "Create Account"}
              </button>
            </form>

            <p className="mt-8 text-center text-gray-500">
              Already have an account?{" "}
              <a href="/" className="text-[#0fb06b] hover:text-[#0fb06b]/80 font-semibold transition-colors" data-testid="link-signin">
                Sign In
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
