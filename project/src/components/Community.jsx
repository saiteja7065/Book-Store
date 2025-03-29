import React, { useState } from 'react';
import { Users, MessageCircle, BookOpen, Star, Filter, Heart, Share2, Calendar, Clock } from 'lucide-react';
import { GENRES } from '../data/books';
import toast from 'react-hot-toast';

const Community = () => {
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [sortBy, setSortBy] = useState('recent');
  const [showCreateDiscussion, setShowCreateDiscussion] = useState(false);
  const [newDiscussion, setNewDiscussion] = useState({
    title: '',
    content: '',
    tags: []
  });

  const discussions = [
    {
      id: 1,
      title: "What's your favorite mystery novel?",
      author: "Sarah Mitchell",
      genre: "Mystery",
      replies: 45,
      likes: 23,
      lastActive: "2 hours ago",
      tags: ["mystery", "recommendations", "discussion"],
      content: "I've been reading a lot of mystery novels lately and would love to hear everyone's favorites! Currently reading 'The Silent Patient' and can't put it down.",
      isLiked: false
    },
    {
      id: 2,
      title: "Science Fiction Book Club - March Read",
      author: "James Wilson",
      genre: "Sci-Fi",
      replies: 67,
      likes: 34,
      lastActive: "1 hour ago",
      tags: ["sci-fi", "book-club", "monthly-read"],
      content: "This month we're reading 'Project Hail Mary' by Andy Weir. Join us for our virtual discussion on March 25th!",
      isLiked: true
    },
    {
      id: 3,
      title: "Fantasy World Building Discussion",
      author: "Emma Roberts",
      genre: "Fantasy",
      replies: 89,
      likes: 56,
      lastActive: "30 minutes ago",
      tags: ["fantasy", "writing", "world-building"],
      content: "Let's discuss the elements that make fantasy worlds believable and immersive. What are your favorite examples of world-building in fantasy literature?",
      isLiked: false
    }
  ];

  const readingGroups = [
    {
      id: 1,
      name: "Mystery Lovers Book Club",
      members: 234,
      genre: "Mystery",
      currentBook: "The Silent Patient",
      nextMeeting: "March 15, 2024",
      description: "A community of mystery enthusiasts who love solving puzzles and discussing plot twists.",
      meetingTime: "7:00 PM IST",
      meetingLink: "zoom.us/meeting/123",
      isJoined: false
    },
    {
      id: 2,
      name: "Sci-Fi Explorers",
      members: 189,
      genre: "Sci-Fi",
      currentBook: "Project Hail Mary",
      nextMeeting: "March 18, 2024",
      description: "Exploring the frontiers of science fiction and discussing futuristic concepts.",
      meetingTime: "8:00 PM IST",
      meetingLink: "zoom.us/meeting/456",
      isJoined: true
    },
    {
      id: 3,
      name: "Fantasy Realms",
      members: 312,
      genre: "Fantasy",
      currentBook: "The Name of the Wind",
      nextMeeting: "March 20, 2024",
      description: "Dive into magical worlds and epic adventures with fellow fantasy lovers.",
      meetingTime: "6:30 PM IST",
      meetingLink: "zoom.us/meeting/789",
      isJoined: false
    }
  ];

  const handleCreateDiscussion = (e) => {
    e.preventDefault();
    toast.success('Discussion created successfully!');
    setShowCreateDiscussion(false);
    setNewDiscussion({ title: '', content: '', tags: [] });
  };

  const handleJoinGroup = (groupId) => {
    toast.success('Successfully joined the reading group!');
  };

  const handleLikeDiscussion = (discussionId) => {
    toast.success('Discussion liked!');
  };

  const handleShareDiscussion = (discussionId) => {
    navigator.clipboard.writeText(window.location.href + `#discussion-${discussionId}`);
    toast.success('Link copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            BookVerse Community
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Connect with fellow readers, join discussions, and discover new books together
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Genre
              </label>
              <select
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
                className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="All">All Genres</option>
                {GENRES.map((genre) => (
                  <option key={genre.name} value={genre.name}>
                    {genre.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="recent">Most Recent</option>
                <option value="popular">Most Popular</option>
                <option value="active">Most Active</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Reading Groups */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                <Users className="mr-2" /> Reading Groups
              </h2>
              <div className="space-y-4">
                {readingGroups.map((group) => (
                  <div
                    key={group.id}
                    className="border dark:border-gray-700 rounded-lg p-4 hover:border-indigo-500 dark:hover:border-indigo-400 transition-colors"
                  >
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      {group.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {group.members} members • {group.genre}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {group.description}
                    </p>
                    <div className="border-t dark:border-gray-700 pt-3 mt-3">
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                        <span className="font-medium">Currently reading:</span> {group.currentBook}
                      </p>
                      <div className="flex items-center gap-2 text-sm text-indigo-600 dark:text-indigo-400">
                        <Calendar size={16} />
                        <span>Next meeting: {group.nextMeeting}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-indigo-600 dark:text-indigo-400 mt-1">
                        <Clock size={16} />
                        <span>{group.meetingTime}</span>
                      </div>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <button
                        onClick={() => handleJoinGroup(group.id)}
                        className={`flex-1 py-2 rounded-lg transition-colors ${
                          group.isJoined
                            ? 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                            : 'bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-200 dark:hover:bg-indigo-800'
                        }`}
                      >
                        {group.isJoined ? 'Joined' : 'Join Group'}
                      </button>
                      {group.isJoined && (
                        <a
                          href={group.meetingLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                        >
                          Join Meeting
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Discussions */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
                  <MessageCircle className="mr-2" /> Discussions
                </h2>
                <button
                  onClick={() => setShowCreateDiscussion(true)}
                  className="bg-indigo-600 dark:bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors"
                >
                  Start Discussion
                </button>
              </div>

              {showCreateDiscussion && (
                <div className="mb-8 bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Create New Discussion
                  </h3>
                  <form onSubmit={handleCreateDiscussion} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Title
                      </label>
                      <input
                        type="text"
                        value={newDiscussion.title}
                        onChange={(e) => setNewDiscussion({ ...newDiscussion, title: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Content
                      </label>
                      <textarea
                        value={newDiscussion.content}
                        onChange={(e) => setNewDiscussion({ ...newDiscussion, content: e.target.value })}
                        rows={4}
                        className="w-full px-4 py-2 border rounded-lg dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Tags (comma-separated)
                      </label>
                      <input
                        type="text"
                        value={newDiscussion.tags.join(', ')}
                        onChange={(e) => setNewDiscussion({
                          ...newDiscussion,
                          tags: e.target.value.split(',').map(tag => tag.trim())
                        })}
                        className="w-full px-4 py-2 border rounded-lg dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="submit"
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                      >
                        Create Discussion
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowCreateDiscussion(false)}
                        className="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}

              <div className="space-y-4">
                {discussions.map((discussion) => (
                  <div
                    key={discussion.id}
                    id={`discussion-${discussion.id}`}
                    className="border dark:border-gray-700 rounded-lg p-4 hover:border-indigo-500 dark:hover:border-indigo-400 transition-colors"
                  >
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      {discussion.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-3">
                      {discussion.content}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {discussion.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                      <span>By {discussion.author}</span>
                      <span>{discussion.lastActive}</span>
                    </div>
                    <div className="flex items-center gap-4 mt-3 text-sm text-gray-600 dark:text-gray-400">
                      <button
                        onClick={() => handleLikeDiscussion(discussion.id)}
                        className="flex items-center gap-1 hover:text-indigo-600 dark:hover:text-indigo-400"
                      >
                        <Heart
                          size={16}
                          className={discussion.isLiked ? 'fill-current text-red-500' : ''}
                        />
                        {discussion.likes} likes
                      </button>
                      <span className="flex items-center gap-1">
                        <MessageCircle size={16} />
                        {discussion.replies} replies
                      </span>
                      <button
                        onClick={() => handleShareDiscussion(discussion.id)}
                        className="flex items-center gap-1 hover:text-indigo-600 dark:hover:text-indigo-400"
                      >
                        <Share2 size={16} />
                        Share
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;