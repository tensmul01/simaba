/*jslint unparam: true, regexp: true */
/*global window, $ */

var nim_mahasiswa = "000001"

function set_nim_value(ob) {
	nim_mahasiswa = $(ob).val();
}

function uploadfoto_e() {
    'use strict';
    // Change this to the location of your server-side upload handler:
	if ($('#fileupload').length == 0) { return false }
	console.clear("");
	console.log("OBJECT Upload ada !!");
	
    var url = base_url + 'upload/server/php/',
        uploadButton = $('<button/>')
            .addClass('fa fa-upload btn btn-primary')
            .prop('disabled', true)
            .text('Processing...image file : ')
            .on('click', function () {

				$('#progress').css('visibility','visible');
                var $this = $(this),
                    data = $this.data();
					
                $this
                    .off('click')
                    .text('Abort')
                    .on('click', function () {
                        $this.remove();
                        data.abort();
                    });
                data.submit().always(function () {
                    $this.remove();
                });
            });
			
	$('#progress').css('visibility','hidden'),
			
    $('#fileupload').fileupload({
        url: base_url + 'upload/server/php/',
        dataType: 'json',
        autoUpload: false,
        acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
        maxFileSize: 999000,
        // Enable image resizing, except for Android and Opera,
        // which actually support image resizing, but fail to
        // send Blob objects via XHR requests:
        disableImageResize: /Android(?!.*Chrome)|Opera/
            .test(window.navigator.userAgent),
        previewMaxWidth: 90,
        previewMaxHeight: 90,
        previewCrop: true
    }).on('fileuploadadd', function (e, data) {
		$('#preview_img1').html('');       //clear child...
		nim_mahasiswa=$("#nim").val()
		if ($("#nim").length == 0) {
			nim_mahasiswa=$("#nip").val()
			}
		
		//console.log(nim_mahasiswa);
		//console.log( $("#nim").val() );
		
		data.context = $('#preview_img1');
        $.each(data.files, function (index, file) {
            var node = $('<span id="img_1001001" style="bottom:0;left:0;width:80px;"></span>')
				node.appendTo(data.context);
				// console.log("Canvas :" + file);
				
			var ext = data.files[index].name.substr(data.files[index].name.lastIndexOf('.') + 1)
				data.files[index].uploadName = nim_mahasiswa + "_" + "profile." +  ext;
			
        }); 
		/* auto upload -- no progress -- */
		data.submit();
		
    }).on('fileuploadprocessalways', function (e, data) {
        var index = data.index,
            file = data.files[index],
            node = $(data.context.children()[index]);

			console.log("fileuploadprocessalways DONE...");
			console.log(data);
			console.log(file);
			

        if (file.preview) {
            node
                .prepend(file.preview);
        } else {

			$.ajax({
				type	: "GET",
				url	: base_url+"Utility/upload_file/"+file.uploadName,
				success	: function(data) {
							console.log("Upload OK....");
						  } 
			})
		}
		
        if (file.error) {
            node
                .append('<br>')
                .append($('<span class="text-danger"/>').text(file.error));
        }
        if (index + 1 === data.files.length) {
            data.context.find('button')
                .text('Upload')
                .prop('disabled', !!data.files.error);
        }
    }).on('fileuploadprogressall', function (e, data) {
		console.log("on progressall....");
        var progress = parseInt(data.loaded / data.total * 100, 10);
        $('#progress .progress-bar').css(
            'width',
            progress + '%'
        );
    }).on('fileuploaddone', function (e, data) {
		setTimeout(function(){
					$('#progress').css('visibility','hidden'),
					$('#progress .progress-bar').css('width','0%');}
					, 2000);
		//console.log(e);
		//console.log(data);
		//console.log("upload done");
		
		$.each(data.result.files, function (index, file) {
			
			console.log(typeof file)
			console.log(file)
			
            if ( file.url ) {

				if ( file.thumbnailUrl ) {
					var link = $('<a id="img_file" data-img="'+ file.name +'" >')
						.attr('target', '_blank')
						.prop('href', file.thumbnailUrl);
					} else {	

					var link = $('<a id="img_file" data-img = " " >')
						.attr('target', '_blank')
						.prop('href', file.thumbnailUrl );
				}	
					
                $(data.context.children()[index])
                    .wrap(link);
            } else if (file.error) {
                var error = $('<span class="text-danger"/>').text(file.error);
                $(data.context.children()[index])
                    .append('<br>')
                    .append(error);
            }
        });
    }).on('fileuploadfail', function (e, data) {
		console.log("on fail....");
		console.log(e);
		console.log(data);
        $.each(data.files, function (index) {
            var error = $('<span class="text-danger"/>').text('File upload failed.');
            $(data.context.children()[index])
                .append('<br>')
                .append(error);
        });
		
    }).on('fileuploadprocess', function (e, data) {
		console.log('Processing ' + data.files[data.index].name + '...');
    }).prop('disabled', !$.support.fileInput)
        .parent().addClass($.support.fileInput ? undefined : 'disabled');
};
