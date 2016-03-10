/// <binding ProjectOpened='watch' />

/*
This file in the main entry point for defining grunt tasks and using grunt plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkID=513275&clcid=0x409
*/

module.exports = function (grunt) {
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-angular-templates');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.initConfig({

		// javascript
		concat: {
			options: {
				separator: grunt.util.linefeed + grunt.util.linefeed,
				process: function (src, filepath) {
					return '/* #### File: ' + filepath + ' */ \n' + src;
				}
			},
			dist: {
				// first load the app.js from each module
				src: [
					'Scripts/app/app.js',
					'Scripts/app/FilterTable/app.js',
					'Scripts/app/**/*.js'
				],
				dest: '../../dist/js/SmlAppl.WebApps.NgFramework.js',
			}
		},

		uglify: {
			app: {
				files: {
					'../../dist/js/SmlAppl.WebApps.NgFramework.min.js': '../../dist/js/SmlAppl.WebApps.NgFramework.js'
				}
			}
		},

		ngtemplates: {
			'smlAppl.webApps.framework': {
				src: 'wwwroot/Views/**/*.html',
				dest: 'Scripts/app/Config/templates.js'
			},
			'smlAppl.webApps.framework.filterTable': {
				src: 'wwwroot/FilterTable/Views/**/*.html',
				dest: 'Scripts/app/FilterTable/Config/templates.js'
			}
		},

		// css
		less: {
			options: {
				sourceMap: true
			},
			dist: {
				files: {
					'../../dist/css/SmlAppl.WebApps.NgFramework.css': 'Content/css/main.less' // 'destination': 'source'
				}
			}
		},

		cssmin: {
			target: {
				files: [{
					expand: true,
					cwd: '../../dist/css',
					src: ['*.css', '!*.min.css'],
					dest: '../../dist/css',
					ext: '.min.css',
					extDot: 'last'
				}]
			}
		},

		// system

		copy: {
			bower: {
				src: 'bower.json',
				dest: '../../'
			}
		},

		watch: {
			scripts: {
				files: ['Scripts/app/**/*.js'],
				tasks: ['concat', 'uglify']
			},
			templates: {
				files: ['wwwroot/Views/**/*.html'],
				tasks: ['ngtemplates:smlAppl.webApps.framework']
			},
			templatesFilterTable: {
				files: ['wwwroot/FilterTable/Views/**/*.html'],
				tasks: ['ngtemplates:smlAppl.webApps.framework.filterTable']
			},
			less: {
				files: ['Content/css/**/*.less'],
				tasks: ['less']
			},
			bower: {
				files: ['bower.json'],
				tasks: ['copy:bower']
			}
		}
	});

	grunt.registerTask('js', ['ngtemplates', 'concat', 'uglify']);
	grunt.registerTask('css', ['less', 'cssmin']);

	//grunt.registerTask('default', ['concat', 'uglify', 'ngtemplates', 'less', 'cssmin', 'watch']);
};