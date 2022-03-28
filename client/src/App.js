import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import Canvas from './components/Canvas'
import SettingsRow from './components/SettingsRow'
import ToolsRow from './components/ToolsRow'

import './styles/app.scss'

const App  = () => {
  return (
    <Router>
      <Routes>
        <Route 
          path='/:id'
          element={
            <div className="app">
              <ToolsRow />
              <SettingsRow />
              <Canvas />
            </div>
          }
        />
        <Route
          path="*"
          element={<Navigate to={`f${(+new Date()).toString(16)}`} replace />}
          />
      </Routes>
    </Router>
  );
}

export default App;
