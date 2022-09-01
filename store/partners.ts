import { createActions } from '~/utils/index'
const resource = 'partners'
export const state = () => ({
  all: [],
  pagination: {},
})

export const actions = {
  ...createActions(resource),
}