const tagsView = {
  state: {
    visitedViews: [],
    cachedViews: []
  },
  mutations: {
    ADD_VISITED_VIEW: (state, view) => {
      console.log('ADD_VISITED_VIEW:' + view.name)
      if (state.visitedViews.some(v => v.path === view.path)) return
      state.visitedViews.push(
        Object.assign({}, view, {
          title: view.meta.title || 'no-name'
        })
      )
    },
    ADD_CACHED_VIEW: (state, view) => {
      if (state.cachedViews.includes(view.name)) return
      if (!view.meta.noCache) {
        console.log('ADD_CACHED_VIEW push:' + view.name)
        state.cachedViews.push(view.name)
      }
    },

    DEL_VISITED_VIEW: (state, view) => {
      // console.log('DEL_VISITED_VIEW:' + view.name)
      for (const [i, v] of state.visitedViews.entries()) {
        if (v.path === view.path) {
          state.visitedViews.splice(i, 1)
          break
        }
      }
    },
    DEL_CACHED_VIEW: (state, view) => {
      console.log('DEL_CACHED_VIEW:' + view.name)
      for (const i of state.cachedViews) {
        if (i === view.name) {
          const index = state.cachedViews.indexOf(i)
          state.cachedViews.splice(index, 1)
          break
        }
      }
    },

    DEL_OTHERS_VISITED_VIEWS: (state, view) => {
      // console.log('DEL_OTHERS_VISITED_VIEWS:' + view.name)
      for (const [i, v] of state.visitedViews.entries()) {
        if (v.path === view.path) {
          state.visitedViews = state.visitedViews.slice(i, i + 1)
          break
        }
      }
    },
    DEL_OTHERS_CACHED_VIEWS: (state, view) => {
      console.log('DEL_OTHERS_CACHED_VIEWS:' + view.name)
      for (const i of state.cachedViews) {
        if (i === view.name) {
          const index = state.cachedViews.indexOf(i)
          state.cachedViews = state.cachedViews.slice(index, index + 1)
          break
        }
      }
    },

    DEL_ALL_VISITED_VIEWS: state => {
      // console.log('DEL_ALL_VISITED_VIEWS:')
      state.visitedViews = []
    },
    DEL_ALL_CACHED_VIEWS: state => {
      console.log('DEL_ALL_CACHED_VIEWS:')
      state.cachedViews = []
    },

    UPDATE_VISITED_VIEW: (state, view) => {
      // console.log('UPDATE_VISITED_VIEW:' + view.name)
      for (let v of state.visitedViews) {
        if (v.path === view.path) {
          v = Object.assign(v, view)
          break
        }
      }
    }
  },
  actions: {
    addView({ dispatch }, view) {
      dispatch('addVisitedView', view)
      dispatch('addCachedView', view)
    },
    addVisitedView({ commit }, view) {
      commit('ADD_VISITED_VIEW', view)
    },
    addCachedView({ commit }, view) {
      // [added by tangcj]:路由嵌套大于等于三级，保存第二级之后的view.name TO-TEST:4级嵌套
      const matched = view.matched
      if (matched.length >= 3) {
        for (let i = 1; i < matched.length - 1; i++) {
          const parentView = matched[i]
          commit('ADD_CACHED_VIEW', parentView)
        }
      }
      commit('ADD_CACHED_VIEW', view)
    },

    delView({ dispatch, state }, view) {
      return new Promise(resolve => {
        dispatch('delVisitedView', view)
        dispatch('delCachedView', view)
        resolve({
          visitedViews: [...state.visitedViews],
          cachedViews: [...state.cachedViews]
        })
      })
    },
    delVisitedView({ commit, state }, view) {
      return new Promise(resolve => {
        commit('DEL_VISITED_VIEW', view)
        resolve([...state.visitedViews])
      })
    },
    delCachedView({ commit, state }, view) {
      return new Promise(resolve => {
        // [added by tangcj]:路由嵌套大于等于三级，保存第二级之后的view.name TO-TEST:4级嵌套
        const matched = view.matched
        if (matched.length >= 3) {
          // 查询父View的其他子View是否在CachedViews中，其他子View.name是否包含父View.name
          for (let i = matched.length - 2; i >= 1; i--) {
            const parentView = matched[i] // 父View
            // console.log('parentView.name:' + i)
            // console.log(parentView)
            let canDelete = true
            for (const j of state.cachedViews) {
              // console.log('j: ' + j)
              if (j === parentView.name || j === view.name) {
                continue
              }
              // 其他子View.name包含了父View.name,不允许清理
              if (j.indexOf(parentView.name) > -1) {
                canDelete = false
                break
              }
            }
            if (canDelete) {
              commit('DEL_CACHED_VIEW', parentView)
            } else {
              // 如果当前层级不允许清理，直接跳出循环
              break
            }
          }
        }

        commit('DEL_CACHED_VIEW', view)
        resolve([...state.cachedViews])
      })
    },

    delOthersViews({ dispatch, state }, view) {
      return new Promise(resolve => {
        dispatch('delOthersVisitedViews', view)
        dispatch('delOthersCachedViews', view)
        resolve({
          visitedViews: [...state.visitedViews],
          cachedViews: [...state.cachedViews]
        })
      })
    },
    delOthersVisitedViews({ commit, state }, view) {
      return new Promise(resolve => {
        commit('DEL_OTHERS_VISITED_VIEWS', view)
        resolve([...state.visitedViews])
      })
    },
    delOthersCachedViews({ commit, state }, view) {
      return new Promise(resolve => {
        commit('DEL_OTHERS_CACHED_VIEWS', view)
        resolve([...state.cachedViews])
      })
    },

    delAllViews({ dispatch, state }, view) {
      return new Promise(resolve => {
        dispatch('delAllVisitedViews', view)
        dispatch('delAllCachedViews', view)
        resolve({
          visitedViews: [...state.visitedViews],
          cachedViews: [...state.cachedViews]
        })
      })
    },
    delAllVisitedViews({ commit, state }) {
      return new Promise(resolve => {
        commit('DEL_ALL_VISITED_VIEWS')
        resolve([...state.visitedViews])
      })
    },
    delAllCachedViews({ commit, state }) {
      return new Promise(resolve => {
        commit('DEL_ALL_CACHED_VIEWS')
        resolve([...state.cachedViews])
      })
    },

    updateVisitedView({ commit }, view) {
      commit('UPDATE_VISITED_VIEW', view)
    }
  }
}

export default tagsView
