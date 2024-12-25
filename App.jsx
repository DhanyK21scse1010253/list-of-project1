
// import React, { useState, useEffect } from 'react';
// import CandidateList from './components/CandidateList';
//  import './App.css';

// const App = () => {
//   const [candidates, setCandidates] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchCandidates = async () => {
//       setLoading(true);
//       try {
//         const response = await fetch('https://jsonplaceholder.typicode.com/users');
//         const data = await response.json();
//         setCandidates(data);
//       } catch (error) {
//         console.error('Error fetching candidates:', error);
//       }
//       setLoading(false);
//     };

//     fetchCandidates();
//   }, []);

//   return (
//     <div className="app-container">
//       <h1>Candidate List</h1>
//       {loading ? (
//         <p>Loading candidates...</p>
//       ) : (
//         <CandidateList candidates={candidates} />
//       )}
//     </div>
//   );
// };

// export default App;

import React, { useState, useEffect } from 'react';
import './App.css';
import './Table.css';

const mockData = [
    { id: 1, name: 'John Doe', skills: ['JavaScript', 'React'], experience: 5 },
    { id: 2, name: 'Jane Smith', skills: ['Python', 'Django'], experience: 3 },
    { id: 3, name: 'Samuel Green', skills: ['Java', 'Spring'], experience: 7 },
    { id: 4, name: 'Emily White', skills: ['C#', '.NET'], experience: 4 }
];

function App() {
    const [candidates, setCandidates] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');

    useEffect(() => {
        // Simulate API fetch
        setCandidates(mockData);
    }, []);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value.toLowerCase());
    };

    const handleSort = () => {
        const sortedCandidates = [...candidates].sort((a, b) => {
            return sortOrder === 'asc' ? a.experience - b.experience : b.experience - a.experience;
        });
        setCandidates(sortedCandidates);
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    const filteredCandidates = candidates.filter(candidate => 
        candidate.name.toLowerCase().includes(searchTerm) || 
        candidate.skills.join(', ').toLowerCase().includes(searchTerm)
    );

    return (
        <div className="App">
            <h1>Candidate List</h1>
            <input 
                type="text" 
                placeholder="Search by Name or Skills..." 
                onChange={handleSearch} 
            />
            <button onClick={handleSort}>Sort by Experience ({sortOrder})</button>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Skills</th>
                        <th>Experience (years)</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredCandidates.map(candidate => (
                        <tr key={candidate.id}>
                            <td>{candidate.name}</td>
                            <td>{candidate.skills.join(', ')}</td>
                            <td>{candidate.experience}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default App;
