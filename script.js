////////  THIS IS FOR books.zedign.com ////////////////
// 
// 
thsBlg_as = '\x70' + 'u' + '\x62\x2D' + '5' + '69\x30' + '2' + '\x3031' + '1' + '33' + '5' + '97' + '2' + '1';
// 
if (typeof siteSection == "undefined") {
	siteSection = "main";
}
// 
//// ----------<pagelevelIfNotHardcoded>---------- //
//// v2
function pagelevelIfNotHardcoded() {
	try {
		var plTag = document.getElementsByTagName("head")[0].getElementsByTagName("script") || 0;
		for (var i = 0; i < plTag.length; i++) {
			if (plTag[i].textContent.match(/enable_page_level_ads/im)) {
				return;
			}
		}
		(adsbygoogle = window.adsbygoogle || []).push({
			google_ad_client: thsBlg_as,
			enable_page_level_ads: true
		});
	} catch (e) {}
}
// 
pagelevelIfNotHardcoded();
////
//// ----------</pagelevelIfNotHardcoded>---------- //
////
// 
// 
/////////////// funcs ////////////////////////
///////////////////  QS   //////////////////
/// qs.get("s") ...
/// if (qs2.contains("q")) {	pkSrQry = qs2.get("q"); }
function sc_qstrng(qs) {
	this.params = {};
	if (qs == null) qs = location.search.substring(1, location.search.length);
	if (qs.length == 0) return;
	qs = qs.replace(/\+/g, ' ');
	var args = qs.split('&');
	for (var i = 0; i < args.length; i++) {
		var pair = args[i].split('=');
		var name = decodeURIComponent(pair[0]);
		var value = (pair.length == 2) ? decodeURIComponent(pair[1]) : name;
		this.params[name] = value;
	}
}
sc_qstrng.prototype.get = function(key, default_) {
	var value = this.params[key];
	return (value != null) ? value : default_;
}
sc_qstrng.prototype.contains = function(key) {
	var value = this.params[key];
	return (value != null);
}
var qs = new sc_qstrng();
///////////////////  /QS   //////////////////
function amzNtv_sync(type, qry, affId, linkId, title, defCat) {
	// v2
	// type: "links"||"custom";
	// qry: string for 'links', csv ASIN list for 'custom'
	// 
	var adType = '';
	var adCat = (defCat === '') ? 'All' : defCat;
	// 
	if (type == 'links') {
		adType = 'amzn_assoc_ad_mode = "search"; ' +
			'amzn_assoc_rows = "4";' +
			'amzn_assoc_design = "text_links";' +
			'amzn_assoc_default_search_phrase = "' + qry + '";' +
			'amzn_assoc_default_category = "' + adCat + '";';
	}
	if (type == 'custom') {
		adType = 'amzn_assoc_search_bar = "false";' +
			' amzn_assoc_ad_mode = "manual";' +
			' amzn_assoc_asins = "' + qry + '"; ';
	}
	// 
	document.write(
		'<script type="text/javascript">' +
		'amzn_assoc_placement = "adunit0";' +
		'amzn_assoc_tracking_id = "' + affId + '";' +
		'amzn_assoc_ad_type = "smart";' +
		'amzn_assoc_marketplace = "amazon";' +
		'amzn_assoc_region = "US";' +
		'amzn_assoc_title = "' + title + '";' +
		'amzn_assoc_linkid = "' + linkId + '";' +
		adType +
		'</script>' +
		'<script src="https://z-na.amazon-adsystem.com/widgets/onejs?MarketPlace=US"></script>' +
		'');
}
//////////////////   /funcs   ///////////////////////
//////////////////////  MAIN  ////////////////////////////
if (siteSection == "main") {
	// 
	$(document).ready(function() {
		var grid = $('.grid');
		grid.infinitescroll({
				// Pagination element that will be hidden
				navSelector: '#pagination',
				// Next page link
				nextSelector: '#pagination p a',
				// Selector of items to retrieve
				itemSelector: '.grid-item',
				// Loading message
				loadingText: 'Loading new items…'
			},
			// Function called once the elements are retrieved
			function(new_elts) {
				var elts = $(new_elts).css('opacity', 0);
				elts.animate({
					opacity: 1
				});
				$.getScript("https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/3.5.14/iframeResizer.min.js")
					.done(function() {
						$('.amz_Btm').iFrameResize({
							// log: true, // Enable console logging
							// enablePublicMethods: true, // Enable methods within iframe hosted page
							// heightCalculationMethod: 'max',
						});
					});
			});
		// a to button
		// $('a[href*=page-]').attr('role','button');
		// $('a[href*=page-]').attr('class','btn btn-default');
	});
	// $(window).on("load", function() {
	// 	$.getScript("https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/3.5.14/iframeResizer.min.js")
	// 		.done(function() {
	// 			$('#amz_Btm').iFrameResize({
	// 				log: true, // Enable console logging
	// 				// enablePublicMethods: true, // Enable methods within iframe hosted page
	// 				// heightCalculationMethod: 'max',
	// 			});
	// 		});
	// });
}
//////////////////////  MAIN  ////////////////////////////
//
//////////////////////  MAIN  ////////////////////////////
if (siteSection == "single") {
	///// discounted prices
	var regex = new RegExp(/\$[0-9]+\.[0-9]+/); // expression here
	$("td span").filter(function() {
		if (regex.test($(this).text())) {
			// var raw = $(this).text();
			var newPrice = parseFloat($(this).text().replace("$", ""));
			var oldPrice = Math.ceil(newPrice + 3.25) - 0.05;
			var href = $(this).parent().prev().find('span a, a').attr('href');
			$(this).html(' <strike>$' + Number(oldPrice).toFixed(2) + '</strike> <b style="color:red">$' + Number(newPrice).toFixed(2) + '</b> <span><span style="font-size:70%">at</span> <span style="font-size:60%"><a target="_top" href="' + href + '">AMAZON</a></span></span>');
		}
	});
}
//////////////////////  MAIN  ////////////////////////////
//
/////////////////    DYN_CATCHER   ///////////////////
// 
if (siteSection == "dyn_catcher") {
	// 
	// 
	if (qs.get("s") == "amz") {
		var qry = decodeURIComponent(qs.get("n"));
		var title = decodeURIComponent(qs.get("a") || "");
		amzNtv_sync(
			'custom', // type
			qry, // qry
			'zdn-20', // affId
			'9732ec60fea4e122cb9626c8ab23caa2', // linkId
			title, // title
			'' // defCat
		);
		$.getScript("https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/3.5.14/iframeResizer.contentWindow.min.js")
			.done(function() {});
	}
	// 
}
// 
/////////////////    /DYN_CATCHER   ///////////////////