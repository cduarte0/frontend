import { createActions } from '~/utils/index'
const resource = 'payments'
export const state = () => ({
  all: [],
  pagination: {},
})

export const actions = {
  ...createActions(resource),
}