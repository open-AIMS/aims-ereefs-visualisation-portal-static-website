var EATLAS_NCANIMATE2_MEDIA_MAX_HEIGHT=800;function eatlas_ncanimate2_resize_videos(videos){if(videos){(function($){videos.each(function(index){var orig_width=$(this).get(0).width,orig_height=$(this).get(0).height,current_width=$(this).width(),current_height=$(this).height();if(current_width&&orig_width&&orig_height){current_height=Math.round(current_width*orig_height/orig_width);if(current_height>EATLAS_NCANIMATE2_MEDIA_MAX_HEIGHT){current_height=EATLAS_NCANIMATE2_MEDIA_MAX_HEIGHT;current_width=Math.round(current_height*orig_width/orig_height);$(this).width(current_width);}
$(this).height(current_height);}});}(jQuery));}}
function eatlas_ncanimate2_numeric_sort_asc(a,b){return a-b;}
function eatlas_ncanimate2_parseFloat_sort_desc(a,b){return parseFloat(b)-parseFloat(a);}
function EAtlasNcAnimate2Widget(htmlBlockElement){this.block=htmlBlockElement;this.media_map=null;this.selector_year=null;this.default_framePeriod=null;this.default_elevation=null;this.current_framePeriod=null;this.current_elevation=null;this.current_region=null;this.current_year=null;this.current_month=null;this.map_selector=new EAtlasNcAnimate2Map(this.block,this);this.tabsContainer=this.block.find('.tabs');this.tabsContainerUl=this.tabsContainer.find('ul');this.messageContainer=this.block.find('.message-container');this.messageContainerText=this.messageContainer.find('.text');this.imageContainer=this.block.find('.image-container');this.imageContainerImg=this.imageContainer.find('img');this.videoContainer=this.block.find('.video-container');this.videoContainerVideo=this.videoContainer.find('video');if(!this.videoContainerVideo||!this.videoContainerVideo[0]){this.videoContainerVideo=null;}else if(!this.videoContainerVideo[0].load){this.videoContainerVideo=null;this.showMessage("Error occurred while loading the video.<br/>"+
"<span class=\"details\">"+
"Details: Your browser do not support video.load"+
"</span>");}
if(this.videoContainerVideo){this.videoContainerVideo.bind("pause",function(widget){return function(event){widget.setVideoCurrentTime(widget.fixVideoFrameTime(widget.videoContainerVideo[0].currentTime));};}(this));}
this.elevationContainer=this.block.find('.elevation');this.elevationContainerSelect=this.elevationContainer.find('select');this.navigation=this.block.find('.navigation');this.previousFrameButton=this.navigation.find('.previousFrame');this.previousFrameButton.click(function(widget){return function(event){widget.skipFrame(-1);};}(this));this.nextFrameButton=this.navigation.find('.nextFrame');this.nextFrameButton.click(function(widget){return function(event){widget.skipFrame(1);};}(this));this.downloadContainer=this.block.find('.downloads');this.downloadContainerList=this.downloadContainer.find('ul');}
EAtlasNcAnimate2Widget.prototype.isInternetExplorer=function(){return navigator.userAgent.indexOf(" MSIE ")>=0||navigator.userAgent.indexOf(" Trident/")>=0;};EAtlasNcAnimate2Widget.prototype.isMsEdge=function(){return navigator.userAgent.indexOf(" Edge/")>=0;};EAtlasNcAnimate2Widget.prototype.setVideoCurrentTime=function(currentTime){if(this.videoContainerVideo){this.videoContainerVideo[0].currentTime=currentTime;if(this.isMsEdge()||this.isInternetExplorer()){this.videoContainerVideo[0].currentTime=0;this.videoContainerVideo[0].currentTime=currentTime;}}};EAtlasNcAnimate2Widget.prototype.skipFrame=function(nbFrames){this.setVideoCurrentTime(this.fixVideoFrameTime(this.getSkipFrame(nbFrames)));};EAtlasNcAnimate2Widget.prototype.getSkipFrame=function(nbFrames){if(this.videoContainerVideo){var videoEl=this.videoContainerVideo[0];videoEl.pause();var videoFPS=this.video_metadata["fps"];return videoEl.currentTime+(nbFrames/videoFPS);}
return 0;};EAtlasNcAnimate2Widget.prototype.fixVideoFrameTime=function(videoTime){if(this.videoContainerVideo){var videoEl=this.videoContainerVideo[0];var videoFPS=this.video_metadata["fps"];var videoFrameNumber=Math.floor(videoTime*videoFPS);var fixVideoTime=(videoFrameNumber+0.5)/videoFPS;if(fixVideoTime>videoEl.duration){fixVideoTime=videoEl.duration-(0.5/videoFPS);}
return fixVideoTime<0?0:fixVideoTime;}};EAtlasNcAnimate2Widget.prototype.init=function(){this.initElevationSelector();this.load();};EAtlasNcAnimate2Widget.prototype.initTabs=function(framePeriodOrder,framePeriodSettings){for(var i=0;i<framePeriodOrder.length;i++){var framePeriod=framePeriodOrder[i];var settings=framePeriodSettings[framePeriod];var li=jQuery('<li/>').addClass(framePeriod).addClass(settings.type).appendTo(this.tabsContainerUl);var link=jQuery('<a/>').attr('framePeriod',framePeriod).appendTo(li);var icon=jQuery('<span/>').addClass('icon').appendTo(link);var label=jQuery('<span/>').addClass('tabLabel').text(framePeriod).appendTo(link);}
this.setTabsHref();};EAtlasNcAnimate2Widget.prototype.setTabsHref=function(){this.tabsContainerUl.find('a').each(function(index){var link=jQuery(this);var framePeriod=link.attr('framePeriod');link.attr('href','#'+eatlas_ncanimate2_craft_anchor({"frame":framePeriod}));});};EAtlasNcAnimate2Widget.prototype.showMessage=function(message){this.showMessage(message,null,null);};EAtlasNcAnimate2Widget.prototype.showMessage=function(message,width,height){if(jQuery.isNaN(width)||width<=0){width=1300;}
if(jQuery.isNaN(height)||height<=0){height=600;}
this.messageContainer.width(width);var actualWidth=this.messageContainer.width();var calculatedHeight=height;if(actualWidth!=width){calculatedHeight=Math.round(actualWidth*height/width);if(calculatedHeight>EATLAS_NCANIMATE2_MEDIA_MAX_HEIGHT){calculatedHeight=EATLAS_NCANIMATE2_MEDIA_MAX_HEIGHT
var calculatedWidth=Math.round(calculatedHeight*width/height);this.messageContainer.width(calculatedWidth);}}
this.messageContainer.height(calculatedHeight);this.messageContainer.css("line-height",calculatedHeight+"px");this.messageContainer.show();this.imageContainer.hide();this.videoContainer.hide();this.messageContainerText.html(message);};EAtlasNcAnimate2Widget.prototype.showImageContainer=function(message){this.messageContainer.hide();this.imageContainer.show();this.videoContainer.hide();};EAtlasNcAnimate2Widget.prototype.showVideoContainer=function(message){this.messageContainer.hide();this.imageContainer.hide();this.videoContainer.show();eatlas_ncanimate2_resize_videos(this.videoContainerVideo);};EAtlasNcAnimate2Widget.prototype.loadMedia=function(framePeriod,elevation,region,year,month){if(this.default_region===null){return;}
if(framePeriod===undefined||framePeriod===null){framePeriod=this.default_framePeriod;}
if(elevation===undefined||elevation===null){elevation=this.default_elevation;}
if(region===undefined||region===null||!this.regions.hasOwnProperty(region)){region=this.default_region;}
if(year===undefined){year=null;}
if(month===undefined){month=null;}
if(framePeriod!==this.current_framePeriod){this.loadElevations(framePeriod);}
var media_metadata=null;var periodType="unknown";this.navigation.hide();if(framePeriod!==null&&elevation!==null&&region!==null){if((framePeriod in this.media_map)&&(elevation in this.media_map[framePeriod])&&(region in this.media_map[framePeriod][elevation])){if(("metadata"in this.media_map[framePeriod][elevation][region])&&this.media_map[framePeriod][elevation][region]["metadata"]!==null){periodType="all";media_metadata=this.media_map[framePeriod][elevation][region]["metadata"];}else if(year!=null&&year in this.media_map[framePeriod][elevation][region]){if(("metadata"in this.media_map[framePeriod][elevation][region][year])&&this.media_map[framePeriod][elevation][region][year]["metadata"]!==null){periodType="year";media_metadata=this.media_map[framePeriod][elevation][region][year]["metadata"];}else{if(month===null||!(month in this.media_map[framePeriod][elevation][region][year])){for(month in this.media_map[framePeriod][elevation][region][year]){if(this.media_map[framePeriod][elevation][region][year].hasOwnProperty(month)){break;}}}
if((month in this.media_map[framePeriod][elevation][region][year])&&("metadata"in this.media_map[framePeriod][elevation][region][year][month])&&this.media_map[framePeriod][elevation][region][year][month]["metadata"]!==null){periodType="month";media_metadata=this.media_map[framePeriod][elevation][region][year][month]["metadata"];}}}}}
this.selectMedia(framePeriod,elevation,region,year,month);if(media_metadata!=null){this.media_metadata=media_metadata;var lastModified=media_metadata["lastModified"];if("outputFiles"in media_metadata){var outputFiles=media_metadata['outputFiles'];if(outputFiles!=null){var videos_metadata={};var images_metadata={};jQuery.each(outputFiles,function(outputFileID,outputFile){if(outputFile['type']==='VIDEO'){videos_metadata[outputFile['filetype']]=outputFile;}else if(outputFile['type']==='MAP'){images_metadata[outputFile['filetype']]=outputFile;}});if("MP4"in videos_metadata){if(this.videoContainerVideo){this.navigation.show();this.video_metadata=videos_metadata["MP4"];var videoUrl=videos_metadata["MP4"]["fileURI"]+"?t="+lastModified;var videoPreview=null;if("preview"in media_metadata){videoPreview=media_metadata["preview"]+"?t="+lastModified;}
var videoSource=this.videoContainerVideo.find('.video_mp4');var width=videos_metadata["MP4"]["width"];var height=videos_metadata["MP4"]["height"];if(videoPreview){this.videoContainerVideo.attr('poster',videoPreview);this.imageContainerImg.attr('src',videoPreview);var previewLoader=window.setTimeout((function(that){return function(){if(that.imageIsLoaded(that.imageContainerImg)){that.showVideoContainer();}else{that.showMessage("Loading...",width,height);that.imageContainerImg.load((function(that){return function(){that.showVideoContainer();}})(that));}};})(this),100);this.imageContainerImg.error((function(that,previewLoader){return function(){window.clearTimeout(previewLoader);that.showVideoContainer();}})(this,previewLoader));}else{this.videoContainerVideo.removeAttr('poster');this.showVideoContainer();}
videoSource.attr('src',videoUrl);this.videoContainerVideo[0].load();}}else if("PNG"in images_metadata){var imageUrl=images_metadata["PNG"]["fileURI"]+"?t="+lastModified;var width=images_metadata["PNG"]["width"];var height=images_metadata["PNG"]["height"];this.imageContainerImg.attr('src',imageUrl);var imageLoader=window.setTimeout((function(that){return function(){if(that.imageIsLoaded(that.imageContainerImg)){that.showImageContainer();}else{that.showMessage("Loading...",width,height);that.imageContainerImg.load((function(that){return function(){that.showImageContainer();}})(that));}};})(this),100);this.imageContainerImg.error((function(that,imageLoader){return function(){window.clearTimeout(imageLoader);that.showMessage("Image not found",width,height);}})(this,imageLoader));}else{this.showMessage("Media not found");}}}else{this.showMessage("Media not found");}}else{var alt_year=null;var alt_month=null;if(elevation!==null&&region!==null&&(framePeriod in this.media_map)&&(elevation in this.media_map[framePeriod])&&(region in this.media_map[framePeriod][elevation])){var all_years=this.objectKeys(this.media_map[framePeriod][elevation][region]);all_years.sort(eatlas_ncanimate2_numeric_sort_asc);for(var i=all_years.length-1;i>=0&&alt_year===null;i--){var _alt_year=all_years[i];if(_alt_year!=="metadata"&&_alt_year in this.media_map[framePeriod][elevation][region]){var all_months=this.objectKeys(this.media_map[framePeriod][elevation][region][_alt_year]);all_months.sort(eatlas_ncanimate2_numeric_sort_asc);for(var j=all_months.length-1;j>=0&&alt_year===null;j--){var _alt_month=all_months[j];if(_alt_month!=="metadata"&&(_alt_month in this.media_map[framePeriod][elevation][region][_alt_year])&&("metadata"in this.media_map[framePeriod][elevation][region][_alt_year][_alt_month])&&this.media_map[framePeriod][elevation][region][_alt_year][_alt_month]["metadata"]!==null){media_metadata=this.media_map[framePeriod][elevation][region][_alt_year][_alt_month]["metadata"];alt_year=_alt_year;alt_month=_alt_month;}}
if(("metadata"in this.media_map[framePeriod][elevation][region][_alt_year])&&this.media_map[framePeriod][elevation][region][_alt_year]["metadata"]!==null){media_metadata=this.media_map[framePeriod][elevation][region][_alt_year]["metadata"];alt_year=_alt_year;alt_month=null;}}}
if(("metadata"in this.media_map[framePeriod][elevation][region])&&this.media_map[framePeriod][elevation][region]["metadata"]!==null){media_metadata=this.media_map[framePeriod][elevation][region]["metadata"];alt_year=null;alt_month=null;}
this.loadMedia(framePeriod,elevation,region,alt_year,alt_month);}else{this.showMessage("Media not available.");}}
this.setTabsHref();this.loadDownloads(media_metadata);};EAtlasNcAnimate2Widget.prototype.imageIsLoaded=function(imageJQueryObject){var loaded=true;imageJQueryObject.each(function(){if(!this.complete||this.naturalHeight===0){loaded=false;return false;}});return loaded;};EAtlasNcAnimate2Widget.prototype.selectMedia=function(framePeriod,elevation,region,year,month){this.selector_year=year;this.current_year=year;this.current_month=month;if(framePeriod!==this.current_framePeriod){this.current_framePeriod=framePeriod;this.changeFramePeriod(framePeriod);}
if(elevation!==this.current_elevation){this.current_elevation=elevation;this.changeElevation(elevation);}
if(region!==this.current_region){this.current_region=region;this.map_selector.selectRegion(region);}
this.redrawCalendar();};EAtlasNcAnimate2Widget.prototype.redrawCalendar=function(){if(this.current_framePeriod!==null&&this.current_elevation!==null&&this.current_region!=null){var year=this.selector_year;var dateSelector=this.block.find('.date-selector');var yearSelector=dateSelector.find('.year-selector');var previousYearCell=yearSelector.find('.year_previous');var previousYearLink=previousYearCell.find('a');var nextYearCell=yearSelector.find('.year_next');var nextYearLink=nextYearCell.find('a');var yearCell=yearSelector.find('.year');var yearLink=yearCell.find('a');yearLink.html(year==null?"----":year);dateSelector.find('td').removeClass('selected');dateSelector.find('td').removeClass('selectable');dateSelector.find('th').removeClass('selected');dateSelector.find('th').removeClass('selectable');previousYearCell.unbind('click');previousYearLink.removeAttr('href');nextYearCell.unbind('click');nextYearLink.removeAttr('href');yearCell.unbind('click');yearLink.removeAttr('href');for(var month=1;month<=12;month++){var monthCell=dateSelector.find('.month_'+month);var monthLink=monthCell.find('a');monthCell.unbind('click');monthLink.removeAttr('href');}
if(year!==null&&this.media_map!==null&&(this.current_framePeriod in this.media_map)&&(this.current_elevation in this.media_map[this.current_framePeriod])&&(this.current_region in this.media_map[this.current_framePeriod][this.current_elevation])&&this.media_map[this.current_framePeriod][this.current_elevation][this.current_region]!==null){var video_region_map=this.media_map[this.current_framePeriod][this.current_elevation][this.current_region];var years=this.objectKeys(video_region_map);years.sort(eatlas_ncanimate2_numeric_sort_asc);var yearIndex;for(yearIndex=0;yearIndex<years.length&&years[yearIndex]!=year;yearIndex++);if(years[yearIndex]==year){var previousYear=(yearIndex<=0?null:years[yearIndex-1]);var nextYear=(yearIndex>=(years.length-1)?null:years[yearIndex+1]);if(previousYear!==null){previousYearCell.addClass('selectable');previousYearLink.attr('href','#');previousYearCell.click(function(that,_previousYear){return function(){that.selector_year=_previousYear;that.redrawCalendar();return false;}}(this,previousYear));}
if(nextYear!==null){nextYearCell.addClass('selectable');nextYearLink.attr('href','#');nextYearCell.click(function(that,_nextYear){return function(){that.selector_year=_nextYear;that.redrawCalendar();return false;}}(this,nextYear));}}
if((year in video_region_map)&&video_region_map[year]!==null){var video_year_map=video_region_map[year];if("metadata"in video_year_map){yearCell.addClass('selectable');yearLink.attr('href','#'+eatlas_ncanimate2_craft_anchor({"year":year}));yearCell.click(function(that,_year){return function(){eatlas_ncanimate2_set_anchor(eatlas_ncanimate2_craft_anchor({"year":_year,"month":null}));}}(this,year));if(year==this.current_year&&this.current_month===null){yearCell.addClass('selected');}}
for(var month=1;month<=12;month++){if((month in video_year_map)&&("metadata"in video_year_map[month])&&video_year_map[month]["metadata"]!=null){var monthCell=dateSelector.find('.month_'+month);var monthLink=monthCell.find('a');monthCell.addClass('selectable');monthLink.attr('href','#'+eatlas_ncanimate2_craft_anchor({"year":year,"month":month}));monthCell.click(function(that,_year,_month){return function(){eatlas_ncanimate2_set_anchor(eatlas_ncanimate2_craft_anchor({"year":_year,"month":_month}));}}(this,year,month));if(year==this.current_year&&month==this.current_month){monthCell.addClass('selected');}}}}}}};EAtlasNcAnimate2Widget.prototype.initElevationSelector=function(){this.elevationContainerSelect.change((function(that){return function(){jQuery(this).find("option:selected").each(function(){var elevation=jQuery(this).text();eatlas_ncanimate2_set_anchor(eatlas_ncanimate2_craft_anchor({"elevation":elevation}));});}})(this));};EAtlasNcAnimate2Widget.prototype.changeFramePeriod=function(framePeriod){if(this.media_map&&framePeriod&&(framePeriod in this.media_map)){this.tabsContainerUl.find('li').removeClass('active');this.tabsContainerUl.find('li.'+framePeriod).addClass('active');}};EAtlasNcAnimate2Widget.prototype.changeElevation=function(elevation){if(this.media_map&&this.current_framePeriod&&(this.current_framePeriod in this.media_map)&&(elevation in this.media_map[this.current_framePeriod])){this.elevationContainerSelect.val(elevation);}};EAtlasNcAnimate2Widget.prototype.changeRegion=function(region){this.current_region=region;this.loadMedia(this.current_framePeriod,this.current_elevation,region,this.current_year,this.current_month);};EAtlasNcAnimate2Widget.prototype.load=function(){var productId=this.block.attr('productid');var blockName=this.block.attr('blockname');jQuery.ajax({url:"/module/eatlas/eatlas_ncanimate2/proxy?name="+blockName,cache:false,dataType:"json",timeout:30000,success:(function(that){return function(data,status,xhr){that.media_map={};var framePeriods=[];var framePeriodSettings={};var elevations=[];that.regions={};jQuery.each(data,function(mediaIndex,mediaMetadata){var dateRange=mediaMetadata['dateRange'];var startDateStr=null;var endDateStr=null;var startDate=null;var endDate=null;if(dateRange!=null){startDateStr=dateRange['startDate'];if(startDateStr!=null){startDate=that.parseDate(startDateStr);}
endDateStr=dateRange['endDate'];if(endDateStr!=null){endDate=that.parseDate(endDateStr);}}
var videoTimeIncrement=mediaMetadata['videoTimeIncrement'];var mapTimeIncrement=mediaMetadata['mapTimeIncrement'];var periodType=null;var mediaType=null;if(videoTimeIncrement!=null){periodType=videoTimeIncrement['unit'];mediaType='videos';}else if(mapTimeIncrement!=null){periodType=mapTimeIncrement['unit'];mediaType='images';}
var startYear=null;var startMonth=null;if(startDate!=null){startYear=startDate.year();startMonth=startDate.month()+1;}
var endYear=null;var endMonth=null;if(endDate!=null){endYear=endDate.year();endMonth=endDate.month()+1;}
var framePeriod='na';var elevation='na';if('properties'in mediaMetadata){if('framePeriod'in mediaMetadata['properties']){framePeriod=mediaMetadata['properties']['framePeriod'];}
if('targetHeight'in mediaMetadata['properties']){elevation=mediaMetadata['properties']['targetHeight'];}}
var region=mediaMetadata['region'];var regionId=region['id'];if(!that.regions[regionId]){that.regions[regionId]=region;}
if(!(framePeriod in that.media_map)){that.media_map[framePeriod]={};}
if(!(framePeriod in framePeriodSettings)){framePeriods.push(framePeriod);framePeriodSettings[framePeriod]={'type':mediaType};}
if(!(elevation in that.media_map[framePeriod])){elevations.push(elevation);that.media_map[framePeriod][elevation]={};}
if(!(regionId in that.media_map[framePeriod][elevation])){that.media_map[framePeriod][elevation][regionId]={};}
if(startYear==null){if(periodType==="ETERNITY"){that.media_map[framePeriod][elevation][regionId]["metadata"]=mediaMetadata;}}else{if(!(startYear in that.media_map[framePeriod][elevation][regionId])){that.media_map[framePeriod][elevation][regionId][startYear]={};}
if(periodType==="YEAR"){that.media_map[framePeriod][elevation][regionId][startYear]["metadata"]=mediaMetadata;}else if(periodType==="MONTH"){if(!(startMonth in that.media_map[framePeriod][elevation][regionId][startYear])){that.media_map[framePeriod][elevation][regionId][startYear][startMonth]={};}
that.media_map[framePeriod][elevation][regionId][startYear][startMonth]["metadata"]=mediaMetadata;}}});framePeriods.sort(function(a,b){var sortValue=function(str){switch(str.toLowerCase()){case'hourly':return 1;case'daily':return 2;case'monthly':return 3;case'seasonal':return 4;case'yearly':return 5;case'all':case'overall':return 6;default:return 7;}};return sortValue(a)-sortValue(b);});that.default_framePeriod=framePeriods[0];that.initTabs(framePeriods,framePeriodSettings);that.default_elevation=elevations[0];that.map_selector.load(that.regions);that.default_region=null;if(that.regions){var regionObjs=that.objectValues(that.regions)
if(regionObjs&&regionObjs.length>0){regionObjs.sort(function(regionA,regionB){var scaleA=regionA.scale||null;var scaleB=regionB.scale||null;if(scaleA!==null&&scaleB!==null){var scaleDiff=scaleA-scaleB;if(scaleDiff!==0){return scaleDiff;}}
if(scaleA!==null){return 1;}
if(scaleB!==null){return-1;}
return regionA.label.localeCompare(regionB.label);});var default_region_obj=regionObjs[0];that.default_region=default_region_obj.id;var anchorValues=eatlas_ncanimate2_get_anchor_values();that.loadMedia(anchorValues["frame"],anchorValues["elevation"],anchorValues["region"],anchorValues["year"],anchorValues["month"]);}}}})(this),error:(function(that){return function(xhr,textStatus,errorThrown){statusCode=xhr.status;responseText=xhr.responseText;errorMessage=null;if(JSON){jsonResponse=JSON.parse(responseText);errorMessage=jsonResponse.error;}
if(!errorMessage){errorMessage=responseText;}
that.showMessage("Error occurred while loading the data.<br/>"+
"<span class=\"details\">"+
"Block name: "+blockName+"<br/>"+
"Product ID: "+productId+"<br/>"+
statusCode+": "+errorMessage+
"</span>");}})(this)});jQuery(window).bind('hashchange',(function(that){return function(event){var anchorValues=eatlas_ncanimate2_get_anchor_values();that.loadMedia(anchorValues["frame"],anchorValues["elevation"],anchorValues["region"],anchorValues["year"],anchorValues["month"]);that.redrawCalendar();that.map_selector.populateHTMLRegionList();that.map_selector.redraw();}})(this));};EAtlasNcAnimate2Widget.prototype.parseDate=function(dateStr){if(dateStr===null||dateStr===""){return null;}
var date=moment.parseZone(dateStr);if(date.isValid()){return date;}
return null;};EAtlasNcAnimate2Widget.prototype.loadElevations=function(framePeriod){this.elevationContainerSelect.find('option').remove();var elevations=[];if(framePeriod in this.media_map){for(var elevation in this.media_map[framePeriod]){if(this.media_map[framePeriod].hasOwnProperty(elevation)){elevations.push(elevation);}}}
var nbElevation=elevations.length;if(nbElevation>1){elevations.sort(eatlas_ncanimate2_parseFloat_sort_desc);for(var i=0;i<nbElevation;i++){var elevation=elevations[i];this.elevationContainerSelect.append(jQuery('<option/>',{value:elevation,text:elevation}));}
this.elevationContainer.show();}else{this.elevationContainer.hide();}};EAtlasNcAnimate2Widget.prototype.loadDownloads=function(media_metadata){var downloads={};var keys=[];var lastModified=0;if(media_metadata!=null){lastModified=media_metadata["lastModified"];if("outputFiles"in media_metadata){var outputFiles=media_metadata['outputFiles'];if(outputFiles!=null){jQuery.each(outputFiles,function(outputFileID,outputFile){var key=outputFile['filetype'].toLowerCase();keys.push(key);downloads[key]=outputFile;});}}}
this.downloadContainerList.find('li').remove();if(keys.length>0){keys.sort();var that=this;jQuery.each(keys,function(index,key){var value=downloads[key];var url=value["fileURI"];var lastSlashIndex=url.lastIndexOf('/');var longFilename=lastSlashIndex>=0?url.substring(lastSlashIndex+1):url;var lastDoubleUnderscoreIndex=longFilename.lastIndexOf("__");var filename=lastDoubleUnderscoreIndex>=0?longFilename.substring(lastDoubleUnderscoreIndex+2):longFilename;var title=filename;if(value["width"]&&value["height"]){title+=' ['+value["width"]+' x '+value["height"]+']';}
var label=key;if(key.toLowerCase()==='zip'){label="video frames";}
url+="?t="+lastModified;that.downloadContainerList.append('<li class="'+key+'"><a href="'+url+'" title="'+title+'" download="'+filename+'">'+label+'</a></li>');});if(this.isDownloadFrameEnabled()){var frameLink=jQuery('<a>Video Frame</a>');frameLink.click(function(widget){return function(event){var MOMENT_UNIT_MAP={"SECOND":"seconds","MINUTE":"minutes","HOUR":"hours","DAY":"days","WEEK":"weeks","MONTH":"months","YEAR":"years"};var video=widget.videoContainerVideo;video[0].pause();var currentTime=widget.fixVideoFrameTime(video[0].currentTime);var videoFPS=widget.video_metadata["fps"];var currentFrameNumber=Math.floor(currentTime*videoFPS);var frameTime=widget.media_metadata["frameTimeIncrement"];var dateRange=widget.media_metadata["dateRange"];var startDateStr=dateRange["startDate"];var startDate=widget.parseDate(startDateStr);var frameTimeIncrement=frameTime["increment"]*currentFrameNumber;var frameTimeUnit=frameTime["unit"];var momentFrameTimeUnit=MOMENT_UNIT_MAP[frameTimeUnit];var frameDate=startDate.add(frameTimeIncrement,momentFrameTimeUnit);widget.downloadFrame(frameDate,frameTimeUnit);}}(this));var frameLi=jQuery('<li class="frame"></li>');frameLi.append(frameLink);this.downloadContainerList.append(frameLi);}
this.downloadContainer.show();}else{this.downloadContainer.hide();}};EAtlasNcAnimate2Widget.prototype.downloadFrame=function(frameDate,frameTimeUnit){if(!this.media_metadata["frameDirectoryUrl"]){return null;}
var frameUrl=this.media_metadata["frameDirectoryUrl"];if(!this.endsWith(frameUrl,"/")){frameUrl+="/";}
var filename=null;switch(frameTimeUnit){case"MINUTE":case"HOUR":filename="frame_"+frameDate.format("YYYY-MM-DD_HH[h]mm")+".png"
break;case"DAY":filename="frame_"+frameDate.format("YYYY-MM-DD")+".png"
break;case"MONTH":filename="frame_"+frameDate.format("YYYY-MM")+".png"
break;case"YEAR":filename="frame_"+frameDate.format("YYYY")+".png"
break;}
if(filename===null){alert("ERROR: Frame can not be downloaded.\nReason: Unsupported frame time unit: "+frameTimeUnit+".");}else{frameUrl+=filename
var link=jQuery('<a href="'+encodeURI(frameUrl)+'" download="'+filename+'" target="_blank"></a>');jQuery("body").append(link);link[0].click();link.remove();}};EAtlasNcAnimate2Widget.prototype.isDownloadFrameEnabled=function(){return this.videoContainerVideo&&this.media_metadata["frameDirectoryUrl"]!==undefined&&this.media_metadata["frameDirectoryUrl"]!==null;};EAtlasNcAnimate2Widget.prototype.warning=function(message){if((typeof console)==='object'&&(typeof console.log)==='function'){console.log(message);}else{alert(message);}};EAtlasNcAnimate2Widget.prototype.objectKeys=function(obj){if(Object&&Object.hasOwnProperty('keys')&&typeof(Object.keys)==='function'){return Object.keys(obj);}
var keys=[];for(var key in obj){if(obj.hasOwnProperty(key)){keys.push(key);}}
return keys;};EAtlasNcAnimate2Widget.prototype.objectValues=function(obj){if(Object&&Object.hasOwnProperty('values')&&typeof(Object.values)==='function'){return Object.values(obj);}
var values=[];for(var key in obj){if(obj.hasOwnProperty(key)){values.push(obj[key]);}}
return values;};EAtlasNcAnimate2Widget.prototype.endsWith=function(str,suffix){if(typeof(str.endsWith)==='function'){return str.endsWith(suffix);}
return str.indexOf(suffix,str.length-suffix.length)!==-1;};(function($){$(window).resize(function(){eatlas_ncanimate2_resize_videos($('.video-container video'));});}(jQuery));