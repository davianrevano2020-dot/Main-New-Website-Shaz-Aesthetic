const fs = require('fs');
let code = fs.readFileSync('app/reviews/ClientReviewsPage.tsx', 'utf8');

const target = `        {activeVideo !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
          >
            <div className="absolute inset-0 cursor-pointer" onClick={() => setActiveVideo(null)} />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-4xl aspect-video bg-brand-charcoal rounded-2xl overflow-hidden shadow-2xl flex flex-col items-center justify-center"
            >
              <button 
                onClick={() => setActiveVideo(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              <Play className="w-16 h-16 mb-4 opacity-50 text-white" />
              <h3 className="text-2xl font-serif text-white mb-2">Video playback integration</h3>
              <p className="text-white/50">In a production environment, this would embed a YouTube, Vimeo, or HTML5 video player.</p>
            </motion.div>
          </motion.div>
        )}`;

const replace = `        {activeVideo !== null && (() => {
          const video = parsedVideoTestimonials.find((v: any) => v.id === activeVideo);
          return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
          >
            <div className="absolute inset-0 cursor-pointer" onClick={() => setActiveVideo(null)} />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-4xl aspect-video bg-brand-charcoal rounded-2xl overflow-hidden shadow-2xl flex flex-col items-center justify-center"
            >
              <button 
                onClick={() => setActiveVideo(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              {video?.videoUrl ? (
                <video src={video.videoUrl} controls autoPlay className="w-full h-full object-contain bg-black" />
              ) : (
                <>
                  <Play className="w-16 h-16 mb-4 opacity-50 text-white" />
                  <h3 className="text-2xl font-serif text-white mb-2">Video playback integration</h3>
                  <p className="text-white/50">Upload a video in the Back-Office to see it play here.</p>
                </>
              )}
            </motion.div>
          </motion.div>
          );
        })()}`;

code = code.replace(target, replace);
fs.writeFileSync('app/reviews/ClientReviewsPage.tsx', code);
