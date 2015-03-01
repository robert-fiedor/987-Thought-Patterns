exports.config =
# See docs at http://brunch.readthedocs.org/en/latest/config.html.

# Application build path.  Default is public
#buildPath: ''   CordovaLib/CordovaLibApp/
  buildPath:'www'
  files:
    javascripts:
      defaultExtension: 'js'
      joinTo:
        'javascripts/app.js': /^app/
        'javascripts/vendor.js': /^vendor/
      order:
        before: [

          'vendor/scripts/console-helper.js',
          'vendor/scripts/jquery-1.7.2.js',
          'vendor/scripts/underscore-1.3.3.js',
          'vendor/scripts/backbone-0.9.2.js',
          'vendor/scripts/backbone-mediator.js'
        ]

    stylesheets:
      defaultExtension: 'styl'
      joinTo: 'stylesheets/app.css'
      order:
        before: ['vendor/styles/normalize.css',
          'vendor/styles/jquery.mobile-1.2.0.css',
          'vendor/styles/jquery.mobile.structure-1.2.0.css',
          'vendor/styles/jquery.mobile.theme-1.2.0.css',
          'vendor/styles/thoughtpatterns.css'
        ]
        after: ['vendor/styles/helpers.css']

    templates:
      defaultExtension: 'hbs'
      joinTo: 'javascripts/templates.js'

  minify: no
