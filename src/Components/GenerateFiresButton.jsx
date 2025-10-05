import React from 'react';

const GenerateFiresButton = ({ handleGenerate }) => {
  return (
    <button onClick={handleGenerate}>
      View Fires
    </button>
  );
};

export default GenerateFiresButton;
