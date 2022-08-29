import { createActions } from '~/utils/index'
const resource = 'projects'
export const state = () => ({
  all: [],
  pagination: {},
})

export const actions = {
  ...createActions(resource),
}