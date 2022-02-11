import Canvas from './components/Canvas'
import SettingsRow from './components/SettingsRow'
import ToolsRow from './components/ToolsRow'

import './styles/app.scss'

const App  = () => {
  return (
    <div className="app">
      <ToolsRow />
      <SettingsRow />
      <Canvas />
    </div>
  );
}

export default App;
