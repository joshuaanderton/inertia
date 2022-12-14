import { render } from '@pckg/preact'
import _ from '@pckg/lodash'
import { createInertiaApp } from '@pckg/@inertiajs/inertia-react'
import { InertiaProgress } from '@pckg/@inertiajs/progress'
import initTranslations from '../utils/translations'
import initRoutes from '../utils/routes'

import '@ja-inertia/../css/tailwind.css'

function resolvePage(name: string): any {

  let page = null

  // Check packages for components
  const project = import.meta.glob('@/Pages/**/*.*'),
        jaInertia = import.meta.glob('@ja-inertia/**/Pages/**/*.*')

  const components = {
    ...project,
    ...jaInertia
  }

  for (const path in components) {

    const ext = path.split('.').reverse()[0],
          alias = name.startsWith('@') ? name.split('/')[0] + '/' : ''
          
    if (!path.endsWith(`${name.replace(alias, '')}.${ext}`)) {
      continue
    }

    page = components[path]
    page = typeof page === 'function' ? page() : page
    page = page.default || page

    return page
  }

  throw new Error(`Page not found: ${name}`)
}

createInertiaApp({
  resolve: name => resolvePage(name),
  setup: ({ el, App, props }) => {

    initTranslations(_.get(props, 'initialPage.props.jaInertia.translations', null))
    initRoutes(_.get(props, 'initialPage.props.jaInertia.routes', null))
    
    return render(<App {...props} />, el)

  }
})

InertiaProgress.init(
  JA_INERTIA_OPTIONS.progress
)