import React from 'react'
import Link from 'gatsby-link'
import { siteMetadata } from '../../gatsby-config'
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'

function Qtime(props) {
  const RFC3339 = 'YYYY-MM-DDTHH:mm:ssZ'
  return (
    <time className="small">{format(props.date, 'YYYY-MM-DD')}</time>
  )
}
function SubTitle(props) {
    return (
        <h2 className="mute">{props.subtitle}</h2> 
    )
}


export default class SiteHeader extends React.Component {
    /*static propTypes = {
        pathName: PropTypes.string,
        pageTitle: PropTypes.string,
        date: PropTypes.string,
    }*/
    static defaultProps = {
        path: '/',
        pageTitle: null,
        subtitle: null,
        date: null,
  }
    render() {
        const pathName = this.props.path
        const pageTitle = this.props.pageTitle
        const subtitle = this.props.subtitle
        const date = this.props.date
        const timeAgo = distanceInWordsToNow(date, {addSuffix: true})
        /* <div className="mobileHide">
                {date && distanceInWordsToNow(date, { addSuffix: true })}</div>
        */
        let header
        
        if (pathName === '/') {
            header = (
                <h1 className="reset siteName h2"><Link to={'/'} >
                {siteMetadata.title}
                </Link>
            </h1>      
            )}
        else {
            header = (
                <h2 className="reset siteName h3"><Link to={'/'} >
                   2 {siteMetadata.title}
                    </Link></h2>
            )}

        return (
            <div className=" reset">
                {header}
            </div>
            
        )
    }

}
/*
export const pageQuery = graphql`
fragment PostDetails on BlogPostByPath {
    meta {
          description
          image {
            url
            caption
            link
          }
}

in BlogPostByPath insert ...PostDetails
*/