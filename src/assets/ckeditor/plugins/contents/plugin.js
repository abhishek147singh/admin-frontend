CKEDITOR.plugins.add( 'contents', {
    requires: 'widget',

	icons: 'contents',

	init: function( editor ) {
        editor.addContentsCss( this.path + 'styles/styles.css' );
		CKEDITOR.dialog.add( 'contents', this.path + 'dialogs/contents.js' );

        editor.widgets.add( 'contents', {
			button: 'Insert Table of Contents',

			template:
                '<div class="widget-toc accordion"><div class="accordion-item"></div></div>',

            allowedContent:
            'div(!widget-toc,float-left,float-right,align-center);' +
            'p(!toc-title);',

            dialog: 'contents',

			upcast: function( element ) {
				return element.name == 'div'
					&& element.hasClass( 'widget-toc' );
			},

			init: function() {

                editor.on('saveSnapshot', function(evt) {
                    buildToc(this.element)
                }.bind(this));

                this.on('focus', function(evt) {
                    buildToc(this.element)
                }.bind(this));

                buildToc(this.element);

                if ( this.element.hasClass( 'float-left' ) )
					this.setData( 'align', 'float-left' );
				if ( this.element.hasClass( 'float-right' ) )
					this.setData( 'align', 'float-right' );
                if ( this.element.hasClass( 'toc_root' ) )
                    this.setData( 'chkInsertOpt', true);

			},

			data: function() {

				this.element.removeClass( 'float-left' );
				this.element.removeClass( 'float-right' );
                this.element.removeClass( 'toc_root' );

				if ( this.data.align )
					this.element.addClass(this.data.align );

                if ( this.data.chkInsertOpt )
                    this.element.addClass('toc_root');

            },

		} );

function buildToc(element){

    element.setHtml(`
        <p class="accordion-header toc-title" >
            <a type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne"> Contents  </a>
        </p>
    `);

    var bodyMain = new CKEDITOR.dom.element('div');
    bodyMain.setAttribute("id","collapseOne");
    bodyMain.addClass('accordion-collapse');
    bodyMain.addClass('collapse');
    bodyMain.addClass('show');
    bodyMain.appendTo(element);

    bodybody = new CKEDITOR.dom.element( 'div' );
    bodybody.addClass("accordion-body");
    bodybody.appendTo(bodyMain);

    Container = new CKEDITOR.dom.element( 'ol' );
    Container.appendTo(bodybody);

    if (element.hasClass( 'toc_root' )){
        findRoot = '> h1,> h2,> h3,> h4,> h5,> h6,';
    }else{
        findRoot = 'h1,h2,h3,h4,h5,h6,';
    }


    var headings = editor.editable().find(findRoot),
        parentLevel = 1,
        length = headings.count();

    //get each heading
    for (var i = 0 ; i < length ; ++i) {

        var currentHeading = headings.getItem(i),
            text = currentHeading.getText(),
            newLevel = parseInt(currentHeading.getName().substr(1,1));
        var diff = (newLevel - parentLevel);

        //set the start level incase it is not h1
        if(i === 0){diff = 0; parentLevel = newLevel;}

        //we need a new ul if the new level has a higher number than its parents number
        if (diff > 0) {
            var containerLiNode = Container.getLast();

            var ulNode = new CKEDITOR.dom.element( 'ol' );
            ulNode.appendTo(containerLiNode);
            Container = ulNode;
            parentLevel = newLevel;
        }


        //we need to get a previous ul if the new level has a lower number than its parents number
        if (diff < 0) {
            while (0 !== diff++) {
                parent = Container.getParent().getParent();
                Container = (parent.getName() === 'ol' ? parent : Container);
            }
            parentLevel = newLevel;
        }

        //we can add the list item if there is no difference

        if (text == null || text.trim() === ''){
           text = '&nbsp;'
        }

        var id = text.replace(/ /g, "+");
        currentHeading.setAttribute( 'id', id );

        var liNode = CKEDITOR.dom.element.createFromHtml( '<li><a href="#'+id+'">'+text+'</a></li>' );
        liNode.appendTo(Container);
    }
    }

    }
} );




