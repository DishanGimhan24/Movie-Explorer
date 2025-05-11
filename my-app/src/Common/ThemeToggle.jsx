const ThemeToggle = () => {
  const toggleTheme = () => {
    const html = document.documentElement;
    html.classList.toggle('dark');
  };

  return (
    <button onClick={toggleTheme} className="bg-gray-800 text-white px-4 py-2 rounded">
      Toggle Theme
    </button>
  );
};

export default ThemeToggle;