import { QueryProvider } from './common/contexts';

import { AppRouter } from './router';

function App() {
  return (
    <QueryProvider>
      <AppRouter />
    </QueryProvider>
  );
}

export default App;
