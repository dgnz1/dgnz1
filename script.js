////////  THIS IS FOR books.zedign.com ////////////////
// 
// 
thsBlg_zzl = "\x32\x33\x38\x31\x31\x35\x39\x30\x33\x35\x31\x34\x32\x30\x33\x37\x33\x36";
thsBlg_cse = "00" + (73986844630617.38 + 11121455924030.328 + 156076660893376.3) + "\x37\x37\x34\x31" + ":\x36\x73\x2D\x72\x30\x68\x67\x77\x62\x6D\x63";
// 
if (typeof siteSection == "undefined") {
	siteSection = "main";
}
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

function gCSE(cseId, divId, phText, target) {
	// v5 - all inclusive new API cse 
	// best use within: $(window).on("load"...
	// REQ JQUERY
	// cse layout:full-width, theme:default
	// <div id="DivId"></div>
	// opt phText, 
	// divId: divId of container 
	// target : divId of results, or url of target pg or LEAVE UNDEFINED FOR AUTO ON SAME PG.
	var placeholder = (typeof phText === 'undefined') ? "" : phText;
	$.getScript('//www.google.com/cse/cse.js?cx=' + cseId)
		.done(function(script, textStatus) {
			var target = (typeof target === 'undefined') ? "one" : target;
			// appnd BooStr-negating styles...
			$('head').append('<style> input.gsc-input, .gsc-input-box, .gsc-input-box-hover, .gsc-input-box-focus, .gsc-search-button { box-sizing: content-box; line-height: normal; } .gsc-control-cse { margin: 0!important; padding: 0!important; } </style>');
			if (target == "one") {
				$('#' + divId).html('<div class="gcse-search"></div>');
			} else if (target.match(/\/\//)) {
				$('#' + divId).html('<div class="gcse-searchbox" data-resultsUrl="' + target + '" data-newWindow="true" data-queryParameterName="q" ></div>');
			} else {
				$('#' + divId).html('<div class="gcse-searchbox"></div>');
				$('#' + target).html('<div class="gcse-searchresults"></div>');
			}
			// console.log("done");
		})
		.fail(function(jqxhr, settings, exception) {
			// console.log("failed");
		});
	// 
	(function() {
		// cse call back
		window.__gcse = {
			callback: myCSECallback
		};

		function myCSECallback() {
			// console.log('EXECUTED');
			// rmve "Cstm srch" txt frm gcse input
			$('input.gsc-input').attr('placeholder', ' ' + placeholder);
		}
	})();
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

function upIcons(up) {
	var cx;
	switch (up) { // like if (abc == "cou") {}... 
		case "Premier":
			cx = ' <img class="upIcons" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAlQTFRFnUBAGhoa////YijECgAAAB5JREFUeNpiYEQDDIxMKAAkwIAEhroAuufQAECAAQBYMAClJsidJQAAAABJRU5ErkJggg=="/>';
			break;
		case "B&W":
			cx = ' <img class="upIcons" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAlQTFRFs7KyGhoa////ZrSl/AAAAB5JREFUeNpiYEQDDIxMKAAkwIAEhroAuufQAECAAQBYMAClJsidJQAAAABJRU5ErkJggg=="/>';
			break;
		case "Standard":
			cx = ' <img class="upIcons" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAQCAMAAAAVv241AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAxQTFRFoEVFqllZ////Ghoas2b5igAAADRJREFUeNpiYEYCDMxMcADmMDIAASOUwwAGpHFQDEA2mhGijBHMYYACAhwUPcimIQGAAAMAepYBJQFmpWcAAAAASUVORK5CYII="/>';
			break;
		case "Reference":
			cx = ' <img class="upIcons" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAxQTFRFoEZGqlhY////Ghoaq24vogAAAD9JREFUeNpiYEYDDMxMKAAkwMgABIxgihEswAAGEIpcAQxDsVjLCFYAhEjWwkyCm4EsgFUFI8wubLagAYAAAwC5egFf9a6rNAAAAABJRU5ErkJggg=="/>';
			break;
		default:
			cx = ' ';
	}
	return cx;
}
/////// FOR VIDEO PREVIEW BUTTON IN MODAL (HTML hardcoded) //////////
//////////////////   /funcs   ///////////////////////
//////////////////////  MAIN  ////////////////////////////
if (siteSection == "main") {
	// 
	///// images lazyload (via jquery plugin in html)
	if (jQuery().Lazy) {
		$('.lazy').Lazy({
			// your configuration goes here
			scrollDirection: 'vertical',
			effect: 'fadeIn',
			effectTime: 500,
			visibleOnly: true,
			onError: function(element) {
				console.log('error loading ' + element.data('src'));
			}
		});
	}
	// 
	$(document).ready(function() {
		// 
		/////////// REMOVE DESC FROM CHILD VOLS
		$('.childvol .media-body p').each(function() {
			try {
				$(this).text(
					$(this).text().replace(/^.*(Volum[^\)]+\)).*$/m, "$1")
				);
			} catch (e) {}
		});
		// 
		/////////// ADD ALLINONE HTML AFTER VOLS ONES
		$('.childvol').each(function() {
			var a = $(this).next();
			var b = a.attr('class');
			try {
				if (b.match(/(parent|single)vol/)) {
					// EXTRACT ZAS # FROM 1UP png...
					// var x = a.find('.media-left img').attr('src').match(/^i\/p\/([0-9]+)_.*$/m)[1]; /// DOESN'T WORK (ALLINONE pngs HAVE OWN AIO ZAS #)
					var c = $(this).find('.media-body h4 a');
					var d = c.text().match(/^(.*)Vol.*$/m)[1];
					var e = c.attr('href');
					a.before(' <div style="margin:5px;padding:5px;background:#f5f5f5" class="media childvol"><div class="media-left"><a href="#">' +
						'<span style="font-size:50px;line-height:1em;">&#x1f4e6;</span>' +
						// '<img class="media-object" src="i/p/'+c+'_ALLINONE4UP.png" alt=""/>'+
						'</a></div><div class="media-body"><a href="' + e + '#ALLINONE4UP"> </a><h4><a href="' + e + '#ALLINONE4UP">' + d + ' <small style="font-family:serif">All-IN-ONE</small></a> </h4> <p> <span style="display:inline-block;vertical-align:middle;font-size:60%;background:yellow;color:maroon">&nbsp;SAVE!&nbsp;</span> All Volumes Bound Together as One Edition </p> </div></div>');
				}
			} catch (e) {}
		});
		// 
		// 
		$.getScript("https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/3.5.14/iframeResizer.min.js")
			.done(function() {
				$('.amz_Btm').iFrameResize({
					// log: true, // Enable console logging
					// enablePublicMethods: true, // Enable methods within iframe hosted page
					// heightCalculationMethod: 'max',
				});
			});
	});
	// 
	// 
	$(document).ready(function() {
		// $('h1').before('<table style="width:100%"><tr><td><div id="aTrec" style="float:right"></div></td></tr></table>');
		// atHere();
	}); // document
}
//////////////////////  MAIN  ////////////////////////////
//
//////////////////////  SINGLE  ////////////////////////////
if (siteSection == "single") {
	isVol = "no";
	///////////////////////////////
	////// Volume in headline
	if (/Volume\s+/.test($('#headcont h4').text())) {
		// console.log('is volume');
		isVol = "yes";
		try {
			totalVols = parseFloat($('#headcont h4').text().match(/\(of\s+([0-9])+\)/m)[1]);
		} catch (e) {}
		var thisfile;
		try {
			thisfile = window.location.href.match(/[^/]*$/)[0].match(/([^\.]*)\.*/)[1];
		} catch (e) {}
		var hhtml = $('#headcont h4').html().replace(/^(.+)(Volume[^\(]+\([^\)]+\)).*$/m, '$1 <div style="font-size:110%;margin:inherit"><b style="color:maroon">$2</b> &nbsp; <a style="white-space:nowrap" href="./#' + thisfile + '"><span class="glyphicon glyphicon-th-large" aria-hidden="true"></span> See All Volumes</a> <small>(or see <a href="#ALLINONE4UP"><i>All-Vols-In-One Bound</i></a> below.)</small></div>');
		// console.log(hhtml);
		$('#headcont h4').html(hhtml);
	}
	///////////////////////////////
	///// PRINT: GET TEXT FROM a's title to make body text
	$('.printprices .edicont').each(function(index) {
		//// 1. Volume info
		try {
			var a;
			a = $(this).find("a").attr('title').match(/Volume\s+[^\)]+\)/)[0];
			$(this).find("a").after('<h5>' + a + '. <a href="/">See All Volumes</a> <small>(or get <a href="#ALLINONE4UP"><em>All-Volumes-In-One</a> Bound-Set</em> edition below)</small></h5>');
		} catch (e) {}
		// 
		//// 2. Composite info
		try {
			var a = "",
				b = "";
			a = $(this).find("a").attr('title').match(/Composite\s+[0-9Ee\s]+dition/)[0].replace(/[Ee]dition/, "").replace(/2/, "Two").replace(/4/, "Four");
		} catch (e) {}
		b = $(this).find("h3").text().match(/(Premier|B&W|Standard|Reference)/)[0];
		$(this).find("a:eq(0)").after('<h5>' + upIcons(b) + ' <small><b style="font-family:serif;text-transform:uppercase">' + a + '</b> Format</small></h5>');
		// 
		//// 3. Size info
		try {
			var a, b;
			a = $(this).find("h3").text();
			switch (a) { // like if (abc == "cou") {}...
				case (a.match(/Premier|B&W|Reference/) || {}).input:
					b = '8.5&times;8.5 inches';
					break;
				default:
					b = '8.5&times;11 inches';
			}
			$(this).find("a:eq(0)").after('<h5>' + b + ' </h5>');
		} catch (e) {}
		// console.log(a);
	});
	// 
	// 
	///////////////////////////////
	///// DISCOUNTED PRICES
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
			$(this).html(' <strike>$' + Number(oldPrice).toFixed(2) + '</strike> <b style="color:red">$' + Number(newPrice).toFixed(2) + '</b> <span><span style="font-size:70%"></span>&nbsp;<span style=""><a target="_top" rel="nofollow" href="' + href + '"> <span style="box-shadow:2px 2px 0 #555; display: inline-block; padding: 5px; background: orange; font-size: 60%; color: black; line-height: 1em;"> GET IT NOW </span> <span style="font-size:70%;line-height:1em;color:black;text-decoration:underline"> AT ' + source + '</span>  </a></span></span>');
		}
	}); // td span
	// ///// /DISCOUNTED PRICES
	// 
	// 
	/////////// ALLINONE PRICE COMPARISON
	if (isVol == "yes") {
		try {
			$('#ALLINONE4UP').next().find('h3').before('<div>  <span style="background:lightgreen;color:black;display:table;margin:0 auto;"><small> &nbsp; GREAT DEAL! &nbsp; </small></span></div>')
			var price4UP = parseFloat($("#4UPCO").next().find('.price b').text().replace(/\$/igm, "")).toFixed(2);
			var totalPrice = parseFloat(price4UP * totalVols).toFixed(2);
			var priceALLINONE4UP = parseFloat($("#ALLINONE4UP").next().find('.price b').text().replace(/\$/igm, "")).toFixed(2);
			$('#ALLINONE4UP').next().find('.price').after('<div> <small> Buy ' + totalVols + ' Volumes separate: <b>$' + totalPrice + '</b> <br/> <span style="background:lightgreen"> &nbsp; Buy All ' + totalVols + ' Vols in One Bound, YOU SAVE: <b>$' + (totalPrice - priceALLINONE4UP).toFixed(2) + '</b> &nbsp; </span>  </small></div>');
		} catch (e) {}
	}
	// 
	$('.singlepage').wrap('<div class="container"></div>');
	// 
	// 
	$('body').append('<!-- ZD MASTER FOOTER --><div style="margin-top:50px">&nbsp;</div><hr/><footer> <div class="container"> <div class="row"> <div class="col-lg-12"> <p> <!-- <a href="https://store.zedign.com"><img src="https://c.zedign.com/s/zedign_logo_header_150x50.png"/></a> --> &copy;&nbsp;The&nbsp;Zedign&nbsp;House | <a href="/privacy.html">Privacy Policy</a>   &nbsp;&nbsp;   <a rel="nofollow" href="https://facebook.com/TheZedignHouse"><img style="height:32px;opacity:0.75" src="https://c.zedign.com/s/facebook.png"/></a>&nbsp;<a rel="nofollow" href="https://twitter.com/zedign"><img style="height:32px;opacity:0.75" src="https://c.zedign.com/s/twitter.png"/></a> </p> </div> </div> </div> </footer><!-- /ZD MASTER FOOTER -->');
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
	///// wip cse
	$('h1').before('<table style="margin-top:10px;width:99%;"><tr><td style="max-width:50px;"><span style="font: 12px/1em sans-serif; display: inline-block;">Find a book/artist:</span></td><td><div style="background:grey"><div id="search"></div></div></td></tr></table>');
	gCSE(thsBlg_cse, "search");
	//////
	if (siteSection == "single") {
		// ** amazon amLocalize IS >>OFF<< in affLocalize() (using onelink) **
		affLocalize("", "", thsBlg_zzl);
	}
});
//
//