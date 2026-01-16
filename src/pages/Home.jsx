import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl md:text-7xl font-bold bg-gradient-to-br from-green-400 to-blue-600 text-transparent bg-clip-text mb-6"
            >
                Rick and Morty
            </motion.h1>
            <motion.p
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 transition={{ delay: 0.2 }}
                 className="text-xl text-gray-400 mb-10 max-w-2xl"
            >
                Explore the multiverse. Discover characters, locations, and episodes from the show.
            </motion.p>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
            >
                <Link
                    to="/characters"
                    className="px-8 py-3 bg-green-500 hover:bg-green-600 text-white rounded-full text-lg font-semibold transition-transform transform hover:scale-105 shadow-lg shadow-green-500/30"
                >
                    Get Started
                </Link>
            </motion.div>
        </div>
    );
};

export default Home;
