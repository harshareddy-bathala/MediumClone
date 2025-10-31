import { Link } from 'react-router-dom'

export const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-white border-t border-gray-200 mt-20">
      <div className="max-w-container mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 font-sans mb-4 uppercase tracking-wide">
              About
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-sm text-gray-600 hover:text-gray-900 transition-colors font-sans">
                  About Medium
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-gray-600 hover:text-gray-900 transition-colors font-sans">
                  Terms
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-sm text-gray-600 hover:text-gray-900 transition-colors font-sans">
                  Privacy
                </Link>
              </li>
              <li>
                <Link to="/help" className="text-sm text-gray-600 hover:text-gray-900 transition-colors font-sans">
                  Help
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 font-sans mb-4 uppercase tracking-wide">
              Resources
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/write" className="text-sm text-gray-600 hover:text-gray-900 transition-colors font-sans">
                  Write
                </Link>
              </li>
              <li>
                <Link to="/partner-program" className="text-sm text-gray-600 hover:text-gray-900 transition-colors font-sans">
                  Partner Program
                </Link>
              </li>
              <li>
                <Link to="/creators" className="text-sm text-gray-600 hover:text-gray-900 transition-colors font-sans">
                  For Creators
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-sm text-gray-600 hover:text-gray-900 transition-colors font-sans">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 font-sans mb-4 uppercase tracking-wide">
              Company
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/careers" className="text-sm text-gray-600 hover:text-gray-900 transition-colors font-sans">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/press" className="text-sm text-gray-600 hover:text-gray-900 transition-colors font-sans">
                  Press
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-gray-600 hover:text-gray-900 transition-colors font-sans">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/brand" className="text-sm text-gray-600 hover:text-gray-900 transition-colors font-sans">
                  Brand Assets
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 font-sans mb-4 uppercase tracking-wide">
              Stay Connected
            </h3>
            <p className="text-sm text-gray-600 font-sans mb-4">
              Get the latest stories in your inbox
            </p>
            <div className="flex space-x-3">
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 transition-colors"
                aria-label="Twitter"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
                </svg>
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
                </svg>
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-3">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="w-8 h-8 bg-gray-900 rounded-sm flex items-center justify-center group-hover:bg-gray-800 transition-colors">
                <span className="text-white text-lg font-serif italic font-bold">M</span>
              </div>
              <span className="text-gray-900 text-xl font-serif font-bold tracking-tight group-hover:text-gray-700 transition-colors">
                Medium
              </span>
            </Link>
            <span className="text-sm text-gray-500 font-sans">
              © {currentYear}
            </span>
          </div>
          
          <div className="flex items-center space-x-6">
            <Link to="/status" className="text-sm text-gray-600 hover:text-gray-900 transition-colors font-sans">
              Status
            </Link>
            <Link to="/accessibility" className="text-sm text-gray-600 hover:text-gray-900 transition-colors font-sans">
              Accessibility
            </Link>
            <Link to="/text-to-speech" className="text-sm text-gray-600 hover:text-gray-900 transition-colors font-sans">
              Text to speech
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
