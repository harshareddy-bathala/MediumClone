import { useEffect, useState } from "react"
import { Header, ArticleCard, LoadingSpinner } from "../components"

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

// Mock featured articles for demo
const mockFeaturedArticles: Blog[] = [
  {
    id: '1',
    title: 'The Future of Web Development: What Every Developer Should Know',
    subtitle: 'Exploring the latest trends and technologies that are shaping the future of web development.',
    content: 'Web development is evolving at an unprecedented pace. From the rise of AI-powered development tools to the increasing importance of performance optimization, developers need to stay ahead of the curve. In this comprehensive guide, we explore the key trends that will define the next decade of web development.',
    author: {
      id: '1',
      name: 'Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b950?w=150&h=150&fit=crop&crop=face'
    },
    publishedDate: '2024-01-15',
    featuredImage: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop',
    tags: ['Web Development', 'Technology', 'Future'],
    claps: 1234,
    responses: 45
  },
  {
    id: '2',
    title: 'Building Scalable React Applications',
    content: 'Learn the best practices for building React applications that can grow with your business needs.',
    author: {
      id: '2',
      name: 'Mike Johnson',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    },
    publishedDate: '2024-01-14',
    featuredImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop',
    tags: ['React', 'JavaScript', 'Architecture'],
    claps: 892,
    responses: 23
  },
  {
    id: '3',
    title: 'The Art of Clean Code',
    content: 'Writing maintainable, readable code is more art than science. Here are the principles that matter.',
    author: {
      id: '3',
      name: 'Emily Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
    },
    publishedDate: '2024-01-13',
    tags: ['Programming', 'Best Practices', 'Clean Code'],
    claps: 756,
    responses: 18
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
            <section className="border-b border-gray-border bg-highlight py-20">
                <div className="max-w-container mx-auto px-6">
                    <div className="max-w-2xl">
                        <h1 className="text-display font-serif text-black mb-8">
                            Human stories & ideas
                        </h1>
                        <p className="text-title-small text-black font-serif mb-12">
                            A place to read, write, and deepen your understanding
                        </p>
                        {!isAuthenticated && (
                            <a href="/signup" className="btn-primary text-lg px-8 py-4">
                                Start reading
                            </a>
                        )}
                    </div>
                </div>
            </section>

            <div className="max-w-container mx-auto px-6 py-12">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Main Content */}
                    <main className="flex-1">
                        {/* Trending Topics */}
                        <div className="mb-12">
                            <div className="flex items-center space-x-4 mb-6">
                                <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                                </svg>
                                <h2 className="text-body-small font-medium text-black font-sans uppercase tracking-wide">
                                    Trending on Medium
                                </h2>
                            </div>
                            
                            <div className="flex flex-wrap gap-3">
                                {trendingTopics.slice(0, 6).map((topic, index) => (
                                    <button
                                        key={topic}
                                        onClick={() => setSelectedTopic(selectedTopic === topic ? null : topic)}
                                        className={`flex items-center space-x-2 px-4 py-2 rounded-full border transition-colors font-sans text-sm ${
                                            selectedTopic === topic
                                                ? 'bg-black text-white border-black'
                                                : 'bg-gray-light text-gray-dark border-gray-border hover:border-gray-dark'
                                        }`}
                                    >
                                        <span className="text-xs font-bold">0{index + 1}</span>
                                        <span>{topic}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Featured Articles */}
                        <div className="space-y-8">
                            {blogs.length > 0 && (
                                <ArticleCard
                                    {...blogs[0]}
                                    isHero={true}
                                    className="border-b border-gray-border pb-8"
                                />
                            )}

                            {/* Article Grid */}
                            <div className="grid md:grid-cols-2 gap-8">
                                {blogs.slice(1).map((blog) => (
                                    <ArticleCard
                                        key={blog.id}
                                        {...blog}
                                        className="border-b border-gray-border pb-6"
                                    />
                                ))}
                            </div>

                            {/* Load More */}
                            <div className="text-center py-8">
                                <button className="btn-secondary">
                                    Load more stories
                                </button>
                            </div>
                        </div>
                    </main>

                    {/* Sidebar */}
                    <aside className="lg:w-80 space-y-8">
                        {/* Recommended Topics */}
                        <div className="sticky top-24">
                            <h3 className="text-body font-bold text-black font-sans mb-4">
                                Recommended topics
                            </h3>
                            <div className="flex flex-wrap gap-2 mb-6">
                                {trendingTopics.map((topic) => (
                                    <button
                                        key={topic}
                                        className="px-4 py-2 bg-gray-light text-gray-dark rounded-full text-sm font-sans hover:bg-gray-border transition-colors"
                                    >
                                        {topic}
                                    </button>
                                ))}
                            </div>
                            <button className="text-green text-sm font-sans font-medium hover:text-green-dark transition-colors">
                                See more topics
                            </button>
                        </div>

                        {/* Who to follow */}
                        <div>
                            <h3 className="text-body font-bold text-black font-sans mb-4">
                                Who to follow
                            </h3>
                            <div className="space-y-4">
                                {blogs.slice(0, 3).map((blog) => (
                                    <div key={blog.id} className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-8 h-8 bg-gray-light rounded-full flex items-center justify-center overflow-hidden">
                                                {blog.author.avatar ? (
                                                    <img src={blog.author.avatar} alt={blog.author.name} className="w-full h-full object-cover" />
                                                ) : (
                                                    <span className="text-sm font-medium text-gray-dark">
                                                        {blog.author.name.charAt(0).toUpperCase()}
                                                    </span>
                                                )}
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-black font-sans">
                                                    {blog.author.name}
                                                </p>
                                                <p className="text-xs text-gray-medium font-sans">
                                                    Writer & Developer
                                                </p>
                                            </div>
                                        </div>
                                        <button className="btn-secondary text-xs px-3 py-1">
                                            Follow
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <button className="text-green text-sm font-sans font-medium hover:text-green-dark transition-colors mt-4">
                                See more suggestions
                            </button>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    )
}
