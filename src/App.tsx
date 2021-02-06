import Tools from './modules/Tools';
import { Typography } from './components';

function App() {
  return (
    <div>
      <div style={{ marginLeft: 30 }}>
        <Typography type="header-1">VUTTR</Typography>
        <Typography type="header-4">Very Useful Tools to Remember</Typography>
      </div>
      <Tools />
    </div>
  );
}

export default App;
