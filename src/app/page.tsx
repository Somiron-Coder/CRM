import Link from 'next/link';

export default function Home() {
  return (
    <>
      {/* Navigation */}
      <nav className="fixed w-full bg-white shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold text-blue-600">AgencyCRM</div>
            <div className="hidden md:flex space-x-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900">Features</a>
              <a href="#pricing" className="text-gray-600 hover:text-gray-900">Pricing</a>
              <a href="#contact" className="text-gray-600 hover:text-gray-900">Contact</a>
            </div>
            <div className="flex space-x-4">
              <Link href="/auth/login" className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded">
                Login
              </Link>
              <Link href="/auth/signup" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Manage Your Agency Like a Pro
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              All-in-one CRM platform to manage clients, employees, and track revenue. Streamline your agency operations with our powerful tools.
            </p>
            <div className="flex justify-center space-x-4">
              <Link
                href="/auth/signup"
                className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
              >
                Get Started Free
              </Link>
              <button className="px-8 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 font-semibold">
                Watch Demo
              </button>
            </div>
          </div>
          <div className="mt-16 bg-white rounded-lg shadow-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
                <p className="text-gray-600">Active Users</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">$2M+</div>
                <p className="text-gray-600">Revenue Managed</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">98%</div>
                <p className="text-gray-600">Satisfaction Rate</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">Powerful Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Client Management */}
            <div className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.856-1.488M15 10a3 3 0 11-6 0 3 3 0 016 0zM6 20h12a3 3 0 003-3v-2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Client Management</h3>
              <p className="text-gray-600">Track all your clients in one place with complete contact details, company info, and communication history.</p>
            </div>

            {/* Employee Management */}
            <div className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 8.048M7 14H5a2 2 0 00-2 2v2a2 2 0 002 2h14a2 2 0 002-2v-2a2 2 0 00-2-2h-2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Employee Management</h3>
              <p className="text-gray-600">Manage your team efficiently with department assignment, salary tracking, and performance monitoring.</p>
            </div>

            {/* Revenue Tracking */}
            <div className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Revenue Tracking</h3>
              <p className="text-gray-600">Monitor invoices, payments, and revenue with real-time analytics and detailed financial reports.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">Simple Pricing</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Starter */}
            <div className="bg-white rounded-lg p-8 border border-gray-200">
              <h3 className="text-2xl font-bold mb-2">Starter</h3>
              <p className="text-gray-600 mb-6">Perfect for freelancers</p>
              <div className="text-4xl font-bold mb-6">$29<span className="text-lg text-gray-600">/month</span></div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Up to 50 clients</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Up to 5 employees</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Basic analytics</span>
                </li>
              </ul>
              <button className="w-full px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50">
                Get Started
              </button>
            </div>

            {/* Pro */}
            <div className="bg-white rounded-lg p-8 border-2 border-blue-600 relative">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                Most Popular
              </div>
              <h3 className="text-2xl font-bold mb-2">Professional</h3>
              <p className="text-gray-600 mb-6">For growing agencies</p>
              <div className="text-4xl font-bold mb-6">$99<span className="text-lg text-gray-600">/month</span></div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Unlimited clients</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Unlimited employees</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Advanced analytics</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Priority support</span>
                </li>
              </ul>
              <button className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Get Started
              </button>
            </div>

            {/* Enterprise */}
            <div className="bg-white rounded-lg p-8 border border-gray-200">
              <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
              <p className="text-gray-600 mb-6">For large enterprises</p>
              <div className="text-4xl font-bold mb-6">Custom<span className="text-lg text-gray-600">/month</span></div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Everything in Pro</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Custom integrations</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Dedicated support</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>SLA guarantee</span>
                </li>
              </ul>
              <button className="w-full px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Agency?</h2>
          <p className="text-xl mb-8 opacity-90">Join hundreds of agencies already using AgencyCRM to streamline their operations.</p>
          <Link
            href="/auth/signup"
            className="inline-block px-8 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-100 font-semibold"
          >
            Start Free Trial
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="text-white font-bold text-lg mb-4">AgencyCRM</div>
              <p className="text-sm">The complete CRM solution for modern agencies.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#features" className="hover:text-white">Features</a></li>
                <li><a href="#pricing" className="hover:text-white">Pricing</a></li>
                <li><a href="#" className="hover:text-white">Security</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Privacy</a></li>
                <li><a href="#" className="hover:text-white">Terms</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>&copy; 2025 AgencyCRM. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
