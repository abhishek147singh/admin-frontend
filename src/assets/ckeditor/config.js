/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see https://ckeditor.com/legal/ckeditor-oss-license
 */

// CKEDITOR.editorConfig = function (config) {

// 	config.toolbar = [
// 		{ name: 'document', items: ['Source'] },
// 		{ name: 'clipboard', items: ['Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo'] },
// 		{ name: 'editing', items: ['Find', 'Replace', '-', 'SelectAll', '-', 'Scayt'] },
// 		{ name: 'insert', items: ['Image', 'Table', 'HorizontalRule', 'Smiley', 'SpecialChar', 'PageBreak', 'Iframe'] },
// 		'/',
// 		{ name: 'basicstyles', items: ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'CopyFormatting', 'RemoveFormat'] },
// 		{ name: 'paragraph', items: ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', 'CreateDiv', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-', 'BidiLtr', 'BidiRtl', 'Language'] },
// 		{ name: 'links', items: ['Link', 'Unlink', 'Anchor'] },
// 		'/',
// 		{ name: 'styles', items: ['Styles', 'Format', 'Font', 'FontSize'] },
// 		{ name: 'colors', items: ['TextColor', 'BGColor'] },
// 		{ name: 'tools', items: ['Maximize', 'ShowBlocks'] },
// 		{ name: 'about', items: ['About'] },
// 	];

// 	config.removePlugins = 'exportpdf';
// };


CKEDITOR.editorConfig = function( config )
{
	// Define changes to default configuration here. For example:
    config.language = 'en';
    //config.font_names =
    //'Arial/Arial, Helvetica, sans-serif;' +
    //'Times New Roman/Times New Roman, Times, serif;' +
    //'Verdana;' + 'Mangal';


    config.font_names = 'calibri/calibri;Hindi/Kruti';
    config.fontSize_defaultLabel = '20px';
    config.skin = 'kama';
  // config.Plugins.Add('imgmap', 'en');

    
    
	// config.uiColor = '#AADC6E';
		//config.filebrowserImageBrowseUrl = '/beta/ckfinder/_samples/asp/standalone.asp?type=Images';
		//config.filebrowserImageBrowseUrl ='/beta/ckfinder/ckfinder.html?Type=Images&CKEditor=editor1&path=images&CKEditorFuncNum=2&langCode=en';
    config.filebrowserImageBrowseUrl = '/ckfinder/ckfinder.html?currentFolder=/Myfiles/';
		//config.filebrowserImageBrowseUrl ='/ckfinder/ckfinder.html?Type=Images&CKEditor=editor1&currentFolder=/userfiles/';
		//config.filebrowserFlashUploadUrl = '/ckfinder/ckfinder.html?currentFolder=/userfiles/';
    config.filebrowserFlashBrowseUrl = '/ckfinder/ckfinder.html?currentFolder=/Myfiles/';

    config.enterMode = CKEDITOR.ENTER_BR;
    config.shiftEnterMode = CKEDITOR.ENTER_P;
    //config.font_names = 'Hindi/Kruti;' + config.font_names;
    //config.font_names = 'Calibri/Calibri;' + config.font_names;
    // config.removePlugins = 'div';
    // config.allowedContent = true;
    // config.disableAutoInline = true;
    // config.contenteditable = true;
    // //config.forcePasteAsPlainText = true;
    // config.allowedContent = true;
    // config.autoParagraph = false;
	config.removePlugins = 'exportpdf';
	config.versionCheck = false;
  config.extraPlugins = 'removespan,contents';
};
