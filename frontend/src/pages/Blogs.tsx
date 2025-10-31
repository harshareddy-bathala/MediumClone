import { useEffect, useState } from "react"
import { Header, ArticleCard, LoadingSpinner, Footer } from "../components"

// const BACKEND_URL = "http://localhost:8787" // Update this to your backend URL when API is ready

interface Author {
    name: string;
    email?: string;
    avatar?: string;
    id?: string;
}

interface Blog {
    content: string;
    title: string;
    subtitle?: string;
    id: string;
    author: Author;
    publishedDate?: string;
    featuredImage?: string;
    tags?: string[];
    claps?: number;
    responses?: number;
}

// Mock trending topics
const trendingTopics = [
  'Programming', 'JavaScript', 'React', 'TypeScript', 'Web Development',
  'AI & Machine Learning', 'Data Science', 'Startup', 'Design', 'Technology'
]

// Mock featured articles for demo with placeholder images
const mockFeaturedArticles: Blog[] = [
  {
    id: '1',
    title: 'The Future of Web Development: What Every Developer Should Know',
    subtitle: 'Exploring the latest trends and technologies that are shaping the future of web development.',
    content: 'Web development is evolving at an unprecedented pace. From the rise of AI-powered development tools to the increasing importance of performance optimization, developers need to stay ahead of the curve. In this comprehensive guide, we explore the key trends that will define the next decade of web development.',
    author: {
      id: '1',
      name: 'Sarah Chen',
      avatar: undefined
    },
    publishedDate: '2024-01-15',
    featuredImage: 'https://via.placeholder.com/800x400/1A8917/FFFFFF?text=Web+Development',
    tags: ['Web Development', 'Technology', 'Future'],
    claps: 1234,
    responses: 45
  },
  {
    id: '2',
    title: 'Building Scalable React Applications: A Comprehensive Guide',
    subtitle: 'Master the art of creating React apps that scale',
    content: 'Learn the best practices for building React applications that can grow with your business needs. From component architecture to state management, we cover everything you need to know.',
    author: {
      id: '2',
      name: 'Mike Johnson',
      avatar: undefined
    },
    publishedDate: '2024-01-14',
    featuredImage: 'https://via.placeholder.com/800x400/61DAFB/000000?text=React+Development',
    tags: ['React', 'JavaScript', 'Architecture'],
    claps: 892,
    responses: 23
  },
  {
    id: '3',
    title: 'The Art of Clean Code: Writing Software That Lasts',
    subtitle: 'Transform your coding practices with these proven principles',
    content: 'Writing maintainable, readable code is more art than science. Here are the principles that matter. Discover how to write code that your future self and teammates will thank you for.',
    author: {
      id: '3',
      name: 'Emily Rodriguez',
      avatar: undefined
    },
    publishedDate: '2024-01-13',
    featuredImage: 'https://via.placeholder.com/800x400/242424/FFFFFF?text=Clean+Code',
    tags: ['Programming', 'Best Practices', 'Clean Code'],
    claps: 756,
    responses: 18
  },
  {
    id: '4',
    title: 'TypeScript Best Practices for Modern Applications',
    subtitle: 'Level up your TypeScript skills',
    content: 'Discover the best practices and patterns for using TypeScript in modern web applications. From type safety to performance optimization.',
    author: {
      id: '4',
      name: 'Alex Turner',
      avatar: undefined
    },
    publishedDate: '2024-01-12',
    featuredImage: 'https://via.placeholder.com/800x400/3178C6/FFFFFF?text=TypeScript',
    tags: ['TypeScript', 'JavaScript', 'Best Practices'],
    claps: 634,
    responses: 15
  },
  {
    id: '5',
    title: 'Mastering CSS Grid and Flexbox in 2024',
    subtitle: 'Modern layout techniques every developer should know',
    content: 'Learn how to create beautiful, responsive layouts using CSS Grid and Flexbox. Complete with real-world examples and best practices.',
    author: {
      id: '5',
      name: 'Jessica Park',
      avatar: undefined
    },
    publishedDate: '2024-01-11',
    featuredImage: 'https://via.placeholder.com/800x400/FF6B6B/FFFFFF?text=CSS+Layout',
    tags: ['CSS', 'Design', 'Web Development'],
    claps: 521,
    responses: 12
  },
  {
    id: '6',
    title: 'Node.js Performance Optimization Tips',
    subtitle: 'Speed up your backend applications',
    content: 'Boost your Node.js application performance with these proven optimization techniques. From memory management to async patterns.',
    author: {
      id: '6',
      name: 'David Kim',
      avatar: undefined
    },
    publishedDate: '2024-01-10',
    featuredImage: 'https://via.placeholder.com/800x400/68A063/FFFFFF?text=Node.js',
    tags: ['Node.js', 'Backend', 'Performance'],
    claps: 478,
    responses: 9
  }
]

