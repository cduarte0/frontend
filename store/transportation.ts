import { createActions } from '~/utils/index'
const resource = 'transportation'
export const state = () => ({
  all: [],
  pagination: {},
})

export const actions = {
  ...createActions(resource),
}