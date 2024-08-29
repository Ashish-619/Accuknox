import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addWidget, removeWidget } from '../redux/dashboardSlice';
import Widget from './Widget';
import AddWidgetForm from './AddWidgetForm';

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const categories = useSelector(state => state.dashboard.categories);
  const dispatch = useDispatch();

  const handleAddWidget = (categoryId, widgetName, widgetContent) => {
    dispatch(addWidget({ categoryId, name: widgetName, content: widgetContent }));
  };

  const handleRemoveWidget = (categoryId, widgetId) => {
    dispatch(removeWidget({ categoryId, widgetId }));
  };

  const filteredCategories = categories.map(category => ({
    ...category,
    widgets: category.widgets.filter(widget => 
      widget.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }));

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <input
        type="text"
        placeholder="Search widgets..."
        className="w-full p-2 mb-4 border rounded"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {filteredCategories.map(category => (
        <div key={category.id} className="mb-6">
          <h2 className="text-xl font-semibold mb-2">{category.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {category.widgets.map(widget => (
              <Widget
                key={widget.id}
                widget={widget}
                onRemove={() => handleRemoveWidget(category.id, widget.id)}
              />
            ))}
          </div>
          <AddWidgetForm categoryId={category.id} onAddWidget={handleAddWidget} />
        </div>
      ))}
    </div>
  );
};

export default Dashboard;