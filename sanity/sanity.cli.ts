import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || '5fxm68gv',
    dataset: process.env.SANITY_STUDIO_DATASET || 'staging'
  }
})