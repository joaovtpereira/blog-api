import { expect, test } from 'vitest'

import { Slug } from './slug'

test('create slug from text', () => {
  const slug = Slug.createSlugFromText('HelLo WOrld Test')
  expect(slug.value).toBe('hello-world-test')
})
