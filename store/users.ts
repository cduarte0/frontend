import { createActions } from '~/utils/index'
const resource = 'users'
export const state = () => ({
  all: [],
  pagination: {},
})

export const actions = {
  ...createActions(resource),
}