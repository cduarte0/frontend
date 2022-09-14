import { createActions } from '~/utils/index'
const resource = 'carriers'
export const state = () => ({
  all: [],
  pagination: {},
})

export const actions = {
  ...createActions(resource),
}