import React from "react"
import Helmet from "react-helmet"
import Link from "gatsby-link"
import get from "lodash/get"
import '../css/base.css'

import Bio from "../components/Bio"
import SiteHeader from '../components/SiteHeader'
import { Text, Heading, Provider, Divider, Flex, Box , Image} from 'rebass'



class BlogPostTemplate extends React.Component {
  render() {

    const post = this.props.data.markdownRemark
    const siteTitle = get(this.props, "data.site.siteMetadata.title")
    return (

                <Flex wrap >
        <Box p={2} width={1, 1/4}>
          <SiteHeader pageTitle={post.frontmatter.title} date={post.frontmatter.date} path={this.props.location.pathname} />
    
        </Box>
        <Box p={2} width={1,3/4}>
        <article>
          <Helmet title={`${post.frontmatter.title} | ${siteTitle}`} />
          <Image src={post.frontmatter.meta.image.url} />  
          <Text className="markdown" dangerouslySetInnerHTML={{ __html: post.html }} />
        </article>
        </Box>
      </Flex> 

    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      id
      html
      frontmatter {
        path
        title
        date
        meta {
          description
          image {
            url
            caption
            link
          }
        }
      }
    }
  }
`