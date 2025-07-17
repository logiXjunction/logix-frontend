import { Link } from 'react-router-dom';
import { Truck, User } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white shadow-xl rounded-2xl p-8 text-center space-y-6">
        <h1 className="text-3xl font-bold text-[#0a2463]">Welcome to LogiXjunction Logistics</h1>
        <p className="text-gray-500">Choose your dashboard to get started</p>

        <div className="space-y-4">
          <Link
            to="/transporter-dashboard"
            className="w-full inline-flex items-center justify-center gap-2 bg-[#3e92cc] hover:bg-blue-400 text-white font-medium py-3 rounded-2xl transition-all shadow-sm"
          >
            <Truck size={20} />
            Transporter Dashboard
          </Link>

          <Link
            to="/client-dashboard"
            className="w-full inline-flex items-center justify-center gap-2 bg-[#d8315b] hover:bg-pink-500 text-white font-medium py-3 rounded-2xl transition-all shadow-sm"
          >
            <User size={20} />
            Client Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
