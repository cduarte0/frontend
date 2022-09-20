import { createActions } from '~/utils/index'
const resource = 'tdrs'
export const state = () => ({
  all: [],
  pagination: {},
})

export const actions = {
  ...createActions(resource),
}