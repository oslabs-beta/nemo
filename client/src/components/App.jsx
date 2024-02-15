// import React from 'react';
// import Navbar from './NavBar.jsx';
// import MainContainer from './MainContainer.jsx';

// const App = () => {
//   return (
//     <div>
//       <Navbar />
//       <MainContainer />
//     </div>
//   );
// };

// export default App;

import React, { useState } from 'react';
import Navbar from './NavBar.jsx';
import MainContainer from './MainContainer.jsx';

const App = () => {
  const [activeButton, setActiveButton] = useState(null);

  return (
    <div>
      <Navbar setActiveButton={setActiveButton} />
      <MainContainer activeButton={activeButton} />
    </div>
  );
};

export default App;

