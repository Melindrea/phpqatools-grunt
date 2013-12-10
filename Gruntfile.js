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
        pkg: grunt.file.readJSON('package.json'),
        composer: grunt.file.readJSON('composer.json'),

        // Utility tasks
        clean: {
            phpdocumentor: '<%= phpdocumentor.dist.target %>'
        },
        shell: {
            phploc: {
                command: [
                    'mkdir -p <%= directories.reports %>/phploc',
                    'php <%= directories.composerBin %>/phploc --log-xml <%= directories.reports %>/phploc/<%= grunt.template.today("isoDateTime") %>.xml <%= directories.php %>'
                ].join('&&')
            },
            securityChecker: {
                command: 'php <%= directories.composerBin %>/security-checker security:check composer.lock',
                options: {
                    stdout: true
                }
            },
            pdepend: {
                command: function () {
                    var now = grunt.template.today("isoDateTime"),
                    directory = '<%= directories.reports %>/pdepend/' + now,
                    mkdir = 'mkdir -p ' + directory,
                    summary = directory + '/summary.xml',
                    chart = directory + '/chart.svg',
                    pyramid = directory + '/pyramid.svg',
                    pdepend;

                    pdepend = 'php <%= directories.composerBin %>/pdepend '
                    pdepend += '--summary-xml=' + summary + ' ';
                    pdepend += '--jdepend-chart=' + chart + ' ';
                    pdepend += '--overview-pyramid=' + pyramid + ' ';
                    pdepend += '<%= directories.php %>';

                    return mkdir + ' && ' + pdepend;
                }
            }
        },
        mkdir: {
            phpmd: {
                options: {
                    create: ['<%= directories.reports %>/phpmd']
                },
            }
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
        },
        phpmd: {
            application: {
                dir: '<%= directories.php %>'
            },
            options: {
                rulesets: 'codesize,unusedcode,naming',
                bin: '<%= directories.composerBin %>/phpmd',
                reportFile: '<%= directories.reports %>/phpmd/<%= grunt.template.today("isoDateTime") %>.xml'
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
};
