import React from 'react';

const TechStackFilter = ({ selectedTechStack, setSelectedTechStack }) => {
  const techStacks = [
  'React',
  'Node.js',
  'Java',
  'Python',
  'C++',
  'MongoDB',
  'AWS',
  'Marketing',
  'TypeScript',
  'Angular',
  'Vue.js',
  'Express.js',
  'Django',
  'Flask',
  'PostgreSQL',
  'MySQL',
  'Firebase',
  'Docker',
  'Kubernetes',
  'Git/GitHub'
];


  const handleTechStackClick = (tech) => {
    setSelectedTechStack(tech);
  };

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h2 className="text-xl font-bold text-gray-800 mb-3">Explore by Tech Stack</h2>
      <div className="flex flex-wrap gap-2">
        {techStacks.map((tech) => (
          <button
            key={tech}
            onClick={() => handleTechStackClick(tech)}
            className={`px-3 py-1 rounded-full text-sm font-medium border transition ${
              selectedTechStack === tech
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-blue-100 hover:border-blue-400'
            }`}
          >
            {tech}
          </button>
        ))}
      </div>
      {selectedTechStack && (
        <button
          onClick={() => setSelectedTechStack(null)}
          className="mt-3 text-sm text-red-500 underline"
        >
          Clear Tech Filter
        </button>
      )}
    </div>
  );
};

export default TechStackFilter;
