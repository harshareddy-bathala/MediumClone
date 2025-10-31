import { Link } from 'react-router-dom'

interface Author {
  name: string
  avatar?: string
  id?: string
}

interface ArticleCardProps {
  id: string
  title: string
  subtitle?: string
  content: string
  author: Author
  publishedDate?: string
  readTime?: string
  featuredImage?: string
  isHero?: boolean
  tags?: string[]
  claps?: number
  responses?: number
  className?: string
}

export const ArticleCard = ({
  id,
  title,
  subtitle,
  content,
  author,
  publishedDate,
  readTime,
  featuredImage,
  isHero = false,
  tags = [],
  claps = 0,
  responses = 0,
  className = ''
}: ArticleCardProps) => {
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Recent'
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: date.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined
    })
  }

  const calculateReadTime = (text: string) => {
    const wordsPerMinute = 200
    const words = text.trim().split(/\s+/).length
    return Math.ceil(words / wordsPerMinute)
  }

  const displayReadTime = readTime || `${calculateReadTime(content)} min read`

  if (isHero) {
    return (
      <article className={`group cursor-pointer ${className}`}>
        <Link to={`/story/${id}`} className="block">
          <div className="flex flex-col lg:flex-row gap-8 py-8 min-w-0">
            <div className="flex-1 space-y-4 min-w-0">
              {/* Author info */}
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-light rounded-full flex items-center justify-center overflow-hidden">
                  {author.avatar ? (
                    <img src={author.avatar} alt={author.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-sm font-medium text-gray-dark">
                      {author.name.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-dark font-sans">
                  <span className="font-medium">{author.name}</span>
                  <span>·</span>
                  <span>{formatDate(publishedDate)}</span>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-serif group-hover:text-gray-700 transition-colors line-clamp-3 leading-tight">
                  {title}
                </h2>
                {subtitle && (
                  <p className="text-xl text-gray-600 font-serif line-clamp-2 leading-relaxed">
                    {subtitle}
                  </p>
                )}
                <p className="text-base text-gray-600 font-serif line-clamp-3 leading-relaxed">
                  {content.substring(0, 200)}...
                </p>
              </div>

              {/* Meta */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center flex-wrap gap-2">
                  {tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full text-sm font-sans font-medium hover:bg-gray-200 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-500 font-sans">
                  <span className="font-medium">{displayReadTime}</span>
                  <button className="text-gray-400 hover:text-gray-700 transition-colors p-2 hover:bg-gray-100 rounded-full" title="Save">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Featured Image */}
            {featuredImage && (
              <div className="lg:w-80 h-56 lg:h-56 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 shadow-sm">
                <img 
                  src={featuredImage} 
                  alt={title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://via.placeholder.com/320x224/E5E7EB/6B7280?text=Image';
                  }}
                />
              </div>
            )}
          </div>
        </Link>
      </article>
    )
  }

  // Regular article card
  return (
    <article className={`group cursor-pointer ${className}`}>
      <Link to={`/story/${id}`} className="block">
        <div className="space-y-3 py-6 min-w-0">
          {/* Author info */}
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 bg-gray-light rounded-full flex items-center justify-center overflow-hidden">
              {author.avatar ? (
                <img src={author.avatar} alt={author.name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-xs font-medium text-gray-dark">
                  {author.name.charAt(0).toUpperCase()}
                </span>
              )}
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-dark font-sans">
              <span className="font-medium">{author.name}</span>
            </div>
          </div>

          {/* Content */}
          <div className="flex justify-between gap-6">
            <div className="flex-1 space-y-2 min-w-0">
              <h3 className="text-xl font-bold text-gray-900 font-serif group-hover:text-gray-700 transition-colors line-clamp-2 leading-tight">
                {title}
              </h3>
              <p className="text-base text-gray-600 font-serif line-clamp-2 leading-relaxed">
                {content.substring(0, 120)}...
              </p>
            </div>

            {/* Small image */}
            {featuredImage && (
              <div className="w-28 h-28 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 shadow-sm">
                <img 
                  src={featuredImage} 
                  alt={title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://via.placeholder.com/112x112/E5E7EB/6B7280?text=Image';
                  }}
                />
              </div>
            )}
          </div>

          {/* Meta */}
          <div className="flex items-center justify-between text-sm text-gray-500 font-sans pt-2">
            <div className="flex items-center space-x-2">
              <span className="font-medium">{formatDate(publishedDate)}</span>
              <span className="text-gray-300">·</span>
              <span>{displayReadTime}</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1.5 text-gray-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
                <span>{responses}</span>
              </div>
              <button className="text-gray-400 hover:text-gray-700 transition-colors p-1.5 hover:bg-gray-100 rounded-full" title="Save">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </Link>
    </article>
  )
}
