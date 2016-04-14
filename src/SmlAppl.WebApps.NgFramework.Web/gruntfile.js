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
	grunt.loadNpmTasks('grunt-sync');

	var rootGitFolder = "../../";

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
				dest: rootGitFolder + 'dist/js/SmlAppl.WebApps.NgFramework.js',
			}
		},

		uglify: {
			app: {
				src: rootGitFolder + 'dist/js/SmlAppl.WebApps.NgFramework.js',
				dest: rootGitFolder + 'dist/js/SmlAppl.WebApps.NgFramework.min.js'
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
			app: {
				src: 'Content/css/mainLocal.less',
				dest: rootGitFolder + 'dist/css/main.css'
			},
			login: {
				src: 'Content/css/loginLocal.less',
				dest: rootGitFolder + 'dist/css/login.css'
			}
		},

		cssmin: {
			target: {
				files: [{
					expand: true,
					cwd: rootGitFolder + 'dist/css',
					src: ['*.css', '!*.min.css'],
					dest: rootGitFolder + 'dist/css',
					ext: '.min.css',
					extDot: 'last'
				}]
			}
		},

		// system

		sync: {
			less: {
				files: [{
					//expand: true,
					cwd: 'Content/css',
					//src: ['*.less'],
					src: ['**', '!mainLocal.less', '!loginLocal.less'],
					dest: rootGitFolder + 'less/'
				}],
				verbose: true, // Default: false 
				//pretend: true, // Don't do any disk operations - just write log. Default: false 
				failOnError: true, // Fail the task when copying is not possible. Default: false 
				updateAndDelete: true,
			},

			images: {
				files: [{
					//expand: true,
					cwd: 'Content/images',
					//src: ['*.less'],
					src: ['**'],
					dest: rootGitFolder + 'dist/images/'
				}],
				verbose: true, // Default: false 
				//pretend: true, // Don't do any disk operations - just write log. Default: false 
				failOnError: true, // Fail the task when copying is not possible. Default: false 
				updateAndDelete: true,
			},
		},

		copy: {
			bower: {
				src: 'bower.json',
				dest: rootGitFolder
			},
			//less: {
			//	files: [{
			//		expand: true,
			//		cwd: 'Content/css',
			//		//src: ['*.less'],
			//		src: ['**', '!mainLocal.less', '!loginLocal.less'],
			//		dest: rootGitFolder + 'less/'
			//	}]
			//},
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

	grunt.registerTask('publish', ['concat', 'uglify', 'ngtemplates', 'less', 'cssmin', 'copy', 'sync']);

	//grunt.registerTask('default', ['concat', 'uglify', 'ngtemplates', 'less', 'cssmin', 'watch']);
};