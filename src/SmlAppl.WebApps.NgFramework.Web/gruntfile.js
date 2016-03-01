/// <binding ProjectOpened='watch' />
/*
This file in the main entry point for defining grunt tasks and using grunt plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkID=513275&clcid=0x409
*/

module.exports = function(grunt) {
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-angular-templates');

	grunt.initConfig({
		concat: {
			options: {
				separator: grunt.util.linefeed + grunt.util.linefeed,
			},
			dist: {
				// first load the app.js from each module
				src: [
					'Scripts/app/app.js',
					'Scripts/app/FilterTable/app.js',
					'Scripts/app/**/*.js'
				],
				dest: '../../SmlAppl.WebApps.NgFramework.js',
			}
		},

		uglify: {
			my_target: {
				files: {
					'../../SmlAppl.WebApps.NgFramework.min.js': '../../SmlAppl.WebApps.NgFramework.js'
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
		}
	});
	grunt.registerTask('default', ['concat', 'uglify', 'ngtemplates', 'watch']);
};