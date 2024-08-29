import React from 'react';

const Widget = ({ widget, onRemove }) => {
  return (
    <div className="bg-white p-4 rounded shadow">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold">{widget.name}</h3>
        <button onClick={onRemove} className="text-red-500">×</button>
      </div>
      <p>{widget.content}</p>
    </div>
  );
};

export default Widget;