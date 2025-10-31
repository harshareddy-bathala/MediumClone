import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

interface HeaderProps {
  isAuthenticated?: boolean
  user?: {
    name: string
    avatar?: string
  }
}

export const Header = ({ isAuthenticated = false, user }: HeaderProps) => {
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const navigate = useNavigate()

  const handleSignOut = () => {
    localStorage.removeItem('token')
    navigate('/signin')
    setShowUserMenu(false)
  }

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm backdrop-blur-sm bg-white/95">
      <div className="max-w-container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-gray-900 rounded-sm flex items-center justify-center group-hover:bg-gray-800 transition-colors">
              <span className="text-white text-2xl font-serif italic font-bold">M</span>
            </div>
            <span className="text-gray-900 text-3xl font-serif font-bold tracking-tight group-hover:text-gray-700 transition-colors hidden sm:block">
              Medium
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {!isAuthenticated ? (
              <>
                <Link to="/write" className="text-gray-600 hover:text-gray-900 px-3 py-2 font-sans text-sm font-medium transition-colors">
                  Write
                </Link>
                <Link to="/signin" className="text-gray-600 hover:text-gray-900 px-3 py-2 font-sans text-sm font-medium transition-colors">
                  Sign in
                </Link>
                <Link to="/signup" className="bg-gray-900 text-white px-5 py-2 rounded-full text-sm font-sans font-medium hover:bg-gray-800 transition-colors shadow-sm hover:shadow-md">
                  Get started
                </Link>
              </>
            ) : (
              <>
                <Link to="/write" className="btn-ghost flex items-center">
                  <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                  Write
                </Link>
                
                {/* Notifications */}
                <button className="btn-ghost relative">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-3.5-3.5L15 17zm-3-10V7a4 4 0 118 0v3.5l1.5 1.5v5h-11v-5L11 10.5z" />
                  </svg>
                  <span className="absolute -top-1 -right-1 bg-green w-2 h-2 rounded-full"></span>
                </button>

                {/* User Menu */}
                <div className="relative">
                  <button 
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-2 hover:bg-gray-light rounded-full p-1 transition-colors"
                  >
                    <div className="w-8 h-8 bg-green rounded-full flex items-center justify-center text-white text-sm font-medium">
                      {user?.avatar ? (
                        <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full" />
                      ) : (
                        user?.name?.charAt(0).toUpperCase() || 'U'
                      )}
                    </div>
                  </button>

                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-border rounded-lg shadow-medium-lg py-2">
                      <div className="px-4 py-2 border-b border-gray-border">
                        <p className="font-medium text-black">{user?.name || 'User'}</p>
                        <p className="text-sm text-gray-medium">@{user?.name?.toLowerCase().replace(' ', '') || 'user'}</p>
                      </div>
                      
                      <Link to="/me/stories" className="flex items-center px-4 py-2 text-gray-dark hover:bg-gray-light transition-colors">
                        <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Stories
                      </Link>
                      
                      <Link to="/me/stats" className="flex items-center px-4 py-2 text-gray-dark hover:bg-gray-light transition-colors">
                        <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        Stats
                      </Link>
                      
                      <Link to="/me/settings" className="flex items-center px-4 py-2 text-gray-dark hover:bg-gray-light transition-colors">
                        <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Settings
                      </Link>
                      
                      <hr className="my-2 border-gray-border" />
                      
                      <button 
                        onClick={handleSignOut}
                        className="w-full text-left flex items-center px-4 py-2 text-gray-dark hover:bg-gray-light transition-colors"
                      >
                        <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Sign out
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {showMobileMenu ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="md:hidden py-4 border-t border-gray-border">
            {!isAuthenticated ? (
              <div className="space-y-4">
                <Link to="/write" className="block py-2 text-gray-dark hover:text-black">
                  Write
                </Link>
                <Link to="/signin" className="block py-2 text-gray-dark hover:text-black">
                  Sign in
                </Link>
                <Link to="/signup" className="block w-full text-center btn-primary">
                  Get started
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                <Link to="/write" className="block py-2 text-gray-dark hover:text-black">
                  Write
                </Link>
                <Link to="/me/stories" className="block py-2 text-gray-dark hover:text-black">
                  Stories
                </Link>
                <Link to="/me/stats" className="block py-2 text-gray-dark hover:text-black">
                  Stats
                </Link>
                <Link to="/me/settings" className="block py-2 text-gray-dark hover:text-black">
                  Settings
                </Link>
                <button 
                  onClick={handleSignOut}
                  className="block w-full text-left py-2 text-gray-dark hover:text-black"
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  )
}
