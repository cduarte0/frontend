import { createActions } from '~/utils/index'
const resource = 'purchases'
export const state = () => ({
  all: [],
  pagination: {},
})

export const actions = {
  ...createActions(resource),
}
