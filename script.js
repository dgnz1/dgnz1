////////  THIS IS FOR books.zedign.com ////////////////
// 
// 
thsBlg_as = '\x70' + 'u' + '\x62\x2D' + '5' + '69\x30' + '2' + '\x3031' + '1' + '33' + '5' + '97' + '2' + '1';
thsBlg_zzl = "238115903514203736";
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
function affLocalize(objAmAffIds, strEPNId, strZzlId) {
	// v5
	// req: jq
	function zzlLocalize(strTLD, url) {
		if (strTLD) {
			switch (strTLD) {
				case 'UK':
				case 'JP':
				case 'NZ':
					strTLD = 'co.' + strTLD;
					break;
				case 'AU':
				case 'BR':
					strTLD = 'com.' + strTLD;
					break;
				case 'CA':
				case 'DE':
				case 'ES':
				case 'FR':
				case 'PT':
				case 'SE':
				case 'NL':
				case 'AT':
				case 'CH':
				case 'BE':
					strTLD = strTLD;
					break;
				default:
					strTLD = 'com';
			}
		}
		var affUrl, zProd, zAffTag;
		zProd = parseURL(url.replace(/[\?\&]rf\=[0-9]+/, ""));
		affUrl = 'https://www.zazzle.' + strTLD + zProd.path + zProd.querystring;
		zAffTag = (affUrl.match(/\?/) ? '&rf=' : '?rf=') + strZzlId;
		affUrl = affUrl + zAffTag;
		return affUrl;
	}

	function ebLocalize(strTLD, url) {
		if (strTLD) {
			switch (strTLD) {
				case 'AT':
					cntry = "5221-53469-19255-0";
					icep = "229473";
					break;
				case 'AU':
					cntry = "705-53470-19255-0";
					icep = "229515";
					break;
				case 'BE':
					cntry = "1553-53471-19255-0";
					icep = "229522";
					break;
				case 'CA':
					cntry = "706-53473-19255-0";
					icep = "229529";
					break;
				case 'CH':
					cntry = "5222-53480-19255-0";
					icep = "229536";
					break;
				case 'DE':
					cntry = "707-53477-19255-0";
					icep = "229487";
					break;
				case 'ES':
					cntry = "1185-53479-19255-0";
					icep = "229501";
					break;
				case 'FR':
					cntry = "709-53476-19255-0";
					icep = "229480";
					break;
				case 'IE':
					cntry = "5282-53468-19255-0";
					icep = "229543";
					break;
				case 'IN':
					cntry = "4686-53472-19255-0";
					icep = "229550";
					break;
				case 'IT':
					cntry = "724-53478-19255-0";
					icep = "229494";
					break;
				case 'NL':
					cntry = "1346-53482-19255-0";
					icep = "229557";
					break;
				case 'UK':
					cntry = "710-53481-19255-0";
					icep = "229508";
					break;
				default:
					cntry = "711-53200-19255-0";
					icep = "229466";
			}
		}
		var affUrl = url;
		affUrl = affUrl.replace(/\/[0-9]+\-[0-9]+\-19255\-0\//, '/' + cntry + '/');
		affUrl = affUrl.replace(/vectorid\=[0-9]+/, 'icep_vectorid=' + icep);
		return affUrl;
	}
	// 
	function amLocalize(itmId, strTLD) {
		if (strTLD) {
			switch (strTLD) {
				case 'JP':
					strTLD = 'co.jp';
					break;
				case 'GB':
				case 'JE':
				case 'GG':
				case 'IM':
				case 'IE':
				case 'UK':
					strTLD = 'co.uk';
					break;
				case 'CH':
				case 'AT':
					strTLD = 'de';
					break;
				case 'PT':
					strTLD = 'es';
					break;
				default:
					strTLD = (objAmAffIds[strTLD.toLowerCase()] != null ? strTLD.toLowerCase() : 'com');
					break;
			}
			affId = objAmAffIds[strTLD.toLowerCase()];
		}
		// OneLink Mod  DEL IF NOT USING OneLink <script> in html
		strTLD = (strTLD == 'ca' || strTLD == 'co.uk') ? "com" : strTLD;
		affId = thsBlg_amz.com; ///// default US tag for this site
		// /OneLink Mod
		return "https://www.amazon." + strTLD + "/exec/obidos/ASIN/" + itmId + "/" + affId;
	}
	// 
	function parseURL(href) {
		// v1 returns url parths as given. works with relative ones too.
		var match = href.match(/^(?:(https?\:)\/\/)?(([^:\/?#]*)(?:\:([0-9]+))?)([\/]{0,1}[^?#]*)(\?[^#]*|)(#.*|)$/);
		return match && {
			href: href,
			protocol: match[1],
			host: match[2],
			hostname: match[3],
			port: match[4],
			path: match[5],
			querystring: match[6],
			hash: match[7]
		}
	}
	// 
	$.ajax({
		method: "GET",
		dataType: "json",
		cache: true,
		// kaput
		// url: "https://freegeoip.net/json/" // OR (no HTTPS) // url: "http://api.ipstack.com/186.116.207.169?access_key="+thsBlg_ipsapi+"&output=json&legacy=1"
		// url: "https://geoip.tools/v1/json" // 
		url: "https://freegeoip.app/json/" // new 11/18
	}).done(function(json) {
		try {
			var strTLD = json.country_code;
			// var strTLD = "AU"; // for tstng
			var zzlUrlReg = /zazzle\./;
			var epnUrlReg = /vectorid/;
			var amzUrlReg = RegExp("/([a-zA-Z0-9]{10})(?:[/?]|$)");
			// var amzUrlReg = RegExp("/(?!/e|st)../([A-Z0-9]{10})");
			// "/(?!/e|st)../([A-Z0-9]{10})"
			$('a').each(function(index) {
				var url = unescape($(this).attr('href'));
				// AMZ
				if (url.match(amzUrlReg)) {
					var itmId = url.match(amzUrlReg)[1];
					// console.log(itmId)
					// amLocalize is OFF (USING ONELINK) (uncommnt to enable)
					// $(this).attr('href', amLocalize(itmId, strTLD));
				}
				// EPN
				if (url.match(epnUrlReg)) {
					$(this).attr('href', ebLocalize(strTLD, url));
				}
				// ZZL
				if (url.match(zzlUrlReg)) {
					$(this).attr('href', zzlLocalize(strTLD, url));
				}
			});
			// 
		} catch (e) {}
	}).fail(function(error) {
		// console.log(error);
	});
}
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

function addthis_a(aTid, divId, customUrlTitle, url, title, contId, inStyle, addServHtml) {
	/**
	- V3 - 
	*/
	var addthis_id = aTid;
	var markup = addServHtml;
	//
	if (customUrlTitle == "custom") {
		var customUrlHtml = ' addthis:url="' + url + '" addthis:title="' + title + '" class="addthis_button_';
		try {
			markup = addServHtml.replace(/class\="addthis_button_/gm, customUrlHtml);
		} catch (e) {}
	}
	var html = '<style>' + inStyle + '</style>' +
		'<div id="' + contId + '" class="addthis_toolbox addthis_32x32_style ' + contId + '"> ' + markup + '</div>';
	var addthis_config = addthis_config || {};
	addthis_config.pubid = addthis_id;
	// 
	if (document.getElementById('addthisAsyncScript')) {
		/////////////////////
	} else {
		var addthisScript = document.createElement('script');
		addthisScript.setAttribute('src', '//s7.addthis.com/js/300/addthis_widget.js#domready=1');
		addthisScript.setAttribute('id', 'addthisAsyncScript');
		document.body.appendChild(addthisScript);
	}
	document.getElementById(divId).insertAdjacentHTML("beforeend", html);
	try {
		addthis.toolbox('.' + contId);
	} catch (e) {}
}

function atHere() {
	addthis_a(
		'ra-4f85722b54841026', // aTid REQ
		'aTrec', // divId REQ
		'', // customUrlTitle
		'', // url
		'', // title
		'xyz_aTrec', // contId REQ
		'', // inStyle
		' <a rel="nofollow" class="addthis_button_favorites"></a> <a rel="nofollow" class="addthis_button_email"></a> <a rel="nofollow" class="addthis_button_facebook"></a> <a rel="nofollow" class="addthis_button_twitter"></a> <a rel="nofollow" class="addthis_button_expanded"></a>' // addServHtml
	);
}
/////// FOR VIDEO PREVIEW BUTTON IN MODAL (HTML hardcoded) //////////
function autoPlayYouTubeModal() {
	var trigger = $("body").find('[data-toggle="modal"]');
	trigger.click(function() {
		var theModal = $(this).data("target"),
			videoSRC = $(this).attr("data-theVideo"),
			videoSRCauto = videoSRC + "?autoplay=1&rel=0&cc_load_policy=1";
		$(theModal + ' iframe').attr('src', videoSRCauto);
		$(theModal + ' button.close').click(function() {
			$(theModal + ' iframe').attr('src', videoSRC);
		});
	});
}
/////// FOR VIDEO PREVIEW BUTTON IN MODAL (HTML hardcoded) //////////
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
		// autoPlayYouTubeModal(); // for hardcoded preview button modal
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
	$(document).ready(function() {
		$('h1').before('<table style="width:100%"><tr><td><div id="aTrec" style="float:right"></div></td></tr></table>');
		atHere();
	}); // document
}
//////////////////////  MAIN  ////////////////////////////
//
//////////////////////  SINGLE  ////////////////////////////
if (siteSection == "single") {
	// console.log(window.location.href);
	///// discounted prices
	var regex = new RegExp(/\$[0-9]+\.[0-9]+/); // expression here
	$(".price").filter(function() {
		if (regex.test($(this).text())) {
			// var raw = $(this).text();
			var newPrice = parseFloat($(this).text().replace("$", ""));
			var oldPrice = Math.ceil(newPrice + 3.25) - 0.05;
			var href = $(this).parent().prev().find('span a, a').attr('href');
			switch (href) { // like if (abc == "cou") {}...
				case (href.match(/zedign/) || {}).input:
					zsr = 'ZAZZLE';
					break;
				case (href.match(/patreon/) || {}).input:
					zsr = 'PATREON';
					break;
				case (href.match(/amazon/) || {}).input:
					zsr = 'AMAZON';
					break;
				default:
					zsr = 'AMAZON';
			}
			var source = zsr; //(href.match(/amazon/)) ? 'AMAZON' : 'PATREON';
			$(this).html(' <strike>$' + Number(oldPrice).toFixed(2) + '</strike> <b style="color:red">$' + Number(newPrice).toFixed(2) + '</b> <span><span style="font-size:70%">at</span>&nbsp;<span style="font-size:60%"><a target="_top" rel="nofollow" href="' + href + '">' + source + '</a></span></span>');
		}
	}); // td span
	///////// ppbk xup icons
	$('.printprices div:eq(0)').append(' <img class="upIcons" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAlQTFRFnUBAGhoa////YijECgAAAB5JREFUeNpiYEQDDIxMKAAkwIAEhroAuufQAECAAQBYMAClJsidJQAAAABJRU5ErkJggg=="/>');
	$('.printprices div:eq(1)').append(' <img class="upIcons" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAlQTFRFs7KyGhoa////ZrSl/AAAAB5JREFUeNpiYEQDDIxMKAAkwIAEhroAuufQAECAAQBYMAClJsidJQAAAABJRU5ErkJggg=="/>');
	$('.printprices div:eq(2), .printprices td:eq(8)').append(' <img class="upIcons" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAQCAMAAAAVv241AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAxQTFRFoEVFqllZ////Ghoas2b5igAAADRJREFUeNpiYEYCDMxMcADmMDIAASOUwwAGpHFQDEA2mhGijBHMYYACAhwUPcimIQGAAAMAepYBJQFmpWcAAAAASUVORK5CYII="/>');
	$('.printprices div:eq(3), .printprices td:eq(10)').append(' <img class="upIcons" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAxQTFRFoEZGqlhY////Ghoaq24vogAAAD9JREFUeNpiYEYDDMxMKAAkwMgABIxgihEswAAGEIpcAQxDsVjLCFYAhEjWwkyCm4EsgFUFI8wubLagAYAAAwC5egFf9a6rNAAAAABJRU5ErkJggg=="/>');
	$('head').append('<link href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.4/css/bootstrap.min.css" rel="stylesheet"> <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.4/js/bootstrap.min.js"></script>');
	$('.singlepage').wrap('<div class="container"></div>');
	// 
	// $('body').prepend('<!-- ZD MASTER NAV WITH CSE MODAL (REQ CSE SCRIPT IN HEAD) --> <nav style="background-color:white;border-color:white;" class="navbar navbar-default" role="navigation"> <div class="container"> <div class="navbar-header"> <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1"> <span class="sr-only">Toggle navigation</span> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span> </button> <a class="navbar-brand" style="padding:0;" href="#"><img style="" src="https://c.zedign.com/s/zedign_logo_header_150x50.png" alt=""></a> </div> <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1"> <ul class="nav navbar-nav"> <li> <a href="/">Books</a> </li> <li> <a href="https://store.zedign.com/search/label/zedign-art-posters">Posters</a> </li> <li> <a data-target="#myModal" data-toggle="modal" href="#"><big><span class="glyphicon glyphicon-search" aria-hidden="true"></span></big></a> </li> </ul>  </div>  </div> <hr style="margin:0"/> </nav> <!-- /ZD MASTER NAV -->').append('<!-- CSE Modal --> <div role="dialog" class="modal fade" id="myModal" style="display: none;" aria-hidden="true"> <div class="modal-dialog"> <!-- Modal content--> <div class="modal-content"> <div class="modal-body" style="height:100vh;max-height:calc(100vh - 50px);overflow-y: auto;"> <a style="float:right;margin:10px;" data-dismiss="modal" role="button"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></a> <div class="gcse-searchbox"></div> <div class="gcse-searchresults"></div><!-- this req for res popup --> </div> </div> </div> </div> <!-- /CSE Modal -->');
	// 
	$('body').append('<!-- ZD MASTER FOOTER --><div style="margin-top:50px">&nbsp;</div><hr/><footer> <div class="container"> <div class="row"> <div class="col-lg-12"> <p> <!-- <a href="https://store.zedign.com"><img src="https://c.zedign.com/s/zedign_logo_header_150x50.png"/></a> --> &copy;&nbsp;The&nbsp;Zedign&nbsp;House | <a href="/privacy.html">Privacy Policy</a> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <a rel="nofollow" href="https://facebook.com/TheZedignHouse"><img style="height:32px;opacity:0.75" src="https://c.zedign.com/s/facebook.png"/></a> <a rel="nofollow" href="https://twitter.com/zedign"><img style="height:32px;opacity:0.75" src="https://c.zedign.com/s/twitter.png"/></a> </p> </div> </div> </div> </footer><!-- /ZD MASTER FOOTER -->');
	// 
	// 
	$(document).ready(function() {
		// autoPlayYouTubeModal(); // for hardcoded preview button modal
		// $('h3').after('<table style="width:100%"><tr><td><div id="aTrec" style="float:right"></div></td></tr></table>');
		// atHere();
	}); // document
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
////////////////
///////////////
$(window).on("load", function() {
	if (siteSection == "single") {
		// ** amazon amLocalize IS >>OFF<< in affLocalize() (using onelink) **
		affLocalize("", "", thsBlg_zzl);
	}
});
//
//