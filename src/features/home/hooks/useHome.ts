//src/features/home/viewModel/homeViewModel.ts

import { homeApi as api } from '../repo/remote/homeApi'
import { HomeResponse, HomeState } from '../repo/data/homeData'
import { useState, useEffect } from 'react'
import { HttpStatusCode } from '../../../common/repo/HttpStatusCode'
import { StateType } from '../../../common/utils/AppState'
import useStatusMessage from '../../../common/repo/useStatusMessage'

const useHome = (literal: Record<string, string>) => {
  const [appstate, setAppState] = useState<HomeState<HomeResponse>>({
    state: StateType.INIT,
    isError: false,
    isSuccess: false,
    status: HttpStatusCode.IDLE,
    statusMessage: '',
    data: null,
    sortedFeatures: [],
  })

  useEffect(() => {
    homeApi()
  }, [])

  const homeApi = async () => {
    setAppState((prevState) => ({
      ...prevState,
      state: StateType.LOADING,
    }))
    try {
      const response = await api(literal)
      if (response.isSuccess && response.data) {
        const data: HomeResponse = response.data
        const features = data.features
        const sortedFeatures = features.sort(
          (a, b) => a.display_order - b.display_order,
        )
        setAppState((prevState) => ({
          ...prevState,
          state: StateType.COMPLETED,
          isSuccess: true,
          status: response.status,
          statusMessage: useStatusMessage(response.status, literal),
          data: data,
          sortedFeatures: sortedFeatures,
        }))
      } else {
        setAppState((prevState) => ({
          ...prevState,
          state: StateType.COMPLETED,
          isError: true,
          status: response.status,
          statusMessage: useStatusMessage(response.status, literal),
        }))
      }
    } catch (error) {
      setAppState((prevState) => ({
        ...prevState,
        state: StateType.COMPLETED,
        isError: true,
        status: HttpStatusCode.INTERNET_ERROR,
        statusMessage: useStatusMessage(HttpStatusCode.INTERNET_ERROR, literal),
      }))
    }
  }

  return {
    appstate,
  }
}

export default useHome
