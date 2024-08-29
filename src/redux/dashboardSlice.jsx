import { createSlice } from '@reduxjs/toolkit';
import { initialDashboard } from '../data/initialDashboard';

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: initialDashboard,
  reducers: {
    addWidget: (state, action) => {
      const { categoryId, name, content } = action.payload;
      const category = state.categories.find(c => c.id === categoryId);
      if (category) {
        category.widgets.push({
          id: `widget${Date.now()}`,
          name,
          content
        });
      }
    },
    removeWidget: (state, action) => {
      const { categoryId, widgetId } = action.payload;
      const category = state.categories.find(c => c.id === categoryId);
      if (category) {
        category.widgets = category.widgets.filter(w => w.id !== widgetId);
      }
    }
  }
});

export const { addWidget, removeWidget } = dashboardSlice.actions;
export default dashboardSlice.reducer;