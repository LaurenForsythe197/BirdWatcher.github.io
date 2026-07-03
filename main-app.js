// ========================================
// BirdWatcher Web App
// Chunk 6: Main App Component & Tab Navigation
// ========================================

// ========================================
// Tab Navigator Component
// ========================================

const TabNavigator = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'identify', label: 'Identify', icon: '📷' },
    { id: 'sightings', label: 'Sightings', icon: '🔖' },
    { id: 'behaviors', label: 'Behaviors', icon: '📋' },
    { id: 'petcare', label: 'Pet Care', icon: '❤️' }
  ];

  return React.createElement('nav', { className: 'tab-navigator' },
    tabs.map((tab) =>
      React.createElement('button', {
        key: tab.id,
        className: 'tab-navigator-item ' + (activeTab === tab.id ? 'active' : ''),
        onClick: () => onTabChange(tab.id),
        style: { color: activeTab === tab.id ? '#8B5CF6' : '#6B7280' }
      },
        React.createElement('div', { className: 'tab-navigator-icon' }, tab.icon),
        React.createElement('span', { style: { fontSize: '12px', fontWeight: '700' } }, tab.label)
      )
    )
  );
};

// ========================================
// Main App Component
// ========================================

const App = () => {
  const [activeTab, setActiveTab] = React.useState('identify');

  const renderScreen = () => {
    switch (activeTab) {
      case 'identify':
        return React.createElement(window.AppComponents.IdentifyScreen);
      case 'sightings':
        return React.createElement(window.AppComponents.SightingsScreen);
      case 'behaviors':
        return React.createElement(window.AppComponents.BehaviorsScreen);
      case 'petcare':
        return React.createElement(window.AppComponents.PetBirdsScreen);
      default:
        return React.createElement(window.AppComponents.IdentifyScreen);
    }
  };

  return React.createElement(
    window.AppUtils.ThemeProvider,
    {},
    React.createElement('div', { className: 'app-container' },
      React.createElement('div', { className: 'app-content' },
        renderScreen()
      ),
      React.createElement(TabNavigator, {
        activeTab: activeTab,
        onTabChange: setActiveTab
      })
    )
  );
};

// ========================================
// Bootstrap App
// ========================================

window.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');
  if (root) {
    ReactDOM.render(
      React.createElement(App),
      root
    );
  }
});

// Export for debugging
window.App = App;
window.AppTabNavigator = TabNavigator;
