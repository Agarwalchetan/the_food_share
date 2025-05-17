import { motion } from 'framer-motion';
import { Users, MessageSquare, Heart, Share2 } from 'lucide-react';
import UserLayout from '../../components/user/Layout';

interface Post {
  id: string;
  user: {
    name: string;
    image: string;
    role: string;
  };
  content: string;
  image?: string;
  likes: number;
  comments: number;
  time: string;
}

function CommunityPost({ post }: { post: Post }) {
  return (
    <motion.div
      className="bg-white rounded-lg shadow-lg p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
    >
      <div className="flex items-start gap-4 mb-4">
        <img
          src={post.user.image}
          alt={post.user.name}
          className="w-12 h-12 rounded-full"
        />
        <div>
          <h3 className="font-semibold">{post.user.name}</h3>
          <p className="text-sm text-gray-600">{post.user.role}</p>
          <p className="text-sm text-gray-500">{post.time}</p>
        </div>
      </div>
      <p className="text-gray-800 mb-4">{post.content}</p>
      {post.image && (
        <img
          src={post.image}
          alt="Post content"
          className="w-full h-64 object-cover rounded-lg mb-4"
        />
      )}
      <div className="flex items-center gap-6">
        <motion.button
          className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Heart className="h-5 w-5" />
          <span>{post.likes}</span>
        </motion.button>
        <motion.button
          className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <MessageSquare className="h-5 w-5" />
          <span>{post.comments}</span>
        </motion.button>
        <motion.button
          className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Share2 className="h-5 w-5" />
          <span>Share</span>
        </motion.button>
      </div>
    </motion.div>
  );
}

export default function Community() {
  const posts: Post[] = [
    {
      id: '1',
      user: {
        name: 'Sarah Chen',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150',
        role: 'Food Donor'
      },
      content: 'Just donated 50kg of fresh vegetables to City Food Bank! Feels great to help our community. 🥕🥬',
      image: 'https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&w=800',
      likes: 24,
      comments: 5,
      time: '2 hours ago'
    },
    {
      id: '2',
      user: {
        name: 'City Food Bank',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150',
        role: 'NGO Partner'
      },
      content: 'Thank you to all our amazing donors! This week we have been able to provide meals to over 500 families in need. Together we can make a difference! 💚',
      likes: 45,
      comments: 8,
      time: '5 hours ago'
    }
  ];

  return (
    <UserLayout title="Community">
      <div className="max-w-2xl mx-auto space-y-6">
        <motion.div
          className="bg-white rounded-lg shadow-lg p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-start gap-4">
            <img
              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150"
              alt="User"
              className="w-12 h-12 rounded-full"
            />
            <div className="flex-1">
              <textarea
                placeholder="Share your donation story..."
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                rows={3}
              />
              <div className="flex justify-end mt-4">
                <motion.button
                  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Users className="h-5 w-5" />
                  Share with Community
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {posts.map((post) => (
          <CommunityPost key={post.id} post={post} />
        ))}
      </div>
    </UserLayout>
  );
}