export const Blogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

    // Check if user is authenticated
    const isAuthenticated = !!localStorage.getItem("token");
    const user = isAuthenticated ? { name: 'John Doe' } : undefined;

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                // For demo purposes, we'll use mock data
                // In production, uncomment the API call below
                
                // const token = localStorage.getItem("token");
                // const response = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
                //     headers: {
                //         Authorization: `Bearer ${token}`
                //     }
                // });
                // setBlogs(response.data.blogs);

                // Mock API delay
                await new Promise(resolve => setTimeout(resolve, 1000));
                setBlogs(mockFeaturedArticles);
            } catch (error) {
                console.error('Error fetching blogs:', error);
                setError('Failed to load articles. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-white">
                <Header isAuthenticated={isAuthenticated} user={user} />
                <div className="max-w-container mx-auto px-6 py-12">
                    <div className="flex justify-center items-center min-h-96">
                        <LoadingSpinner size="lg" />
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-white">
                <Header isAuthenticated={isAuthenticated} user={user} />
                <div className="max-w-container mx-auto px-6 py-12">
                    <div className="text-center">
                        <div className="bg-red-50 border border-red-200 rounded-lg p-8 max-w-md mx-auto">
                            <div className="text-red-600 mb-4">
                                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-medium text-red-900 mb-2">
                                Error Loading Articles
                            </h3>
                            <p className="text-red-700 mb-4">{error}</p>
                            <button 
                                onClick={() => window.location.reload()} 
                                className="btn-primary"
                            >
                                Try Again
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            <Header isAuthenticated={isAuthenticated} user={user} />
            
            {/* Hero Section */}
            <section className="border-b border-gray-200 bg-gradient-to-r from-yellow-50 via-yellow-100 to-yellow-50 py-24">
                <div className="max-w-container mx-auto px-6">
                    <div className="max-w-3xl">
                        <h1 className="text-6xl md:text-7xl lg:text-8xl font-serif text-gray-900 mb-6 leading-tight">
                            Human stories & ideas
                        </h1>
                        <p className="text-2xl md:text-3xl text-gray-800 font-serif mb-12 leading-relaxed">
                            A place to read, write, and deepen your understanding
                        </p>
                        {!isAuthenticated && (
                            <a href="/signup" className="inline-block bg-gray-900 text-white px-12 py-4 rounded-full text-lg font-sans font-medium hover:bg-gray-800 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                                Start reading
                            </a>
                        )}
                    </div>
                </div>
            </section>

            <div className="max-w-container mx-auto px-6 py-12">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Main Content */}
                    <main className="flex-1 min-w-0">
                        {/* Trending Topics */}
                        <div className="mb-12 bg-white p-6 rounded-lg border border-gray-200">
                            <div className="flex items-center space-x-3 mb-6">
                                <svg className="w-6 h-6 text-gray-900" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                                </svg>
                                <h2 className="text-base font-semibold text-gray-900 font-sans uppercase tracking-wide">
                                    Trending on Medium
                                </h2>
                            </div>
                            
                            <div className="flex flex-wrap gap-3">
                                {trendingTopics.slice(0, 6).map((topic, index) => (
                                    <button
                                        key={topic}
                                        onClick={() => setSelectedTopic(selectedTopic === topic ? null : topic)}
                                        className={`flex items-center space-x-2 px-5 py-2.5 rounded-full border-2 transition-all font-sans text-sm font-medium ${
                                            selectedTopic === topic
                                                ? 'bg-gray-900 text-white border-gray-900 shadow-md'
                                                : 'bg-white text-gray-700 border-gray-300 hover:border-gray-900 hover:shadow-sm'
                                        }`}
                                    >
                                        <span className="text-xs font-bold text-gray-500">0{index + 1}</span>
                                        <span>{topic}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Featured Articles */}
                        <div className="space-y-10">
                            {blogs.length > 0 && (
                                <ArticleCard
                                    {...blogs[0]}
                                    isHero={true}
                                    className="border-b border-gray-200 pb-10 mb-2"
                                />
                            )}

                            {/* Article Grid */}
                            <div className="grid md:grid-cols-2 gap-10">
                                {blogs.slice(1).map((blog) => (
                                    <ArticleCard
                                        key={blog.id}
                                        {...blog}
                                        className="border-b border-gray-200 pb-8"
                                    />
                                ))}
                            </div>

                            {/* Load More */}
                            <div className="text-center py-12">
                                <button className="inline-flex items-center space-x-2 px-8 py-3 border-2 border-gray-900 text-gray-900 rounded-full text-base font-sans font-medium hover:bg-gray-900 hover:text-white transition-all shadow-sm hover:shadow-md">
                                    <span>Load more stories</span>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </main>

                    {/* Sidebar */}
                    <aside className="lg:w-96 flex-shrink-0">
                        <div className="sticky top-24 space-y-8">
                            {/* Recommended Topics */}
                            <div className="bg-white p-6 rounded-lg border border-gray-200">
                                <h3 className="text-base font-bold text-gray-900 font-sans mb-4">
                                    Recommended topics
                                </h3>
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {trendingTopics.map((topic) => (
                                        <button
                                            key={topic}
                                            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-sans hover:bg-gray-200 transition-colors border border-transparent hover:border-gray-300"
                                        >
                                            {topic}
                                        </button>
                                    ))}
                                </div>
                                <button className="text-green-600 text-sm font-sans font-semibold hover:text-green-700 transition-colors flex items-center space-x-1">
                                    <span>See more topics</span>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>

                            {/* Who to follow */}
                            <div className="bg-white p-6 rounded-lg border border-gray-200">
                                <h3 className="text-base font-bold text-gray-900 font-sans mb-5">
                                    Who to follow
                                </h3>
                                <div className="space-y-5">
                                    {blogs.slice(0, 3).map((blog) => (
                                        <div key={blog.id} className="flex items-start justify-between group">
                                            <div className="flex items-center space-x-3 min-w-0 flex-1">
                                                <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center overflow-hidden flex-shrink-0 shadow-sm">
                                                    {blog.author.avatar ? (
                                                        <img src={blog.author.avatar} alt={blog.author.name} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <span className="text-base font-bold text-white">
                                                            {blog.author.name.charAt(0).toUpperCase()}
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <p className="text-sm font-semibold text-gray-900 font-sans truncate group-hover:text-gray-700 transition-colors">
                                                        {blog.author.name}
                                                    </p>
                                                    <p className="text-xs text-gray-500 font-sans truncate">
                                                        Writer & Developer
                                                    </p>
                                                </div>
                                            </div>
                                            <button className="px-4 py-1.5 border-2 border-gray-900 text-gray-900 rounded-full text-xs font-sans font-medium hover:bg-gray-900 hover:text-white transition-all flex-shrink-0 ml-3">
                                                Follow
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                <button className="text-green-600 text-sm font-sans font-semibold hover:text-green-700 transition-colors mt-5 flex items-center space-x-1">
                                    <span>See more suggestions</span>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>

                            {/* Reading List - New Section */}
                            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-lg border border-gray-200">
                                <h3 className="text-base font-bold text-gray-900 font-sans mb-3">
                                    📚 Start your reading list
                                </h3>
                                <p className="text-sm text-gray-600 font-sans mb-4">
                                    Save stories to read later and organize your favorite content.
                                </p>
                                {!isAuthenticated && (
                                    <a href="/signup" className="inline-block w-full text-center px-4 py-2 bg-gray-900 text-white rounded-full text-sm font-sans font-medium hover:bg-gray-800 transition-colors">
                                        Get started
                                    </a>
                                )}
                            </div>
                        </div>
                    </aside>
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    )
}
