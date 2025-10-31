import { useState } from 'react'
import { Button } from './Button'

interface AuthorInfoProps {
  name: string
  avatar?: string
  bio?: string
  followersCount?: number
  isFollowing?: boolean
  publishDate: string
  readTime?: string
  size?: 'sm' | 'md' | 'lg'
  showFollow?: boolean
  className?: string
}

export const AuthorInfo = ({
  name,
  avatar,
  bio,
  followersCount,
  isFollowing: initialFollowing = false,
  publishDate,
  readTime,
  size = 'md',
  showFollow = true,
  className = ''
}: AuthorInfoProps) => {
  const [isFollowing, setIsFollowing] = useState(initialFollowing)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: date.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined
    })
  }

  const handleFollowToggle = () => {
    setIsFollowing(!isFollowing)
    // Here you would call your API to follow/unfollow
  }

  const sizeClasses = {
    sm: {
      avatar: 'w-8 h-8',
      name: 'text-sm font-medium',
      meta: 'text-xs',
      spacing: 'space-x-2'
    },
    md: {
      avatar: 'w-10 h-10',
      name: 'text-base font-medium',
      meta: 'text-sm',
      spacing: 'space-x-3'
    },
    lg: {
      avatar: 'w-16 h-16',
      name: 'text-lg font-medium',
      meta: 'text-base',
      spacing: 'space-x-4'
    }
  }

  const classes = sizeClasses[size]

  return (
    <div className={`flex items-start ${classes.spacing} ${className}`}>
      {/* Avatar */}
      <div className={`${classes.avatar} bg-gray-light rounded-full flex items-center justify-center overflow-hidden flex-shrink-0`}>
        {avatar ? (
          <img src={avatar} alt={name} className="w-full h-full object-cover" />
        ) : (
          <span className={`font-medium text-gray-dark ${size === 'lg' ? 'text-xl' : size === 'md' ? 'text-base' : 'text-sm'}`}>
            {name.charAt(0).toUpperCase()}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            {/* Author name and follow button */}
            <div className="flex items-center space-x-2 mb-1">
              <h4 className={`${classes.name} text-black font-sans truncate`}>
                {name}
              </h4>
              {showFollow && size !== 'sm' && (
                <Button
                  variant={isFollowing ? 'secondary' : 'green'}
                  size="sm"
                  onClick={handleFollowToggle}
                  className="flex-shrink-0"
                >
                  {isFollowing ? 'Following' : 'Follow'}
                </Button>
              )}
            </div>

            {/* Bio (only for large size) */}
            {bio && size === 'lg' && (
              <p className="text-gray-medium font-sans text-sm mb-2 line-clamp-2">
                {bio}
              </p>
            )}

            {/* Meta information */}
            <div className={`flex items-center space-x-2 ${classes.meta} text-gray-medium font-sans`}>
              <span>{formatDate(publishDate)}</span>
              {readTime && (
                <>
                  <span>·</span>
                  <span>{readTime}</span>
                </>
              )}
              {followersCount && size === 'lg' && (
                <>
                  <span>·</span>
                  <span>{followersCount.toLocaleString()} followers</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
