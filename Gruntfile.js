// Generated on 2013-04-13 using generator-webapp 0.1.7
'use strict';
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;
var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {
    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // configurable paths
    var yeomanConfig = {
        app: 'app'
    };

    grunt.initConfig({
        yeoman: yeomanConfig,
        watch: {
            livereload: {
                files: [
                    '<%= yeoman.app %>/*.html',
                    '{.tmp,<%= yeoman.app %>}/spec/{,*/}*.js'
                ],
                tasks: ['livereload']
            }
        },
        connect: {
            options: {
                port: 9000,
                // change this to '0.0.0.0' to access the server from outside
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    middleware: function (connect) {
                        return [
                            lrSnippet,
                            mountFolder(connect, 'app')
                        ];
                    }
                }
            }
        },
        open: {
            server: {
                path: 'http://localhost:<%= connect.options.port %>'
            }
        },
        clean: ['dist'],
        copy: {
            build: {
                files: [
                    {expand: true, cwd: 'app/', src: ['**'], dest: 'dist/'}
                ]
            }
        },
        shell: {
            buildToGhPages: {
                options: {
                    stdout: true,
                    stderr: true
                },

                command: 'git checkout gh-pages ' +

// make sure you pull the latest from the repo before trying to commit new files.
                    '&& git pull --rebase ' +

// get a list of all files in stage and delete everything except for targets, node_modules, cache, temp, and logs
// rm does not delete root level hidden files
                    '&& ls | grep -v ^dist$ | grep -v ^node_modules$ | xargs rm -r ' +

// copy from the stage folder to the current (root) folder
                    '&& cp -r dist/* . ' +
                    '&& rm -r dist ' +
// Increment the build number
                    '&& echo $(($(<.build) + 1))>.build ' +

// add any files that may have been created
                    '&& git add -A ' +

// commit all files using the version number as the commit message
// <%= %> is grunt templating
                    '&& git commit -am "Build: "$(<.build)' +

// push changes to gitlab
                    '&& git push origin gh-pages ' +

// now that everything is done, we have to switch back to the branch we started from
// the - is a shortcutl for @{-1} which means we go back to the previous branch
                    '&& git checkout - '
            }
        }
    });

    grunt.renameTask('regarde', 'watch');

    grunt.registerTask('server', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['open', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'livereload-start',
            'connect:livereload',
            'open',
            'watch'
        ]);
    });


    grunt.registerTask('default', [
        'server'
    ]);

    grunt.registerTask("build", [
        'clean',
        'copy',
        'shell'
    ]);
};
