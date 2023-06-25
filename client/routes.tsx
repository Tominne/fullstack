import { Route, createRoutesFromElements } from 'react-router-dom'

import AppLayout from './components/AppLayout'
import MemeList from './components/MemeList'
import MemeDetails from './components/MemeDetails'

export const routes = createRoutesFromElements(
  <Route path="/" element={<AppLayout />}>
    <Route index element={<MemeList />} />

    <Route path=":memeId" element={<MemeDetails />} />
  </Route>
)
