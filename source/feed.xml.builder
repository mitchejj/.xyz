xml.instruct! :xml, :version => "1.0", :encoding=>"utf-8"
xml.feed "xmlns" => "http://www.w3.org/2005/Atom" do
   ######
   site_url = URI.join("http://www." + data.site.host)
   feed_url = URI.join(site_url, current_page.path)
   site_id = "net.nullog"
   site_author =  data.site.author
   site_author_uri = site_url
   xml.title data.site.title
   xml.subtitle data.site.subtitle

   xml.id "tag:" + site_id + ",2014:" +  current_page.path.to_s.crypt(site_id)
   xml.link "href" => site_url, "rel" => "alternate", "type" => "text/html", "hreflang" => "en"
   xml.link "href" => feed_url, "rel" => "self", "type" => "application/atom+xml", "hreflang" => "en"
   xml.rights "Copyright © 2012 — " + Time.now.strftime("%Y") + " site_author"
   xml.updated Time.now.to_time.iso8601
   xml.author {
      xml.name site_author
      xml.uri site_author_uri }

    blog.articles[0..5].each do |article|
      xml.entry do
         xml.title article.title
         xml.id  "tag:" + site_id + "," + article.date.to_time.strftime("%Y") + ":" +  article.path.to_s.crypt(site_id)
         xml.link "rel" => "alternate", "type" => "text/html", "href" => URI.join(site_url, article.url), "hreflang" => "en"

         xml.published article.date.to_time.iso8601
         xml.updated File.mtime(article.source_file).iso8601
         xml.author {
            xml.name site_author
            xml.uri site_author_uri
         }
         #xml.summary article.summary, "type" => "html"
         xml.content article.body, "type" => "html", "xml:lang" => "en"
      end
   end
end
