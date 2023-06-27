import { describe, it } from 'vitest';
import { fileURLToPath } from 'node:url';
import { setup, $fetch } from '@nuxt/test-utils-edge';

describe('spa', async () => {
  await setup({
    rootDir: fileURLToPath(new URL('./fixture', import.meta.url)),
  });

  it('renders the index page', async () => {
    const html = await $fetch('/');
    // const button = html.getElementsByClassName('target_btn');
    const title = screen.getByLabelText('グラフ');
    console.log(title);
    expect(title).toBe();
  });
});
