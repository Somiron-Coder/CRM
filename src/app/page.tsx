import Link from 'next/link';

export default function Home() {
  return (
    <>
      {/* Navigation */}
      <nav className="fixed w-full bg-white/80 backdrop-blur-xl z-50 border-b border-slate-200/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-linear-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-2xl font-bold bg-linear-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">AgencyCRM</span>
            </div>
            <div className="hidden md:flex space-x-12">
              <a href="#features" className="text-slate-600 hover:text-blue-600 font-medium transition">Features</a>
              <a href="#pricing" className="text-slate-600 hover:text-blue-600 font-medium transition">Pricing</a>
              <a href="#contact" className="text-slate-600 hover:text-blue-600 font-medium transition">Contact</a>
            </div>
            <div className="flex space-x-3">
              <Link href="/auth/login" className="px-6 py-2 text-slate-700 hover:bg-slate-100 rounded-lg font-medium transition">
                Login
              </Link>
              <Link href="/auth/signup" className="px-6 py-2 bg-linear-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:shadow-xl font-semibold transition">
                Start Free
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-48 pb-40 bg-linear-to-br from-slate-900 via-slate-800 to-blue-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl -z-10 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-600/20 rounded-full blur-3xl -z-10 animate-pulse" style={{animationDelay: '2s'}}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-block px-5 py-2 bg-blue-500/20 border border-blue-400/60 rounded-full mb-8 backdrop-blur-sm hover:bg-blue-500/30 transition">
              <span className="text-blue-100 text-sm font-semibold">✨ Perfect for Modern Agencies</span>
            </div>
            <h1 className="text-7xl md:text-8xl font-bold mb-8 leading-tight">
              Manage Your <span className="bg-linear-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">Agency</span> Better
            </h1>
            <p className="text-2xl text-blue-100 mb-12 max-w-4xl mx-auto leading-relaxed font-light">
              The all-in-one CRM platform built for agencies. Manage clients, teams, and revenue from a single dashboard. Trusted by 500+ agencies.
            </p>
            <div className="flex justify-center space-x-6 mb-20">
              <Link
                href="/auth/signup"
                className="px-10 py-4 bg-linear-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:shadow-2xl font-bold transition transform hover:scale-105 text-lg"
              >
                Get Started Free
              </Link>
              <button className="px-10 py-4 border-2 border-blue-300 text-blue-200 rounded-lg hover:bg-blue-800/50 hover:border-blue-200 font-bold transition text-lg">
                Watch Demo
              </button>
            </div>
          </div>
          
          {/* Stats */}
          <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 bg-linear-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-12 border border-white/20 shadow-2xl">
            <div className="text-center">
              <div className="text-6xl font-bold bg-linear-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent mb-3">500+</div>
              <p className="text-blue-100 text-lg font-medium">Active Agencies</p>
              <p className="text-blue-200/60 text-sm mt-1">Growing daily</p>
            </div>
            <div className="border-l border-r border-white/20"></div>
            <div className="text-center">
              <div className="text-6xl font-bold bg-linear-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent mb-3">$50M+</div>
              <p className="text-blue-100 text-lg font-medium">Revenue Managed</p>
              <p className="text-blue-200/60 text-sm mt-1">Monthly transactions</p>
            </div>
            <div className="border-l border-r border-white/20"></div>
            <div className="text-center">
              <div className="text-6xl font-bold bg-linear-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent mb-3">99.9%</div>
              <p className="text-blue-100 text-lg font-medium">Uptime SLA</p>
              <p className="text-blue-200/60 text-sm mt-1">Enterprise-grade</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-40 bg-slate-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-6xl font-bold text-slate-950 mb-6">Powerful Features</h2>
            <p className="text-2xl text-slate-600 max-w-2xl mx-auto">Everything you need to run your agency efficiently and profitably</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Client Management */}
            <div className="bg-white p-10 rounded-3xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 border border-slate-100/50">
              <div className="w-20 h-20 bg-linear-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mb-8 shadow-md">
                <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.856-1.488M15 10a3 3 0 11-6 0 3 3 0 016 0zM6 20h12a3 3 0 003-3v-2" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold text-slate-900 mb-4">Client Management</h3>
              <p className="text-slate-600 leading-relaxed text-lg">Track all your clients in one place with complete contact details, company info, and full communication history.</p>
              <ul className="mt-6 space-y-3">
                <li className="flex items-center text-slate-700">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                  Contact tracking
                </li>
                <li className="flex items-center text-slate-700">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                  Deal pipeline
                </li>
                <li className="flex items-center text-slate-700">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                  Activity history
                </li>
              </ul>
            </div>

            {/* Employee Management */}
            <div className="bg-white p-10 rounded-3xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 border border-slate-100/50">
              <div className="w-20 h-20 bg-linear-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center mb-8 shadow-md">
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 8.048M7 14H5a2 2 0 00-2 2v2a2 2 0 002 2h14a2 2 0 002-2v-2a2 2 0 00-2-2h-2" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold text-slate-900 mb-4">Team Management</h3>
              <p className="text-slate-600 leading-relaxed text-lg">Manage your team efficiently with department assignment, salary tracking, and performance monitoring.</p>
              <ul className="mt-6 space-y-3">
                <li className="flex items-center text-slate-700">
                  <span className="w-2 h-2 bg-green-600 rounded-full mr-3"></span>
                  Team profiles
                </li>
                <li className="flex items-center text-slate-700">
                  <span className="w-2 h-2 bg-green-600 rounded-full mr-3"></span>
                  Salary management
                </li>
                <li className="flex items-center text-slate-700">
                  <span className="w-2 h-2 bg-green-600 rounded-full mr-3"></span>
                  Performance tracking
                </li>
              </ul>
            </div>

            {/* Revenue Tracking */}
            <div className="bg-white p-10 rounded-3xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 border border-slate-100/50">
              <div className="w-20 h-20 bg-linear-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center mb-8 shadow-md">
                <svg className="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold text-slate-900 mb-4">Revenue Tracking</h3>
              <p className="text-slate-600 leading-relaxed text-lg">Monitor invoices, payments, and revenue with real-time analytics and detailed financial reports.</p>
              <ul className="mt-6 space-y-3">
                <li className="flex items-center text-slate-700">
                  <span className="w-2 h-2 bg-purple-600 rounded-full mr-3"></span>
                  Invoice management
                </li>
                <li className="flex items-center text-slate-700">
                  <span className="w-2 h-2 bg-purple-600 rounded-full mr-3"></span>
                  Payment tracking
                </li>
                <li className="flex items-center text-slate-700">
                  <span className="w-2 h-2 bg-purple-600 rounded-full mr-3"></span>
                  Financial reports
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-40 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-6xl font-bold text-slate-950 mb-6">Simple, Transparent Pricing</h2>
            <p className="text-2xl text-slate-600">Choose the perfect plan for your agency</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Starter */}
            <div className="bg-slate-50 rounded-3xl p-10 border-2 border-slate-200 hover:shadow-lg transition">
              <h3 className="text-3xl font-bold text-slate-900 mb-3">Starter</h3>
              <p className="text-slate-600 mb-10 text-lg">Perfect for freelancers</p>
              <div className="mb-10">
                <span className="text-6xl font-bold text-slate-900">$29</span>
                <span className="text-slate-600 ml-3 text-xl">/month</span>
              </div>
              <ul className="space-y-4 mb-10">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-4 mt-1 text-xl">✓</span>
                  <span className="text-slate-700 text-lg">Up to 50 clients</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-4 mt-1 text-xl">✓</span>
                  <span className="text-slate-700 text-lg">Up to 5 employees</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-4 mt-1 text-xl">✓</span>
                  <span className="text-slate-700 text-lg">Basic analytics</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-4 mt-1 text-xl">✓</span>
                  <span className="text-slate-700 text-lg">Email support</span>
                </li>
              </ul>
              <button className="w-full px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 font-bold transition text-lg">
                Get Started
              </button>
            </div>

            {/* Pro - Featured */}
            <div className="bg-linear-to-br from-blue-600 to-blue-700 rounded-3xl p-10 text-white shadow-2xl relative transform scale-105 border-2 border-blue-500">
              <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-slate-900 px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                Most Popular
              </div>
              <h3 className="text-3xl font-bold mb-3 mt-3">Professional</h3>
              <p className="text-blue-100 mb-10 text-lg">For growing agencies</p>
              <div className="mb-10">
                <span className="text-6xl font-bold">$99</span>
                <span className="text-blue-100 ml-3 text-xl">/month</span>
              </div>
              <ul className="space-y-4 mb-10">
                <li className="flex items-start">
                  <span className="text-yellow-300 mr-4 mt-1 text-xl">✓</span>
                  <span className="text-blue-50 text-lg">Unlimited clients</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-300 mr-4 mt-1 text-xl">✓</span>
                  <span className="text-blue-50 text-lg">Unlimited employees</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-300 mr-4 mt-1 text-xl">✓</span>
                  <span className="text-blue-50 text-lg">Advanced analytics</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-300 mr-4 mt-1 text-xl">✓</span>
                  <span className="text-blue-50 text-lg">Priority support</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-300 mr-4 mt-1 text-xl">✓</span>
                  <span className="text-blue-50 text-lg">Custom reports</span>
                </li>
              </ul>
              <button className="w-full px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 font-bold transition text-lg">
                Start Free Trial
              </button>
            </div>

            {/* Enterprise */}
            <div className="bg-slate-50 rounded-3xl p-10 border-2 border-slate-200 hover:shadow-lg transition">
              <h3 className="text-3xl font-bold text-slate-900 mb-3">Enterprise</h3>
              <p className="text-slate-600 mb-10 text-lg">For large enterprises</p>
              <div className="mb-10">
                <span className="text-5xl font-bold text-slate-900">Custom</span>
                <span className="text-slate-600 ml-3 block mt-2 text-lg">Let's talk pricing</span>
              </div>
              <ul className="space-y-4 mb-10">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-4 mt-1 text-xl">✓</span>
                  <span className="text-slate-700 text-lg">Everything in Pro</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-4 mt-1 text-xl">✓</span>
                  <span className="text-slate-700 text-lg">Custom integrations</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-4 mt-1 text-xl">✓</span>
                  <span className="text-slate-700 text-lg">Dedicated support</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-4 mt-1 text-xl">✓</span>
                  <span className="text-slate-700 text-lg">SLA guarantee</span>
                </li>
              </ul>
              <button className="w-full px-6 py-3 border-2 border-slate-300 text-slate-700 rounded-lg hover:bg-slate-100 font-bold transition text-lg">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-linear-to-r from-blue-600 to-blue-800 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl -z-10"></div>
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-6xl font-bold mb-8">Ready to Transform Your Agency?</h2>
          <p className="text-2xl mb-12 text-blue-100 font-light">Join hundreds of agencies already using AgencyCRM to streamline their operations and boost productivity.</p>
          <Link
            href="/auth/signup"
            className="inline-block px-12 py-4 bg-white text-blue-600 rounded-lg hover:shadow-2xl font-bold transition transform hover:scale-105 text-lg"
          >
            Start Your Free Trial
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-16 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-linear-to-br from-blue-400 to-blue-600 rounded-lg"></div>
                <span className="text-white font-bold text-lg">AgencyCRM</span>
              </div>
              <p className="text-sm text-slate-500">The complete CRM solution for modern agencies.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#features" className="text-slate-400 hover:text-white transition">Features</a></li>
                <li><a href="#pricing" className="text-slate-400 hover:text-white transition">Pricing</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition">Security</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-slate-400 hover:text-white transition">About</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition">Blog</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-slate-400 hover:text-white transition">Privacy</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition">Terms</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-center text-sm text-slate-500">
            <p>&copy; 2025 AgencyCRM. All rights reserved. | Built with ❤️ for agencies</p>
          </div>
        </div>
      </footer>
    </>
  );
}
