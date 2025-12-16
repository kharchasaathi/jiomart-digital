/***************************************************
 * CMS SCHEMA – PART 1
 * Defines how pages & blocks look
 ***************************************************/

/**
 * PAGE STRUCTURE
 * pageId: "home"
 * blocks: [ block, block, block ]
 */

export function createPage(id = "home") {
  return {
    id,
    blocks: [],
    updatedAt: Date.now()
  };
}

/**
 * BLOCK STRUCTURE
 * type: text | image | product
 */
export function createBlock(type) {
  return {
    id: "blk_" + crypto.randomUUID(),
    type,
    data: {},
    createdAt: Date.now()
  };
}
