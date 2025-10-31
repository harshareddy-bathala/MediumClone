import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import { Button, LoadingSpinner, AuthorInfo, Footer } from '../components'

const BACKEND_URL = "http://localhost:8787" // Update this to your backend URL

interface Blog {
    id: string
    title: string
    content: string
    subtitle?: string
    publishedDate: string
    author: {
        name: string
        avatar?: string
        bio?: string
        followersCount?: number
    }
    readTime: number
    claps: number
    isUserClapped: boolean
    tags: string[]
    comments: Comment[]
}

interface Comment {
    id: string
    content: string
    author: {
        name: string
        avatar?: string
    }
    publishedDate: string
    claps: number
}

export const BlogPost = () => {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const [blog, setBlog] = useState<Blog | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [isFollowing, setIsFollowing] = useState(false)
    const [showComments, setShowComments] = useState(false)
    const [newComment, setNewComment] = useState('')
    const [submittingComment, setSubmittingComment] = useState(false)

    useEffect(() => {
        fetchBlog()
    }, [id])

    const fetchBlog = async () => {
        try {
            setLoading(true)
            const token = localStorage.getItem('token')
            const response = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
                headers: token ? { Authorization: `Bearer ${token}` } : {}
            })
            setBlog(response.data.blog)
        } catch (error) {
            console.error('Error fetching blog:', error)
            setError('Failed to load the blog post')
        } finally {
            setLoading(false)
        }
    }

    const handleClap = async () => {
        if (!blog) return
        
        try {
            const token = localStorage.getItem('token')
            if (!token) {
                navigate('/signin')
                return
            }

            await axios.post(`${BACKEND_URL}/api/v1/blog/${id}/clap`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            })

            setBlog(prev => prev ? {
                ...prev,
                claps: prev.isUserClapped ? prev.claps - 1 : prev.claps + 1,
                isUserClapped: !prev.isUserClapped
            } : null)
        } catch (error) {
            console.error('Error clapping:', error)
        }
    }

    const handleFollow = async () => {
        try {
            const token = localStorage.getItem('token')
            if (!token) {
                navigate('/signin')
                return
            }

            // API call to follow/unfollow author
            setIsFollowing(!isFollowing)
        } catch (error) {
            console.error('Error following:', error)
        }
    }

    const handleSubmitComment = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!newComment.trim() || !blog) return

        setSubmittingComment(true)
        try {
            const token = localStorage.getItem('token')
            if (!token) {
                navigate('/signin')
                return
            }

            // API call to submit comment
            await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
            
            // Add comment to local state
            const comment: Comment = {
                id: Date.now().toString(),
                content: newComment,
                author: {
                    name: 'Current User', // Replace with actual user data
                    avatar: undefined
                },
                publishedDate: new Date().toISOString(),
                claps: 0
            }

            setBlog(prev => prev ? {
                ...prev,
                comments: [...prev.comments, comment]
            } : null)
            
            setNewComment('')
        } catch (error) {
            console.error('Error submitting comment:', error)
        } finally {
            setSubmittingComment(false)
        }
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <LoadingSpinner size="lg" />
            </div>
        )
    }

    if (error || !blog) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-title-large font-serif text-black mb-4">
                        Post not found
                    </h1>
                    <p className="text-body text-gray-medium font-sans mb-6">
                        The blog post you're looking for doesn't exist or has been removed.
                    </p>
                    <Button onClick={() => navigate('/')}>
                        Go back home
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Navigation */}
            <nav className="sticky top-0 bg-white border-b border-gray-border z-10">
                <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link to="/" className="text-black hover:text-gray-dark transition-colors">
                        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M13.54 12c0-.656-.126-1.283-.35-1.887l-.003-.014-.006-.017-.01-.02-.017-.033-.025-.04-.035-.047-.045-.05-.056-.054-.066-.055-.077-.055-.088-.051-.1-.047-.112-.041-.123-.036-.135-.03-.147-.022-.158-.015-.169-.007-.179.002-.189.012-.199.023-.207.035-.215.046-.222.058-.228.07-.233.082-.237.093-.241.105-.243.117-.245.128-.245.14-.245.151-.243.162-.24.173-.236.183-.231.194-.225.204-.218.214-.21.223-.201.233-.191.242-.18.251-.167.26-.154.268-.139.275-.124.283-.108.289-.091.296-.073.301-.054.307-.035.311-.014.316.007.32.029.323.05.326.072.328.094.33.116.33.138.33.16.329.183.327.205.324.227.32.249.316.271.31.293.304.314.297.336.288.357.279.378.269.398.258.419.245.438.232.458.217.477.202.495.185.513.168.53.149.546.13.562.11.577.088.591.066.604.042.616.018.627-.007.637-.032.646-.058.654-.083.66-.109.666-.135.67-.161.673-.187.675-.214.675-.24.674-.267.671-.294.667-.32.661-.347.654-.373.645-.4.635-.426.623-.452.609-.478.594-.503.577-.528.558-.552.538-.576.516-.599.492-.622.467-.644.44-.665.411-.686.381-.706.349-.725.315-.743.28-.761.243-.777.204-.793.163-.808.121-.822.077-.835.031-.848-.015-.859-.062-.87-.109-.88-.157-.888-.205-.896-.254-.902-.303-.907-.352-.911-.402-.913-.452-.914-.502-.913-.552-.91-.602-.906-.652-.9-.701-.892-.75-.883-.798-.871-.845-.858-.892-.843-.938-.826-.983-.807-1.026-.787-1.069-.765-1.11-.741-1.15-.716-1.189-.689-1.227-.66-1.263-.629-1.298-.597-1.331-.563-1.363-.527-1.394-.49-1.423-.451-1.451-.41-1.477-.368-1.502-.324-1.525-.279-1.547-.232-1.567-.184-1.585-.135-1.602-.084-1.617-.033-1.63.02-1.642.073-1.652.127-1.66.182-1.667.237-1.672.292-1.675.348-1.677.404-1.677.46-1.675.516-1.671.572-1.666.628-1.658.684-1.649.739-1.638.794-1.625.848-1.61.901-1.594.954-1.575 1.006-1.555 1.057-1.533 1.107-1.509 1.156-1.483 1.204-1.455 1.251-1.425 1.297-1.394 1.341-1.361 1.385-1.326 1.427-1.289 1.468-1.251 1.507-1.211 1.545-1.169 1.581-1.126 1.616-1.081 1.649-1.034 1.681-.986 1.711-.937 1.74-.886 1.767-.833 1.792-.779 1.816-.724 1.838-.667 1.858-.609 1.876-.55 1.893-.489 1.908-.427 1.921-.364 1.933-.299 1.943-.233 1.951-.166 1.958-.098 1.963-.029 1.967.04 1.969.11 1.969.18 1.968.25 1.965.32 1.96.39 1.954.46 1.946.53 1.936.599 1.925.668 1.912.736 1.897.804 1.881.871 1.863.937 1.843 1.002 1.822 1.066 1.799 1.129 1.774 1.191 1.747 1.252 1.719 1.311 1.689 1.369 1.657 1.426 1.624 1.481 1.589 1.535 1.552 1.587 1.514 1.638 1.474 1.687 1.433 1.735 1.39 1.781 1.346 1.825 1.3 1.867 1.253 1.908 1.204 1.947 1.154 1.984 1.102 2.019 1.049 2.052 .994 2.084 .938 2.114 .881 2.142 .822 2.168 .762 2.192 .701 2.214 .639 2.234 .575 2.252 .51 2.268 .444 2.282 .377 2.294 .309 2.304 .24 2.312 .17 2.318 .099 2.322 .027 2.324-.046 2.324-.119 2.322-.192 2.318-.265 2.312-.338 2.304-.411 2.294-.484 2.282-.556 2.268-.628 2.252-.699 2.234-.769 2.214-.839 2.192-.907 2.168-.975 2.142-1.041 2.114-1.106 2.084-1.17 2.052-1.233 2.019-1.294 1.984-1.354 1.947-1.412 1.908-1.469 1.867-1.524 1.825-1.577 1.781-1.629 1.735-1.679 1.687-1.727 1.638-1.773 1.587-1.817 1.535-1.859 1.481-1.899 1.426-1.937 1.369-1.973 1.311-2.007 1.252-2.039 1.191-2.069 1.129-2.097 1.066-2.123 1.002-2.147 .937-2.169 .871-2.189 .804-2.207 .736-2.222 .668-2.236 .599-2.248 .53-2.258 .46-2.266 .39-2.272 .32-2.276 .25-2.278 .18-2.279 .11-2.278 .04-2.275-.029-2.271-.098-2.265-.166-2.257-.233-2.247-.299-2.236-.364-2.223-.427-2.208-.489-2.192-.55-2.174-.609-2.154-.667-2.133-.724-2.11-.779-2.085-.833-2.059-.886-2.031-.937-2.001-.986-1.97-1.034-1.937-1.081-1.902-1.126-1.866-1.169-1.828-1.211-1.789-1.251-1.748-1.289-1.705-1.326-1.661-1.361-1.615-1.394-1.568-1.425-1.519-1.455-1.469-1.483-1.417-1.509-1.364-1.533-1.309-1.555-1.253-1.575-1.196-1.594-1.137-1.61-1.077-1.625-1.016-1.638-.953-1.649-.889-1.658-.824-1.666-.758-1.671-.691-1.675-.623-1.677-.554-1.677-.484-1.675-.413-1.672-.341-1.667-.268-1.66-.194-1.652-.119-1.642-.043-1.63.034-1.617.112-1.602.19-1.585.269-1.567.348-1.547.427-1.525.507-1.502.587-1.477.667-1.451.747-1.423.827-1.394.907-1.363.987-1.331 1.067-1.298 1.147-1.263 1.227-1.227 1.307-1.189 1.387-1.15 1.467-1.11 1.547-1.069 1.627-1.026 1.707-.983 1.787-.938 1.867-.892 1.947-.845 2.027-.796 2.107-.746 2.187-.695 2.267-.643 2.347-.59 2.427-.536 2.507-.481 2.587-.425 2.667-.368 2.747-.31 2.827-.251 2.907-.191 2.987-.13 3.067-.068 3.147-.005 3.227.059 3.307.123 3.387.188 3.467.254 3.547.321 3.627.388 3.707.456 3.787.525 3.867.595 3.947.665 4.027.736 4.107.808 4.187.881 4.267.955 4.347 1.03 4.427 1.106 4.507 1.183 4.587 1.261 4.667 1.34 4.747 1.42 4.827 1.501 4.907 1.583 4.987 1.666 5.067 1.75 5.147 1.835 5.227 1.921 5.307 2.008 5.387 2.096 5.467 2.185 5.547 2.275 5.627 2.366 5.707 2.458 5.787 2.551 5.867 2.645 5.947 2.74 6.027 2.836 6.107 2.933 6.187 3.031 6.267 3.13 6.347 3.23 6.427 3.331 6.507 3.433 6.587 3.536 6.667 3.64 6.747 3.745 6.827 3.851 6.907 3.958 6.987 4.066 7.067 4.175 7.147 4.285 7.227 4.396 7.307 4.508 7.387 4.621 7.467 4.735 7.547 4.85 7.627 4.966 7.707 5.083 7.787 5.201 7.867 5.32 7.947 5.44 8.027 5.561 8.107 5.683 8.187 5.806 8.267 5.93 8.347 6.055 8.427 6.181 8.507 6.308 8.587 6.436 8.667 6.565 8.747 6.695 8.827 6.826 8.907 6.958 8.987 7.091 9.067 7.225 9.147 7.36 9.227 7.496 9.307 7.633 9.387 7.771 9.467 7.91 9.547 8.05 9.627 8.191 9.707 8.333 9.787 8.476 9.867 8.62 9.947 8.765 10.027 8.911 10.107 9.058 10.187 9.206 10.267 9.355 10.347 9.505 10.427 9.656 10.507 9.808 10.587 9.961 10.667 10.115 10.747 10.27 10.827 10.426 10.907 10.583 10.987 10.741 11.067 10.9 11.147 11.06 11.227 11.221 11.307 11.383 11.387 11.546 11.467 11.71 11.547 11.875 11.627 12.041 11.707 12.208 11.787 12.376 11.867 12.545 11.947 12.715 12.027 12.886 12.107 13.058 12.187 13.231 12.267 13.405 12.347 13.58 12.427 13.756 12.507 13.933 12.587 14.111 12.667 14.29 12.747 14.47 12.827 14.651 12.907 14.833 12.987 15.016 13.067 15.2 13.147 15.385 13.227 15.571 13.307 15.758 13.387 15.946 13.467 16.135 13.547"/>
                        </svg>
                    </Link>

                    <div className="flex items-center space-x-6">
                        <Button
                            variant="secondary"
                            size="sm"
                            onClick={handleClap}
                            className={blog.isUserClapped ? 'bg-green text-white' : ''}
                        >
                            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M14.828 3.879a2.5 2.5 0 0 1 3.536 0l1.414 1.414a2.5 2.5 0 0 1 0 3.536L8.464 20.142a2.5 2.5 0 0 1-1.768.732H3.5a.5.5 0 0 1-.5-.5v-3.196a2.5 2.5 0 0 1 .732-1.768L14.828 3.879z"/>
                            </svg>
                            {blog.claps}
                        </Button>

                        <Button variant="secondary" size="sm">
                            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                            </svg>
                            Share
                        </Button>

                        <Button variant="secondary" size="sm">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                            </svg>
                        </Button>
                    </div>
                </div>
            </nav>

            {/* Article */}
            <article className="max-w-3xl mx-auto px-6 py-12">
                {/* Header */}
                <header className="mb-12">
                    <h1 className="text-5xl md:text-6xl font-serif text-gray-900 leading-tight mb-8 font-bold">
                        {blog.title}
                    </h1>
                    
                    {blog.subtitle && (
                        <h2 className="text-2xl md:text-3xl font-serif text-gray-600 leading-relaxed mb-8">
                            {blog.subtitle}
                        </h2>
                    )}

                    <div className="flex items-center justify-between mb-8">
                        <AuthorInfo
                            name={blog.author.name}
                            avatar={blog.author.avatar}
                            bio={blog.author.bio}
                            followersCount={blog.author.followersCount}
                            publishDate={blog.publishedDate}
                            readTime={`${blog.readTime} min read`}
                            size="lg"
                        />
                        
                        <Button
                            variant={isFollowing ? "secondary" : "primary"}
                            size="sm"
                            onClick={handleFollow}
                        >
                            {isFollowing ? 'Following' : 'Follow'}
                        </Button>
                    </div>

                    {/* Engagement bar */}
                    <div className="flex items-center justify-between py-5 border-y border-gray-200 bg-gray-50 px-6 -mx-6 rounded-lg">
                        <div className="flex items-center space-x-8">
                            <button
                                onClick={handleClap}
                                className={`flex items-center space-x-2 transition-all hover:scale-105 ${
                                    blog.isUserClapped 
                                        ? 'text-green-600' 
                                        : 'text-gray-500 hover:text-gray-900'
                                }`}
                            >
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M14.828 3.879a2.5 2.5 0 0 1 3.536 0l1.414 1.414a2.5 2.5 0 0 1 0 3.536L8.464 20.142a2.5 2.5 0 0 1-1.768.732H3.5a.5.5 0 0 1-.5-.5v-3.196a2.5 2.5 0 0 1 .732-1.768L14.828 3.879z"/>
                                </svg>
                                <span className="text-sm font-sans font-medium">{blog.claps}</span>
                            </button>

                            <button
                                onClick={() => setShowComments(!showComments)}
                                className="flex items-center space-x-2 text-gray-500 hover:text-gray-900 transition-all hover:scale-105"
                            >
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                                <span className="text-sm font-sans font-medium">{blog.comments.length}</span>
                            </button>
                        </div>

                        <div className="flex items-center space-x-4">
                            <button className="text-gray-500 hover:text-gray-900 transition-all hover:scale-110 p-2 hover:bg-gray-200 rounded-full" title="Share">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                                </svg>
                            </button>
                            
                            <button className="text-gray-500 hover:text-gray-900 transition-all hover:scale-110 p-2 hover:bg-gray-200 rounded-full" title="Save">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </header>

                {/* Content */}
                <div className="article-content prose prose-lg max-w-none">
                    {blog.content.split('\n').map((paragraph, index) => (
                        <p key={index} className="text-xl font-serif text-gray-800 leading-relaxed mb-8">
                            {paragraph}
                        </p>
                    ))}
                </div>

                {/* Tags */}
                {blog.tags.length > 0 && (
                    <div className="mt-16 pt-8 border-t border-gray-200">
                        <div className="flex flex-wrap gap-3">
                            {blog.tags.map((tag, index) => (
                                <span
                                    key={index}
                                    className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-sans font-medium rounded-full hover:bg-gray-200 transition-colors cursor-pointer border border-gray-200"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Author bio */}
                <div className="mt-16 pt-10 border-t border-gray-200">
                    <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-xl border border-gray-200 shadow-sm">
                        <div className="flex items-start space-x-5">
                            <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white font-serif text-3xl font-bold shadow-md flex-shrink-0">
                                {blog.author.name.charAt(0)}
                            </div>
                            
                            <div className="flex-1">
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className="text-2xl font-serif text-gray-900 font-bold">
                                        {blog.author.name}
                                    </h3>
                                    <Button
                                        variant={isFollowing ? "secondary" : "primary"}
                                        size="sm"
                                        onClick={handleFollow}
                                    >
                                        {isFollowing ? 'Following' : 'Follow'}
                                    </Button>
                                </div>
                                
                                {blog.author.bio && (
                                    <p className="text-base text-gray-600 font-sans leading-relaxed mb-3">
                                        {blog.author.bio}
                                    </p>
                                )}
                                
                                {blog.author.followersCount && (
                                    <p className="text-sm text-gray-500 font-sans font-medium">
                                        {blog.author.followersCount.toLocaleString()} followers
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Comments Section */}
                {showComments && (
                    <div className="mt-16 pt-8 border-t border-gray-border">
                        <h3 className="text-title-medium font-serif text-black mb-8">
                            Comments ({blog.comments.length})
                        </h3>

                        {/* Comment Form */}
                        <form onSubmit={handleSubmitComment} className="mb-8">
                            <textarea
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                placeholder="What are your thoughts?"
                                className="w-full p-4 border border-gray-border rounded-lg focus:outline-none focus:ring-2 focus:ring-green focus:border-transparent resize-none"
                                rows={4}
                            />
                            <div className="flex justify-end mt-4">
                                <Button
                                    type="submit"
                                    variant="primary"
                                    loading={submittingComment}
                                    disabled={!newComment.trim()}
                                >
                                    Comment
                                </Button>
                            </div>
                        </form>

                        {/* Comments List */}
                        <div className="space-y-6">
                            {blog.comments.map((comment) => (
                                <div key={comment.id} className="border-b border-gray-border pb-6">
                                    <div className="flex items-start space-x-3">
                                        <div className="w-10 h-10 bg-gradient-to-br from-gray-light to-gray-border rounded-full flex items-center justify-center text-gray-dark font-sans text-body-small">
                                            {comment.author.name.charAt(0)}
                                        </div>
                                        
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-2 mb-2">
                                                <h4 className="text-body font-sans font-medium text-black">
                                                    {comment.author.name}
                                                </h4>
                                                <span className="text-body-small text-gray-medium font-sans">
                                                    {formatDate(comment.publishedDate)}
                                                </span>
                                            </div>
                                            
                                            <p className="text-body text-gray-dark font-sans mb-3">
                                                {comment.content}
                                            </p>
                                            
                                            <button className="flex items-center space-x-1 text-gray-medium hover:text-black transition-colors">
                                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M14.828 3.879a2.5 2.5 0 0 1 3.536 0l1.414 1.414a2.5 2.5 0 0 1 0 3.536L8.464 20.142a2.5 2.5 0 0 1-1.768.732H3.5a.5.5 0 0 1-.5-.5v-3.196a2.5 2.5 0 0 1 .732-1.768L14.828 3.879z"/>
                                                </svg>
                                                <span className="text-body-small font-sans">{comment.claps}</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </article>

            {/* Footer */}
            <Footer />
        </div>
    )
}
