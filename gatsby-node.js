const _ = require("lodash")
const Promise = require("bluebird")
const path = require("path")
const select = require(`unist-util-select`)
const fs = require(`fs-extra`)

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators

  return new Promise((resolve, reject) => {
    const pages = []
    const blogPost = path.resolve("./src/templates/blog-post.js")
    resolve(
      graphql(
        `
      {
        allMarkdownRemark(limit: 10000) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                path
              }
            }
          }
        }
      }
    `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        // Create blog posts pages.
        _.each(result.data.allMarkdownRemark.edges, edge => {
          createPage({
//            path: edge.node.fields.slug, // required
              path: edge.node.frontmatter.path,        
            component: blogPost,
            context: {
              slug: edge.node.fields.slug,
            },
          })
        })
      })
    )
  })
}

// Add custom slug for blog posts to both File and MarkdownRemark nodes.
exports.onCreateNode = ({ node, boundActionCreators, getNode }) => {
  const { createNodeField } = boundActionCreators
  if (node.internal.type === `File`) {
    const parsedFilePath = path.parse(node.relativePath)
    const normalizeFilePath =  path.normalize(node.relativePath)
    const slug = `/${normalizeFilePath}/`
    createNodeField({ node, fieldName: `slug`, fieldValue: slug })
  } else if (node.internal.type === `MarkdownRemark`) {
    const fileNode = getNode(node.parent)
    createNodeField({
      node,
      fieldName: `slug`,
      fieldValue: fileNode.fields.slug,
    })
  }
}
