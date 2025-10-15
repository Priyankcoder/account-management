export const Footer = () => {
  return (
    <footer className="bg-white/80 backdrop-blur-md border-t border-gray-200/50 py-4 sm:py-6 text-center text-xs sm:text-sm text-triplea-gray mt-auto">
      <div className="flex items-center justify-center gap-2 mt-2 text-xs opacity-60 px-4">
        <img
          src="https://www.triple-a.io/src/lib/images/favicon-32x32.png"
          alt="TripleA Logo"
          className="w-4 h-4 sm:w-5 sm:h-5"
        />
        <p>Powered by TripleA Account Transfer System</p>
      </div>
    </footer>
  );
};
