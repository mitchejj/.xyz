require 'rubygems'
require 'rack'
require 'rack/contrib/try_static'
require 'rack/contrib/not_found'
require 'middleman/rack'

# run Middleman.server
#`bundle exec middleman build`

THREE_DAYS=259200
ONE_MONTH=2678400
header_rules = [
	[['html'],  {'Content-Type'  => 'text/html; charset=utf-8'}],
	[['css'],   {'Content-Type'  => 'text/css'}],
	[['xml'],   {'Content-Type'  => 'application/atom+xml'}],
	[['js'],    {'Content-Type'  => 'text/javascript'}],
	[['txt'],    {'Content-Type'  => 'text/html'}], #should be text/text
	[['woff'],    {'Content-Type'  => 'application/x-font-woff'}],
	[['ttf'],    {'Content-Type'  => 'application/x-font-ttf'}],
	[['eot'],    {'Content-Type'  => 'application/vnd.ms-fontobject'}],
	[['svg'],    {'Content-Type'  => 'image/svg+xml'}],
	[['png'],   {'Content-Type'  => 'image/png'}],
	['/stylesheets', {'Cache-Control' => "public, max-age=#{ONE_MONTH}"}],
]

use Rack::Head
use Rack::BounceFavicon
use Rack::Deflater
use Rack::TryStatic,
    root: 'tmp',
    urls: %w[/],
    try: %w[.html index.html /index.html],
    :header_rules =>	header_rules
run Rack::NotFound.new('./tmp/404/index.html')

#FIVE_MINUTES=300
#run lambda { |env|
#	not_found_page = File.expand_path('../tmp/404/index.html', __FILE__)
#	content = File.exist?(not_found_page) ? File.read(not_found_page) : '404 - page not found'
##	content_size = content.size.to_s
#
#	return [
#		404,
#		{ 'Content-Type' => 'text/html',
##			'Content-Length' => content_size,
#			'Cache-Control' => "public, max-age=#{FIVE_MINUTES}"
#		}, [content]
#	]
#}
