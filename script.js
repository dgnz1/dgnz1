////////  books.zedign.com ////////////////
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

function viewport(percentage, property) {
	// v2 (vmax) - returns viewport % in pixels
	// property='vw','vh','vmax', usage: viewport(40, "vh")+'px';
	var w = Math.round((Math.max(document.documentElement.clientWidth, window.innerWidth || 0)) * percentage / 100);
	var h = Math.round((Math.max(document.documentElement.clientHeight, window.innerHeight || 0)) * percentage / 100);
	if (property == "vw") {
		return w;
	}
	if (property == "vh") {
		return h;
	}
	if (property == "vmax") {
		if (w > h) {
			return w;
		}
		if (h > w) {
			return h;
		}
		if (w == h) {
			return w;
		}
	}
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

function amzlinkify(asin, edition) {
	return ' <a style="font-size:10px;padding:5px;margin-left:7px;" rel="nofollow" href="https://www.amazon.com/dp/' + asin + '/ref=nosim?tag=zdn-20" type="button" class="btn btn-default btn-xs"> ' + edition + ' </a>   ';
	// <a href = "https://www.amazon.com/dp/' + asin + '/ref=nosim?tag=zdn-20" > ' + edition + ' </a>
}
/////// FOR VIDEO PREVIEW BUTTON IN MODAL (HTML hardcoded) //////////
function scRollToTopButton() {
	document.body.scrollTop = 0; // For Safari
	document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}
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
		///////
		$('h4 a').each(function(index) {
			var h4 = $(this).text().trim().replace(/([\s—\-]+Paintings & Drawings|[\s—\-]+The Paintings)/, "");
			$(this).html(h4);
			// 
		});
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
					a.before(' <div style="" class="media childvol jq_allinonevol"><div class="media-left"><a href="#">' +
						'<span style="font-size:50px;line-height:1em;">&#x1f4e6;</span>' +
						// '<img class="media-object" src="i/p/'+c+'_ALLINONE4UP.png" alt=""/>'+
						'</a></div><div class="media-body"><a href="' + e + '#ALLINONE4UP"> </a><p><b><a href="' + e + '#ALLINONE4UP">' + d + ' <small style="font-family:serif;color:black">All-IN-ONE</small></a></b> <span style="vertical-align:middle;font-size:60%;background:yellow;color:maroon">&nbsp;SAVE!&nbsp;</span> <span style="font-size:90%">All Volumes Bound Together as One Print Edition </span> </p> </div></div>');
				}
			} catch (e) {}
		});
		//////////
		//////// jq_multivolwrap //////////////
		$('.media').each(function(index) {
			try {
				//// 1. get all .vol1
				if ($(this).hasClass("vol1")) {
					var thsId = "jq_multivol" + index;
					///// create a jq_multivolwrap div before it
					$(this).before('<div style="margin-top:15px" id="' + thsId + '" class="jq_multivolwrap"></div>');
					//// move all .childvols into jq_multivolwrap, DO IT for maximum number of vols (4?) plus allinone div
					$(this).next(".childvol").appendTo("#" + thsId); //// vol1
					$(this).next(".childvol").appendTo("#" + thsId); //// vol2
					$(this).next(".childvol").appendTo("#" + thsId);
					$(this).next(".childvol").appendTo("#" + thsId);
					$(this).next(".childvol").appendTo("#" + thsId); /// allinone
					//// 4. now prepend vol1 on top of them
					$(this).prependTo("#" + thsId);
				}
			} catch (e) {}
		});
		//// put all headlines together after vol1's headline
		$('.jq_multivolwrap').each(function(index) {
			try {
				$(".vol2 h4", this).after($(".vol3 h4", this));
				$(".vol1 h4", this).after($(".vol2 h4", this));
				//// 6. remove Volume 1 (of x) text and bold h4 headline
				var text = $(".vol1 p", this).text().replace(/Volume.*/, "");
				$(".vol1 p", this).html(text);
				var head = $(".vol1 h4:nth-child(1) a", this).text().replace(/(.*)(Vol.*)$/, "<b><i>$2</i></b> : $1");
				$(".vol1 h4:nth-child(1) a", this).html(head);
				var head = $(".vol1 h4:nth-child(2) a", this).text().replace(/(.*)(Vol.*)$/, "<b><i>$2</i></b> : $1");
				$(".vol1 h4:nth-child(2) a", this).html(head);
				var head = $(".vol1 h4:nth-child(3) a", this).text().replace(/(.*)(Vol.*)$/, "<b><i>$2</i></b> : $1");
				$(".vol1 h4:nth-child(3) a", this).html(head);
				//// remove link from image (which goes to vol1 page)
				$(".vol1 .media-left > a", this).removeAttr('href');
			} catch (e) {}
		});
		//// remove all vol 2 and 3
		$(".vol2,.vol3").remove();
		//////// /jq_multivolwrap //////////////
		// 
		///// buy dir links
		/// single volume
		$('.singlevol').each(function(index) {
			try {
				var data_eb = $("h4", this).attr("data-eb").trim();
				data_eb = data_eb.match(/.+/) ? amzlinkify(data_eb, '<span class="glyphicon glyphicon-phone" aria-hidden="true"></span> DIGITAL ') : "";
				// 
				var data_2u = $("h4", this).attr("data-2u").trim();
				data_2u = data_2u.match(/.+/) ? amzlinkify(data_2u, ' <span class="glyphicon glyphicon-book" aria-hidden="true"></span> PRINT ' + upIcons("Standard")) : "";
				// 
				var data_4u = $("h4", this).attr("data-4u").trim();
				data_4u = data_4u.match(/.+/) ? amzlinkify(data_4u, ' <span class="glyphicon glyphicon-book" aria-hidden="true"></span> PRINT ' + upIcons("Reference")) : "";
				// 
				var data_zzcol = $("h4", this).attr("data-zzcol").trim();
				data_zzcol = data_zzcol.match(/.+/) ? '  <b>&bull;<b> <a style="font-size:9px;padding:5px;" rel="nofollow" href="https://www.zazzle.com/collections/' + data_zzcol + '?rf=238115903514203736" type="button" class="btn btn-default btn-xs">POSTERS</a>' : "";
				// 
				$(".media-body", this).after('<div style="margin:0 auto;display:table;">' +
					'<div style="display:table;margin:5px auto;font-size:8px"> ——&nbsp;&nbsp;BUY NOW&nbsp;&nbsp;—— </div> ' +
					data_eb +
					data_4u +
					data_2u +
					data_zzcol +
					'</div>');
				// 
			} catch (e) {}
		});
		//// wip
		//// multi vols
		$('.vol1 h4, .vol2 h4, .vol3 h4').each(function(index) {
			// $(this).attr('style', 'outline:solid 1px red');
			// 
			var data_eb = $(this).attr("data-eb").trim();
			data_eb = data_eb.match(/.+/) ? amzlinkify(data_eb, '<span class="glyphicon glyphicon-phone" aria-hidden="true"></span> DIGITAL ') : "";
			// 
			// 
			var data_2u = $(this).attr("data-2u").trim();
			data_2u = data_2u.match(/.+/) ? amzlinkify(data_2u, ' <span class="glyphicon glyphicon-book" aria-hidden="true"></span> PRINT ' + upIcons("Standard")) : "";
			// 
			var data_4u = $(this).attr("data-4u").trim();
			data_4u = data_4u.match(/.+/) ? amzlinkify(data_4u, ' <span class="glyphicon glyphicon-book" aria-hidden="true"></span> PRINT ' + upIcons("Reference")) : "";
			// 
			var data_zzcol = $(this).attr("data-zzcol").trim();
			data_zzcol = data_zzcol.match(/.+/) ? '  <b>&bull;<b> <a style="font-size:9px;padding:5px;" rel="nofollow" href="https://www.zazzle.com/collections/' + data_zzcol + '?rf=238115903514203736" type="button" class="btn btn-default btn-xs">POSTERS</a>' : "";
			// 
			$(this).after('<div style="margin:0 auto;display:table;">' +
				'<div style="display:table;margin:5px auto;font-size:8px"> ——&nbsp;&nbsp;BUY NOW&nbsp;&nbsp;—— </div> ' +
				data_eb +
				data_4u +
				data_2u +
				data_zzcol +
				'</div>');
			//
			//////
			///
		});
		/////
		//// ALLINONE jq_allinonevol
		$('.jq_allinonevol').each(function(index) {
			var data_a2 = $(this).parent().find("h4").attr("data-a2").trim();
			data_a2 = data_a2.match(/.+/) ? amzlinkify(data_a2, ' <span class="glyphicon glyphicon-book" aria-hidden="true"></span> PRINT ' + upIcons("Standard")) : "";
			// 
			var data_a4 = $(this).parent().find("h4").attr("data-a4").trim();
			data_a4 = data_a4.match(/.+/) ? amzlinkify(data_a4, ' <span class="glyphicon glyphicon-book" aria-hidden="true"></span> PRINT ' + upIcons("Reference")) : "";
			// // // 
			$(this).append('<div style="margin:0 auto;display:table;">' +
				'<div style="display:table;margin:5px auto;font-size:8px"> ——&nbsp;&nbsp;BUY NOW&nbsp;&nbsp;—— </div> ' +
				data_a2 +
				data_a4 +
				'</div>');
			//
			//////
			///
		});
		// 
		$.getScript("https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/3.5.14/iframeResizer.min.js")
			.done(function() {
				$('.amz_Btm').iFrameResize({
					// log: true, // Enable console logging
					// enablePublicMethods: true, // Enable methods within iframe hosted page
					// heightCalculationMethod: 'max',
				});
			});
		// 
		// 
		/////////////////////////////////////////////
		/////////// FEEDBACK MODAL BUTTON ///////////
		/////////////////////////////////////////////
		// 
		$.getScript("common/modallink/jquery.modalLink-1.0.0.js")
			.done(function() {
				$('head').append('<link rel="stylesheet" href="common/modallink/jquery.modalLink-1.0.0.css">');
				// 
				$('#headerbanner').prepend('<a style="font-size:11px;position:absolute;right:10px;top:15px;z-index:2;opacity:0.7" role="button" class="btn btn-default btn-xs navbar-btn modal-link" href="c/?s=fdbk" class="modal-link" > <strong> Contact </strong> </a>');
				// 
				$(".modal-link").modalLink({
					width: viewport(85, 'vw'),
					height: viewport(75, 'vh'),
					showTitle: true,
					showClose: true,
					overlayOpacity: 0.6,
					method: "GET", // GET, POST, REF, CLONE
					disableScroll: true,
					onHideScroll: function() {},
					onShowScroll: function() {}
				});
			});
		// 
		// 
		/////////////////////////////////////////////
		/////////// /FEEDBACK MODAL BUTTON ///////////
		/////////////////////////////////////////////
		// 
		// 
		// 
	}); //// $(document).ready
	// 
	// 
	/////////////////////////////////////////////
	/////////// SEARCH ON PAGE ///////////
	/////////////////////////////////////////////
	try {
		document.getElementById('books_table').insertAdjacentHTML("beforebegin", '<table style="margin:10px auto"> <tr><td><input class="form-control" type="text" id="link_id"> </td><td><input onkeypress="return event.keyCode != 13;" class="btn btn-default" type="button" id="link" value="Search" onClick="javascript:goTo()"></td></tr> </table>');
		/// disable enter key on 
	} catch (e) {}
	// $('#books_table').before();
	function findString(str) {
		if (parseInt(navigator.appVersion) < 4) return;
		var strFound;
		if (window.find) { // if supported
			strFound = self.find(str);
			if (!strFound) {
				strFound = self.find(str, 0, 1);
				while (self.find(str, 0, 1)) continue;
			}
		}
		if (!strFound) {
			// alert("String '" + str + "' not found!");
		}
		return;
	}
	////////
	function goTo() {
		try {
			var str = document.getElementById('link_id').value;
			findString(str);
		} catch (e) {}
	}
	/////////////////////////////////////////////
	/////////// /SEARCH ON PAGE ///////////
	/////////////////////////////////////////////
	// 
	/////////////////////////////////////////////
	/////////// SCROLL TO TOP BUTTON ///////////
	/////////////////////////////////////////////
	//// v1
	document.getElementsByTagName('head')[0].insertAdjacentHTML("beforeend", '<style> #scRollToTopButton { display: none; position: fixed; bottom: 20px; right: 30px; z-index: 99; border: none; outline: none; background-color: #555; color: white; cursor: pointer; padding: 5px; border-radius: 10px; font-size: 26px; line-height:1em; opacity:0.7; } #scRollToTopButton:hover { background-color: #555; } </style>');
	document.getElementsByTagName('body')[0].insertAdjacentHTML("beforeend", ' <button onclick="scRollToTopButton()" id="scRollToTopButton" title="Go to top">&#128285;</button>');
	//Get the button:
	scTTBtn = document.getElementById("scRollToTopButton");
	// When the user scrolls down 20px from the top of the document, show the button
	window.onscroll = function() {
		if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
			scTTBtn.style.display = "block";
		} else {
			scTTBtn.style.display = "none";
		}
	};
	// When the user clicks on the button, scroll to the top of the document
	/////////////////////////////////////////////
	/////////// /SCROLL TO TOP BUTTON ///////////
	/////////////////////////////////////////////
	// 
	// 
	//
	// $(document).ready(function() {
	// $(window).on("load", function() {
	// }); // document
}
//////////////////////  MAIN  ////////////////////////////
//
//////////////////////  SINGLE  ////////////////////////////
if (siteSection == "single") {
	///////// remove paintings and drawing from title
	try {
		var headtext = $('h1').text().replace(/(.\s+Paint.*|.\s+The\s+Paint.*)/im, "").trim();
		// console.log(headtext);
		$('h1').html(headtext);
	} catch (e) {}
	//////// breadcrumbs
	$('h1').before('<div class="breadcrumbs" style="font-size:110%;margin-top:1em;margin-bottom:-1em;"> <a style="text-decoration:underline;" href="/">All Masters</a>  &gt; </div>');
	///////////
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
		var hhtml = $('#headcont h4').html().replace(/^(.+)(Volume[^\(]+\([^\)]+\)).*$/m, '$1 <div style="font-size:110%;margin:inherit"><b style="color:maroon">$2</b> &nbsp; ' +
			// 
			'<a style="white-space:nowrap" href="../#zas' + thisfile + '"><span class="glyphicon glyphicon-th-large" aria-hidden="true"></span> See All Volumes</a>' +
			// 
			'<!-- <small>(or see <a href="#ALLINONE4UP"><i>All-Vols-In-One Bound</i></a> below.)</small> --> ' +
			'</div>'
		);
		// console.log(hhtml);
		$('#headcont h4').html(hhtml);
	}
	///////////////////////////////
	///// PRINT: GET TEXT FROM a's title to make body text
	$('.printprices .edicont, #edicont_ebook').each(function(index) {
		//// 1. Volume info: (of 2) and linkify
		try {
			var a;
			a = $(this).find("a").attr('title').match(/Volume\s+[^\)]+\)/)[0];
			// console.log(a, thisfile);
			var ccc = a.replace(/^(.*)(\(.*\))$/, '$1 <a style="text-decoration:underline;font-weight:bold;" href="../#zas' + thisfile + '">$2</a>');
			$(this).find("a").after(
				// 
				'<h5>' + ccc + '. ' +
				// '<a href="../#zas' + thisfile + '">See All Volumes</a> ' +
				// '<!--<small>(or get <a href="#ALLINONE4UP"><em>All-Volumes-In-One</a> Bound-Set</em> edition below)</small> --> '+
				'</h5>'
			);
		} catch (e) {}
		// 
		//// 2. Composite info
		try {
			var a = "",
				b = "";
			a = $(this).find("a").attr('title').match(/Composite\s+[0-9Ee\s]+dition/)[0].replace(/[Ee]dition/, "").replace(/2/, "Two").replace(/4/, "Four");
			b = $(this).find("h3").text().match(/(Premier|B&W|Standard|Reference)/)[0];
			$(this).find("a:eq(0)").after('<h5>' + upIcons(b) + ' <small><b style="font-family:serif;text-transform:uppercase">' + a + '</b> Format</small></h5>');
		} catch (e) {}
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
			if ($(this).attr('id') !== "edicont_ebook") {
				/// no size on ebook
				$(this).find("a:eq(0)").after('<h5>' + b + ' </h5>');
			}
		} catch (e) {}
		// console.log(a);
		////////// PRINT PREVIEW LINK
		try {
			if ($(this).attr('id') !== "edicont_ebook") {
				// console.log($('a:eq(0)', this).attr('href').match(/.+dp\/([^\/]+)\/.+/)[1]);
				var ppASIN = $('a:eq(0)', this).attr('href').match(/.+dp\/([^\/]+)\/.+/)[1].trim() || "";
				if (ppASIN.match(/.../)) {
					$('h3:eq(0)', this).prepend('<span style="display:block;position:relative;left:0;top:0;"><a style="" rel="nofollow" href="https://www.amazon.com/gp/reader/' + ppASIN + '/?tag=zdn-20&asin=' + ppASIN + '&revisionId=&format=4&depth=1#reader-link" type="button" class="btn btn-default btn-xs">PREVIEW &gt; </a></span>');
				}
				// 
			}
		} catch (e) {}
		///////////
		///////////
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
			var oldPrice = Math.ceil(newPrice + 4.25) - 0.05;
			// 
			// ADJ PBK PRICE
			// 
			try {
				var editionPrice = $(this).parent().parent().parent().attr('class'); /// price is for what eb/pb/etc 
				if (editionPrice == "printprices") {
					// oldPrice = Math.ceil(newPrice + ((newPrice * 33) / 100)) - 0.05;
					oldPrice = Math.ceil(newPrice + 11.25) - 0.05;
				}
			} catch (e) {}
			// /ADJ PBK PRICE
			// 
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
			$(this).html(
				// 
				'<div style="float:right; text-align:center;background: #eee; display: table; padding: 10px;">' +
				// 
				'<strike>$' + Number(oldPrice).toFixed(2) + '</strike>&nbsp;' +
				'<b style="color:#b12704">$' + Number(newPrice).toFixed(2) + '</b> ' +
				'<br/><a style="font-weight:bold;margin-left:7px;background: orange;" rel="nofollow" href="' + href + '" type="button" class="btn btn-default">GET IT NOW</a> ' +
				'<br/><span style="font-size:70%;line-height:1em;"> AT ' + source + '</span> ' +
				// 
				'</div>' +
				// 
				'');
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
			$('#ALLINONE4UP').next().find('.price').after(
				'<div> ' +
				'<small> ' + totalVols + ' Volumes separate: ' +
				'<b>$' + totalPrice + '</b>' +
				'<br/>' +
				'<span style="">All ' + totalVols + ' Vols in One Bound, YOU SAVE: ' +
				'<b>$' + (totalPrice - priceALLINONE4UP).toFixed(2) + '</b>' +
				' &nbsp; </span>  ' +
				'</small>' +
				'</div>'
			);
		} catch (e) {}
	}
	// 
	$('.singlepage').wrap('<div class="container"></div>');
	// 
	// 
	$('body').append('<!-- ZD MASTER FOOTER --><div style="margin-top:50px">&nbsp;</div><hr/><footer> <div class="container"> <div class="row"> <div class="col-lg-12"> <p> <!-- <a href="https://store.zedign.com"><img src="https://c.zedign.com/s/zedign_logo_header_150x50.png"/></a> --> &copy;&nbsp;The&nbsp;Zedign&nbsp;House | <a href="/privacy.html">Privacy Policy</a> ' +
		// ' &nbsp;&nbsp;   <a rel="nofollow" href="https://facebook.com/TheZedignHouse"><img style="height:32px;opacity:0.75" src="https://c.zedign.com/s/facebook.png"/></a>' +
		'&nbsp;&nbsp;&nbsp;<a rel="nofollow" href="https://twitter.com/zedign"><img style="height:32px;opacity:0.75" src="https://c.zedign.com/s/twitter.png"/></a> </p> </div> </div> </div> </footer><!-- /ZD MASTER FOOTER -->');
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
	if (qs.get("s") == "fdbk") {
		// 
		function formSubmit() {
			// alert('hello');
			// return false;
			//// join all fields in one to send
			$('#entry_703433844').val((
				$('input[name*="wikipedia_url"] ').val() +
				$('input[name*="namea"] ').val() +
				$('input[name*="emaila"] ').val() +
				$('input[name*="namec"] ').val() +
				$('input[name*="emailc"] ').val() +
				', ' + $('textarea[name*="messagec"] ').val()
				// 
			).trim());
			/// testing
			// alert(new URLSearchParams(new FormData(document.getElementById('fdbk'))).toString());
			// 
			// $('input[name*="group"] ').remove();
			// $('input[name*="wikipedia_url"] ').remove();
			// $('input[id*="name"] ').remove();
			// $('input[id*="email"] ').remove();
			// 
			$('form').trigger('goForward'); // api call for slideform to go forward to the last "thank you" slide
			return true;
		}
		// 
		$.getScript("../common/slideform/js/slideform.js")
			.done(function() {
				$.getScript("https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.17.0/jquery.validate.min.js")
					.done(function() {
						$.getScript("https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.17.0/additional-methods.min.js")
							.done(function() {
								var gdf = "\x68\x74\x74\x70\x73\x3A\x2F\x2F\x64\x6F\x63\x73\x2E\x67\x6F\x6F\x67\x6C\x65\x2E\x63\x6F\x6D\x2F\x66\x6F\x72\x6D\x73\x2F\x64\x2F\x65\x2F\x31\x46\x41\x49\x70\x51\x4C\x53\x63\x31\x79\x47\x32\x71\x79\x78\x4D\x76\x41\x76\x4B\x5A\x4F\x44\x78\x4A\x4B\x6E\x30\x6A\x4B\x37\x57\x4D\x2D\x76\x49\x73\x43\x57\x31\x34\x64\x44\x57\x7A\x30\x36\x2D\x46\x70\x6F\x7A\x35\x6C\x67\x2F\x66\x6F\x72\x6D\x52\x65\x73\x70\x6F\x6E\x73\x65";
								//place your code here, the scripts are all loaded
								$('head').append(
									'<link rel="stylesheet" href="../common/slideform/css/slideform.css">' +
									'<style>html, body { font-family:sans-serif; height: 100%; width: 100%; padding: 0; margin: 0; overflow: hidden; position: fixed; top: 0; bottom: 0; left: 0; right: 0; }</style>' +
									'');
								$('body').prepend('' +
									// 
									'<iframe name="OUR_hidden_iframe" id="OUR_hidden_iframe" style="display:none;" onload=""></iframe> ' +
									//  onsubmit="doit();"  
									'<form onsubmit="formSubmit();" action="' + gdf + '" name="unique_frm_name" id="fdbk" target="OUR_hidden_iframe">' +
									//
									////// first slide must be an intro for this thing to work
									'<div class="slideform-slide"> <div class="slideform-group">' +
									'<h1>Contact us </h1>' +
									'<p>Please use this form to contact us.</p>' +
									'</div> </div>' +
									// 
									// 1. menu
									'<div class="slideform-slide"> <div class="slideform-group">' +
									'<h2>Reason for contacting: </h2>' +
									'<h3>Please select one</h3>' +
									'<div class="options options-buttons">' +
									// Q1
									'<label for="" > <input type="radio" name="group1" value="reasona"> <span>Request to make a new Zedign Art Series book of a master\'s work not currently part of the series. </span> </label>' +
									// Q3
									'<label for="" > <input type="radio" name="group1" value="reasonc"> <span>Hire us to make a book for you</span> </label>' +
									// Q2
									'<label for="" onclick="window.top.location.href=\'https://art.zedign.com/order/\';return false;" > <input type="radio" name="group1" value="reasonb"> <span>Request a poster from an image </span> </label>' +
									// 
									'</div> </div> </div>' +
									// 
									// 2. sub menu
									'<div class="slideform-slide"> <div class="slideform-group">' +
									// Q1
									'<div data-condition="input.group1 == \'reasona\'">' +
									'<h2>Which Artist</h2><p>Enter a wikipedia URL (e.g. <a target="_blank" href="https://en.wikipedia.org/wiki/Claude_Monet">https://en.wikipedia.org/wiki/Claude_Monet</a>)</p>' +
									'<label><input data-msg="Please enter valid wikipedia url" pattern=".+[Ww]ikipedia.+" type="text" name="wikipedia_url" placeholder="URL"></label>' +
									'</div>' +
									// Q2
									'<div data-condition="input.group1 == \'reasonc\'">' +
									'<h2>Hire us for less</h2><p>If you\'re an artist with a portfolio of works of art, and wish to have it published in digital and paper formats… or an author with a manuscript who needs professional quality books designed… contact us. We\'ll give you a complete package of ebook and paper book, ready to be uploaded and published on Amazon. (We can even show you how to set up an Amazon account for yourself so that you will have complete control and rewards.)</p>' +
									'</div>' +
									// 
									'<div data-condition="input.group1 == \'reasonb\'"> </div>' +
									'</div> </div>' +
									// 
									// 3. form
									'<div class="slideform-slide"> <div class="slideform-group">' +
									/// Q1
									'<div data-condition="input.group1 == \'reasona\'"> ' +
									'<label> <span>Your Name</span> <input id="namea" type="text" name="namea" placeholder="Your name"> </label>' +
									'<label> <span>Your Email</span> <input id="emaila" type="text" name="emaila" placeholder="Your email"> </label> ' +
									// ' <input name="entry.703433844" id="entry_703433844" data-comment="Feedback" value="" type="hidden"> ' +
									'</div>' +
									// 
									/// Q2
									'<div data-condition="input.group1 == \'reasonc\'"> ' +
									'<label> <span>Your Name</span> <input id="namec" type="text" name="namec" placeholder="Your name"> </label>' +
									'<label> <span>Your Email</span> <input id="emailc" type="text" name="emailc" placeholder="Your email"> </label> ' +
									'<label> <span>Your Message</span> <textarea name="messagec"></textarea> </label>' +
									// '<input name="entry.703433844" id="entry_703433844" data-comment="Feedback" value="" type="hidden"> ' +
									'</div>' +
									// 
									'</div> </div>' +
									// 
									// 4. final submit button (combines allinto gd input)
									'<div class="slideform-slide"> <div class="slideform-group">' +
									'<p>Hit Submit to send...</p>' +
									'<input name="entry.703433844" id="entry_703433844" data-comment="Feedback" value="" type="hidden"> ' +
									'</div> </div>' +
									// 
									// 
									//// LAST THANK YOU SLIDE AFTER FORM SUBMIT VIA formSubmit()
									////// last slide must be a dummy like this for this thing to work
									'<div class="slideform-slide"> <div class="slideform-group">' +
									'<h2 style="height:' + viewport(25, "vh") + 'px;">Thank you! Your feedback is sent.<h2><div class="options options-list">' +
									'</div> </div> </div>' +
									// 
									// 
									// 
									// '<footer class="slideform-footer">' +
									// '<div class="buttons">' +
									// '<button class="slideform-btn slideform-btn-next">Next' +
									// '</button>' +
									// '<button class="slideform-btn slideform-btn-prev">Prev' +
									// '</button>' +
									// '</div>' +
									// '</footer>' +
									'</form>' +
									'');
								// 
								// 
								//// disable enter key on form because entering it doesn't send always!
								$('form').keypress(
									function(event) {
										if (event.which == '13') {
											event.preventDefault();
										}
									});
								// 
								var $form = $('form');
								$form.slideform({
									// submit: null,
									nextButtonText: 'Next',
									prevButtonText: 'Prev',
									submitButtonText: 'Submit',
									// 
									// submit: function(event, form) {
									// 	// $form.trigger('goForward');
									// 	// $form.submit();
									// },
									// form validation using jquery.validate
									// NEW: using html tags now
									//// NOTE: THIS IS JUST TO REQUIRE THE ENTIRE group1 of multiple choices,
									//// the <inputs> enterable fields are validated via html tags in markup
									validate: {
										rules: {
											group1: {
												required: true,
											},
											wikipedia_url: {
												required: true,
											}
											// 
										},
									},
									//// /form validation using jquery.validate
								});
							});
					});
			});
		// 
		// 
		// 
		// 
		// 
	}
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
	///// off (many ads on top!)
	// $('.breadcrumbs').before('<table style="margin-top:10px;width:99%;"><tr><td style="max-width:50px;"><span style="font: 12px/1em sans-serif; display: inline-block;">Find a book/artist:</span></td><td><div style="background:grey"><div id="search"></div></div></td></tr></table> ');
	// gCSE(thsBlg_cse, "search");
	//////
	if (siteSection == "single") {
		// ** amazon amLocalize IS >>OFF<< in affLocalize() (using onelink) **
		affLocalize("", "", thsBlg_zzl);
	}
});
//
//