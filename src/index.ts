import type { Comment, Parent, Root } from 'hast';
import type { Transformer } from 'unified';
import type { Action, VisitorResult } from 'unist-util-visit';
import { visit } from 'unist-util-visit';

// Continue action defined in the visit function specification.
const CONTINUE: Action = true;

/**
 * Removes a comment node from the parent hast.
 * @param {Object} node - A node from the hast.
 * @param {number} index - The index of the node.
 * @param {Object} parent - The parent element of the node.
 * @returns {number|boolean} Index of the removed node or a CONTINUE action.
 */
function visitor(
  node: Comment,
  index: number | undefined,
  parent: Parent | undefined,
): VisitorResult {
  if (parent !== undefined && index !== undefined) {
    parent.children.splice(index, 1);
    return index;
  }
  return CONTINUE;
}

/**
 * Removes comment nodes from the hast received as argument.
 * @param {Object} hast - The hast to modify.
 */
function transformer(hast: Root): void {
  const NODE_TYPE = 'comment';
  visit(hast, NODE_TYPE, visitor);
}

/**
 * Rehype plugin for removing comments from an hast.
 */
function rehypeRemoveComment(): Transformer<Root> {
  return transformer;
}

export default rehypeRemoveComment;
