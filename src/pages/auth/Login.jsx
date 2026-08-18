import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff, Mail, Lock, AlertCircle } from 'lucide-react';
import { useUser } from '../../context/UserContext';
import toast from 'react-hot-toast';
import AuthShell from '../../components/auth/AuthShell';

export default function Login() {
  const { login } = useUser();
  const navigate = useNavigate();
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    console.debug('Login submit:', { email: data.email });
    const result = await login(data.email, data.password);
    if (result.success) {
      toast.success('Welcome back! 🎉');
      if (result.redirect) navigate(result.redirect);
    } else {
      toast.error(result.error);
    }
    setLoading(false);
  };

  const loginAs = async (email, password, label) => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 500));
    console.debug('Quick login attempt:', { email });
    const result = await login(email, password);
    if (result.success) {
      toast.success(`Logged in as ${label}!`);
      if (result.redirect) navigate(result.redirect);
    }
    setLoading(false);
  };

  return (
    <AuthShell
      title="Welcome back!"
      subtitle="Sign in to your account to continue."
      footer={
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Don&apos;t have an account?{' '}
          <Link to="/register" className="text-orange-500 font-semibold hover:text-orange-600">Create one free</Link>
        </p>
      }
    >
      <div className="grid grid-cols-2 gap-3 mb-6">
        <button onClick={() => loginAs('user@savoria.in', 'user123', 'User')}
          className="py-2.5 px-4 rounded-xl border-2 border-orange-200 dark:border-orange-900/50 text-orange-600 dark:text-orange-400 text-sm font-medium hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-colors">
          👤 Demo User
        </button>
        <button onClick={() => loginAs('admin@savoria.in', 'admin123', 'Admin')}
          className="py-2.5 px-4 rounded-xl border-2 border-purple-200 dark:border-purple-900/50 text-purple-600 dark:text-purple-400 text-sm font-medium hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors">
          🛡️ Demo Admin
        </button>
      </div>

      <div className="flex items-center gap-3 mb-6">
        <div className="flex-1 h-px bg-gray-200 dark:bg-gray-800" />
        <span className="text-xs text-gray-400">or sign in manually</span>
        <div className="flex-1 h-px bg-gray-200 dark:bg-gray-800" />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400 w-4 h-4" />
                <input
                  {...register('email', { required: 'Email is required', pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email' } })}
                  type="email"
                  placeholder="you@example.com"
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all ${errors.email ? 'border-red-400' : 'border-gray-200 dark:border-gray-700'}`}
                />
              </div>
              {errors.email && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.email.message}</p>}
            </div>

            <div>
              <div className="flex justify-between mb-1.5">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                <Link to="/forgot-password" className="text-xs text-orange-500 hover:text-orange-600">Forgot password?</Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Min 6 characters' } })}
                  type={showPw ? 'text' : 'password'}
                  placeholder="Enter your password"
                  className={`w-full pl-10 pr-10 py-3 rounded-xl border bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all ${errors.password ? 'border-red-400' : 'border-gray-200 dark:border-gray-700'}`}
                />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-xl hover:from-orange-600 hover:to-red-600 transition-all shadow-lg hover:shadow-orange-500/30 disabled:opacity-70 flex items-center justify-center gap-2"
            >
              {loading ? (
                <><svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>Signing in...</>
              ) : 'Sign In'}
            </button>
          </form>

      <p className="text-center text-xs text-gray-400 mt-8">
        By signing in, you agree to our{' '}
        <span className="underline cursor-pointer">Terms</span> and <span className="underline cursor-pointer">Privacy Policy</span>.
      </p>
    </AuthShell>
  );
}
