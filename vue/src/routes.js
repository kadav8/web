export default [
  { path: '/', component: require('./pages/HomePage.vue') },
  { path: '/trackings', redirect: 'trackings/projects' },
  { path: '/trackings/projects', component: require('./pages/ProjectsPage.vue') },
  { path: '/trackings/issues', component: require('./pages/IssuesPage.vue') },
  { path: '/trackings/project/:id', name: "toproject", component: require('./pages/ProjectPage.vue') },
  { path: '/trackings/issue/:id', name: "toissue", component: require('./pages/IssuePage.vue') },
  { path: '/people', redirect: 'people/me' },
  { path: '/people/me', component: require('./pages/MePage.vue') },
  { path: '/people/users', component: require('./pages/UsersPage.vue') },
  { path: '*', redirect: '/' }
]