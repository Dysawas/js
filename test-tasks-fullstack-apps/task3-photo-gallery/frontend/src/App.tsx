import { Outlet} from 'react-router-dom'
import './App.sass'
import Navigation from './components/navigation/Navigation'
import { useNavigateToLogin } from './hooks/hooks';

const App = () => {
  useNavigateToLogin("/")

  return (
    <div className="container">
      <header className="header">
        <Navigation />
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default App
