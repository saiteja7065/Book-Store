import React, { useState } from 'react';
import { Trophy, Target, Calendar, BookOpen, Award, Star } from 'lucide-react';
import toast from 'react-hot-toast';

const ReadingChallenges = () => {
  const [activeChallenge, setActiveChallenge] = useState(null);

  const challenges = [
    {
      id: 1,
      title: "2024 Reading Marathon",
      description: "Read 50 books by the end of 2024",
      progress: 12,
      goal: 50,
      endDate: "December 31, 2024",
      participants: 1234,
      rewards: ["Gold Reader Badge", "Special Profile Frame"],
      type: "yearly"
    },
    {
      id: 2,
      title: "Genre Explorer",
      description: "Read books from 10 different genres",
      progress: 4,
      goal: 10,
      endDate: "Ongoing",
      participants: 856,
      rewards: ["Genre Master Badge"],
      type: "ongoing"
    },
    {
      id: 3,
      title: "March Reading Sprint",
      description: "Read 4 books this month",
      progress: 1,
      goal: 4,
      endDate: "March 31, 2024",
      participants: 567,
      rewards: ["Sprint Champion Badge"],
      type: "monthly"
    }
  ];

  const achievements = [
    {
      id: 1,
      title: "Bookworm",
      description: "Read 10 books",
      icon: <BookOpen className="text-yellow-500" size={24} />,
      achieved: true,
      date: "Feb 15, 2024"
    },
    {
      id: 2,
      title: "Genre Explorer",
      description: "Read books from 5 different genres",
      icon: <Award className="text-indigo-500" size={24} />,
      achieved: true,
      date: "Jan 30, 2024"
    },
    {
      id: 3,
      title: "Review Master",
      description: "Write 20 book reviews",
      icon: <Star className="text-purple-500" size={24} />,
      achieved: false,
      progress: 15,
      total: 20
    }
  ];

  const handleJoinChallenge = (challengeId) => {
    setActiveChallenge(challengeId);
    toast.success('Successfully joined the challenge!');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Reading Challenges & Achievements
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Challenge yourself and earn rewards for your reading accomplishments
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Active Challenges */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                <Trophy className="mr-2 text-yellow-500" /> Active Challenges
              </h2>
              <div className="space-y-6">
                {challenges.map((challenge) => (
                  <div
                    key={challenge.id}
                    className="border dark:border-gray-700 rounded-lg p-6 hover:border-indigo-500 dark:hover:border-indigo-400 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {challenge.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mt-1">
                          {challenge.description}
                        </p>
                      </div>
                      <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 rounded-full text-sm">
                        {challenge.type}
                      </span>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                          <span>Progress: {challenge.progress}/{challenge.goal}</span>
                          <span>{Math.round((challenge.progress / challenge.goal) * 100)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-indigo-600 dark:bg-indigo-500 h-2 rounded-full"
                            style={{ width: `${(challenge.progress / challenge.goal) * 100}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center text-gray-600 dark:text-gray-400">
                            <Calendar className="mr-1" size={16} />
                            Ends: {challenge.endDate}
                          </span>
                          <span className="flex items-center text-gray-600 dark:text-gray-400">
                            <Target className="mr-1" size={16} />
                            {challenge.participants} participants
                          </span>
                        </div>
                        {activeChallenge === challenge.id ? (
                          <span className="text-green-600 dark:text-green-400">Joined</span>
                        ) : (
                          <button
                            onClick={() => handleJoinChallenge(challenge.id)}
                            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors dark:bg-indigo-500 dark:hover:bg-indigo-600"
                          >
                            Join Challenge
                          </button>
                        )}
                      </div>

                      <div className="border-t dark:border-gray-700 pt-3 mt-3">
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Rewards:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {challenge.rewards.map((reward, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded-full text-sm"
                            >
                              {reward}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                <Award className="mr-2 text-yellow-500" /> Achievements
              </h2>
              <div className="space-y-4">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`border dark:border-gray-700 rounded-lg p-4 ${
                      achievement.achieved
                        ? 'bg-green-50 dark:bg-green-900/20'
                        : 'bg-gray-50 dark:bg-gray-700/50'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-white dark:bg-gray-700 rounded-lg">
                        {achievement.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {achievement.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {achievement.description}
                        </p>
                        {achievement.achieved ? (
                          <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                            Achieved on {achievement.date}
                          </p>
                        ) : (
                          <div className="mt-2">
                            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                              <span>Progress: {achievement.progress}/{achievement.total}</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-1.5">
                              <div
                                className="bg-indigo-600 dark:bg-indigo-500 h-1.5 rounded-full"
                                style={{
                                  width: `${(achievement.progress / achievement.total) * 100}%`
                                }}
                              ></div>
                            </div>
                          </div>
                        )}
                      </div>
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

export default ReadingChallenges;