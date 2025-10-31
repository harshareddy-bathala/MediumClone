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
          <div className="flex flex-col lg:flex-row gap-8 py-8">
            <div className="flex-1 space-y-4">
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
              <div className="space-y-3">
                <h2 className="text-title font-bold text-black font-serif group-hover:text-gray-dark transition-colors line-clamp-3">
                  {title}
                </h2>
                {subtitle && (
                  <p className="text-body text-gray-dark font-serif line-clamp-2">
                    {subtitle}
                  </p>
                )}
                <p className="text-body text-gray-medium font-serif line-clamp-3">
                  {content.substring(0, 200)}...
                </p>
              </div>

              {/* Meta */}
              <div className="flex items-center justify-between pt-4">
                <div className="flex items-center space-x-4">
                  {tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="bg-gray-light text-gray-dark px-3 py-1 rounded-full text-sm font-sans"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-medium font-sans">
                  <span>{displayReadTime}</span>
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Featured Image */}
            {featuredImage && (
              <div className="lg:w-80 h-48 lg:h-32 bg-gray-light rounded overflow-hidden flex-shrink-0">
                <img 
                  src={featuredImage} 
                  alt={title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
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
        <div className="space-y-3 py-6">
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
          <div className="flex justify-between gap-4">
            <div className="flex-1 space-y-2">
              <h3 className="text-title-small font-bold text-black font-serif group-hover:text-gray-dark transition-colors line-clamp-2">
                {title}
              </h3>
              <p className="text-body text-gray-medium font-serif line-clamp-2">
                {content.substring(0, 120)}...
              </p>
            </div>

            {/* Small image */}
            {featuredImage && (
              <div className="w-16 h-16 bg-gray-light rounded overflow-hidden flex-shrink-0">
                <img 
                  src={featuredImage} 
                  alt={title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>

          {/* Meta */}
          <div className="flex items-center justify-between text-sm text-gray-medium font-sans">
            <div className="flex items-center space-x-2">
              <span>{formatDate(publishedDate)}</span>
              <span>·</span>
              <span>{displayReadTime}</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
                <span>{responses}</span>
              </div>
              <button className="p-1 hover:bg-gray-light rounded transition-colors">
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
