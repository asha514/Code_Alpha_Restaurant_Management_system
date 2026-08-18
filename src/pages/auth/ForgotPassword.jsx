import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, Send, Check } from 'lucide-react';
import toast from 'react-hot-toast';
import AuthShell from '../../components/auth/AuthShell';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    setSent(true);
    toast.success('Reset link sent! Check your email.');
    setLoading(false);
  };

  return (
    <AuthShell
      title={sent ? 'Check Your Email' : 'Forgot Password?'}
      subtitle={sent ? `We sent a reset link to ${email}. Check your inbox.` : "No worries, we'll send you reset instructions."}
      footer={
        <Link to="/login" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-orange-500 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Sign In
        </Link>
      }
    >
      <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center mx-auto mb-4 shadow-lg">
            {sent ? <Check className="w-8 h-8 text-white" /> : <Mail className="w-8 h-8 text-white" />}
          </div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-2">
            {sent ? 'Check Your Email' : 'Forgot Password?'}
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            {sent ? `We sent a reset link to ${email}. Check your inbox.` : "No worries, we'll send you reset instructions."}
          </p>
        </div>

      <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-800">
        {!sent ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>
            <button type="submit" disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-xl hover:from-orange-600 hover:to-red-600 transition-all shadow-lg disabled:opacity-70">
              {loading ? (<svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>) : <Send className="w-4 h-4" />}
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>
          </form>
        ) : (
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto">
              <Check className="w-8 h-8 text-green-500" />
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm">Didn't receive the email? Check your spam folder or try again.</p>
            <button onClick={() => { setSent(false); setEmail(''); }} className="text-orange-500 font-medium text-sm hover:text-orange-600">
              Try a different email
            </button>
          </div>
        )}
      </div>
    </AuthShell>
  );
}
