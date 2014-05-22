module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

		watch: {
			options:{
				livereload: true,
			},
			scripts: {
				files: ['app/static/controllers/project.js'],
				tasks: ['uglify'],
				options: {
					spawn: false,
				},
			},
			css: {
				files: ['app/static/css/*.styl'],
				tasks: ['stylus'],
				options: {
					livereload: true,
					spawn: false
				}
			},
			html: {
				files: ['app/*.jade'],
				tasks: ['jade'],
				options: {
					livereload: true,
					spawn: false
				}
			}
		},

		uglify : {
			build: {
				src: ['public/libs/js/*.js'],
				dest: 'public/dist/project.min.js'
			}
		},

		stylus: {
			options: {
				compress: true
			},
			compile: {
				files: {
					'public/dist/project.min.css' : 'app/static/css/*.styl'
				}
			}
		},

		jade: {
			compile: {
				options: {
					data: {
						debug: false
					}
				},
				files: {
					'index.html' : 'app/index.jade',
                    'home.html' : 'app/views/home.jade',
                    'lost.html' : 'app/views/lost.jade',
                    'won.html' : 'app/views/won.jade'
				}
			}
		},

		connect: {
            server: {
                options: {
                    hostname: '*',
                    port: 8000
                }
            }
        }

    });

    // 3. Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-stylus');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-connect');

    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('serve', ['connect', 'uglify', 'stylus', 'jade', 'watch']);

};
