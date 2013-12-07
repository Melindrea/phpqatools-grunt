'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {
    // show elapsed time at the end
    require('time-grunt')(grunt);
    // load all grunt tasks
    require('load-grunt-tasks')(grunt);
    grunt.loadTasks('tasks');

    var directoriesConfig = {
        composer: 'vendor',
        composerBin: 'vendor/bin',
        reports: 'logs',
        php: 'app'
    };

    grunt.initConfig({
        directories: directoriesConfig,

        // General tasks
        clean: {
            phpdocumentor: '<%= phpdocumentor.dist.target %>'
        },

        // JS tasks
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                'Gruntfile.js'
            ]
        },
        jsvalidate: {
            files: [
                'Gruntfile.js'
            ]
        },
        jsonlint: {
            files: [
                '*.json'
            ]
        },

        // PHP tasks
        phplint: {
            options: {
                swapPath: '/tmp'
            },
            all: [
                '<%= directories.php %>/**/*.php'
            ]
        },
        phpcs: {
            application: {
                dir: '<%= directories.php %>'
            },
            options: {
                bin: '<%= directories.composerBin %>/phpcs',
                standard: 'PSR2',
                ignore: 'database',
                extensions: 'php'
            }
        },
        phpunit: {
            classes: {
                dir: '<%= directories.php %>/tests'
            },
            options: {
                bin: '<%= directories.composerBin %>/phpunit',
                bootstrap: 'bootstrap/autoload.php',
                staticBackup: false,
                colors: true,
                noGlobalsBackup: false
            }
        },
        phpdocumentor: {
            dist: {
                bin: '<%= directories.composerBin %>/phpdoc.php',
                directory: '<%= directories.php %>',
                target: '<%= directories.reports %>/phpdocs',
                ignore: [
                    '<%= directories.php %>/database/*'
                ]
            }
        }
    });

    grunt.registerTask('default', [
        'test'
    ]);

    grunt.registerTask('test', [
        'jsvalidate',
        'jshint',
        'jsonlint',
        'phplint',
        'phpcs',
        'phpunit'
    ]);

    grunt.registerTask('phpdocs', [
        'clean:phpdocumentor',
        'phpdocumentor'
    ]);
};
