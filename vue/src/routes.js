export default [
  { path: '/', component: require('./pages/HomePage.vue') },
  { path: '/trackings', redirect: 'trackings/projects' },
  { path: '/trackings/projects', component: require('./pages/ProjectsPage.vue') },
  { path: '/trackings/issues', component: require('./pages/IssuesPage.vue') },
  { path: '/trackings/project/:id', name: "toproject", component: require('./pages/ProjectPage.vue') },
  { path: '/trackings/issue/:id', name: "toissue", component: require('./pages/IssuePage.vue') },
  { path: '/users', redirect: 'users/admins' },
  { path: '/users/admins', component: require('./pages/TodoPage.vue') },
  { path: '*', redirect: '/' }
]