declare module 'rehype-remove-comment' {
  import type { Root } from 'hast';
  import type { Transformer } from 'unified';

  export default function rehypeRemoveComment(): Transformer<Root>;
}
