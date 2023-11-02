import { UrlList } from './UrlList'
import useRoutes from './useRoutes'

const routes = [
  { path: UrlList.DEFAULT, element: useRoutes(UrlList.DEFAULT) },
  { path: UrlList.LOGIN, element: useRoutes(UrlList.LOGIN) },
  { path: UrlList.REGISTRATION, element: useRoutes(UrlList.REGISTRATION) },
  { path: UrlList.HOME, element: useRoutes(UrlList.HOME) },
  { path: UrlList.TOPIC, element: useRoutes(UrlList.TOPIC) },
  { path: `${UrlList.QUIZ}/:name/:type`, element: useRoutes(UrlList.QUIZ) },
  { path: `${UrlList.EXAM}/:name/:types`, element: useRoutes(UrlList.EXAM) },
]

export default routes
