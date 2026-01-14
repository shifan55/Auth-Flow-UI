import { useEffect } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { logout, isFirebaseConfigured } from "@/firebase";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const { user, loading } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    // Optional guard: if unauthenticated, send to sign-in
    if (!loading && !user) {
      setLocation("/");
    }
  }, [loading, user, setLocation]);

  const handleLogout = async () => {
    try {
      if (isFirebaseConfigured) {
        await logout();
      }
      toast({ title: "Signed out", description: "You have been logged out." });
      setLocation("/");
    } catch (err) {
      toast({ title: "Logout error", description: err?.message || "Failed to logout" });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500" />
      </div>
    );
  }

  if (!user) {
    // While redirecting
    return null;
  }

  const greeting = (() => {
    const name = user.displayName || user.email || "Farmer";
    const hour = new Date().getHours();
    if (hour < 12) return `Good morning, ${name}`;
    if (hour < 18) return `Good afternoon, ${name}`;
    return `Good evening, ${name}`;
  })();

  const tips = [
    "Rotate crops to improve soil health.",
    "Irrigate early morning to reduce evaporation.",
    "Use mulch to retain soil moisture.",
    "Monitor weather to optimize planting schedules.",
    "Compost organic waste for natural fertilizer.",
  ];
  const tip = tips[Math.floor(Math.random() * tips.length)];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white font-bold">
              CP
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">CropPredict</h1>
              <p className="text-xs text-gray-500">Smart Crop Prediction System</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-600 hidden sm:block">
              {user.email}
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10">
        <div className="bg-white rounded-2xl border shadow-sm p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{greeting}</h2>
          <p className="text-gray-600">Here is a random farming tip for you: {tip}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1,2,3,4,5,6].map((i) => (
            <div key={i} className="bg-white rounded-xl border p-5 hover:shadow transition-shadow">
              <div className="text-sm text-gray-500">Card #{i}</div>
              <div className="mt-2 text-gray-900 font-medium">Random insight {i}</div>
              <p className="mt-2 text-sm text-gray-600">
                Weather, soil, and market signals influence crop outcomes. Use data to plan efficiently.
              </p>
              <button className="mt-4 text-emerald-700 hover:text-emerald-800 text-sm font-medium">
                Learn more →
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
