import { BrowserRouter, Route, Routes } from 'react-router'
import { Layout } from './components/Layout'
import { ProjectsProvider } from './data/ProjectsContext'
import { LanguageProvider } from './i18n/LanguageContext'
import { HomePage } from './pages/HomePage'
import { NotFoundPage } from './pages/NotFoundPage'
import { ProjectPage } from './pages/ProjectPage'

export default function App() {
  return (
    <LanguageProvider>
      <ProjectsProvider>
        <BrowserRouter basename={import.meta.env.BASE_URL}>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="projetos/:slug" element={<ProjectPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ProjectsProvider>
    </LanguageProvider>
  )
}
