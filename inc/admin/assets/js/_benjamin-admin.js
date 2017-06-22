(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// 'use strict';

jQuery(document).ready(function($) {

  require('./media-library');


  if($('body.widgets-php')){
    $('.benjamin-widget-area-options').appendTo('.widgets-sortables');
  }

});

window.$ = jQuery;

},{"./media-library":2}],2:[function(require,module,exports){

var file_frame;
var wp_media_post_id = wp.media.model.settings.post.id; // Store the old id
var set_to_post_id = 0; // Set this

$('.js--media-library').on('click', function( event ){

  var $this = $(this);

  var $thisParent = $this.closest('.js--uswds-media-wrap');
  var $thisField = $thisParent.find('.js--video-url');
  var $preview = $thisParent.find('.placeholder');
  var filter = $this.data('filter');

	event.preventDefault($thisParent);

	// If the media frame already exists, reopen it.
	if ( file_frame ) {
		// Set the post ID to what we want
		file_frame.uploader.uploader.param( 'post_id', set_to_post_id );
		// Open frame
		file_frame.open();
		return;
	} else {
		// Set the wp.media post id so the uploader grabs the ID we want when initialised
		wp.media.model.settings.post.id = set_to_post_id;
	}

	// Create the media frame.
	window.butt = file_frame = wp.media.frames.file_frame = wp.media({
		title: 'Select a image to upload',
		button: {
			text: 'Use this image',
		},
		multiple: false,
    library: {
      type: filter
    }
	});

	// When an image is selected, run a callback.
	file_frame.on( 'select', function() {
		// We set multiple to false so only get one image from the uploader
		attachment = file_frame.state().get('selection').first().toJSON();

    var url = attachment.url;
    var fileName = attachment.filename;
    var id = attachment.id;


    var data = {
      "action": "benjamin_video_shortcode",
      "data": url
    };
    $thisField.val(url);


    $.ajax({
      type: 'post',
      url: ajaxurl,
      data: data,
      complete: function(response){
        $preview.html( response.responseText );
      }
    });


		// Restore the main post ID
		wp.media.model.settings.post.id = wp_media_post_id;
	});

		// Finally, open the modal
		file_frame.open();
});

},{}]},{},[1]);
