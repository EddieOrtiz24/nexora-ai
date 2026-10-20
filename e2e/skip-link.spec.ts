import { expect, test } from '@playwright/test'

test('permite saltar al contenido principal y continuar la navegación por teclado', async ({ page }) => {
  await page.goto('/')

  await expect.poll(() => page.evaluate(() => document.activeElement === document.body)).toBe(true)
  const skipLink = page.getByRole('link', { name: 'Saltar al contenido principal' })
  const isCompletelyOutsideViewport = () =>
    skipLink.evaluate((link) => {
      const box = link.getBoundingClientRect()
      const viewportWidth = document.documentElement.clientWidth
      const viewportHeight = document.documentElement.clientHeight

      return box.right <= 0 || box.bottom <= 0 || box.left >= viewportWidth || box.top >= viewportHeight
    })
  await expect.poll(isCompletelyOutsideViewport).toBe(true)
  await page.keyboard.press('Tab')
  await expect(skipLink).toBeFocused()
  await expect(skipLink).toBeVisible()
  await expect(skipLink).toBeEnabled()
  await expect.poll(() =>
    skipLink.evaluate((link) => {
      const box = link.getBoundingClientRect()
      const viewportWidth = document.documentElement.clientWidth
      const viewportHeight = document.documentElement.clientHeight
      // A 1 CSS-pixel epsilon accommodates subpixel layout/rounding at viewport edges.
      const epsilon = 1

      return (
        box.left >= -epsilon &&
        box.top >= -epsilon &&
        box.right <= viewportWidth + epsilon &&
        box.bottom <= viewportHeight + epsilon
      )
    }),
  ).toBe(true)

  await page.keyboard.press('Enter')
  const main = page.locator('#main-content')
  await expect(main).toBeFocused()

  await page.keyboard.press('Tab')
  await expect(main.getByRole('link').first()).toBeFocused()
})
