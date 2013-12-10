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

    var pkg = require('./package'),
    composer = require('./composer');
    var directoriesConfig = {
        composer: composer.config['vendor-dir'] ||'vendor',
        composerBin: composer.config['bin-dir'] || 'vendor/bin',
        reports: 'logs',
        php: 'app'
    };

    function loadConfig(path) {
        var glob = require('glob');
        var object = {};
        var key;

        glob.sync('*', {cwd: path}).forEach(function(option) {
            key = option.replace(/\.js$/,'');
            object[key] = require(path + option);
        });

        return object;
    }
    var config = {
        pkg: pkg,
        composer: composer,
        directories: directoriesConfig,
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
                    var now = grunt.template.today('isoDateTime'),
                    directory = '<%= directories.reports %>/pdepend/' + now,
                    mkdir = 'mkdir -p ' + directory,
                    summary = directory + '/summary.xml',
                    chart = directory + '/chart.svg',
                    pyramid = directory + '/pyramid.svg',
                    pdepend = 'php <%= directories.composerBin %>/pdepend ';
                    pdepend += '--summary-xml=' + summary + ' ';
                    pdepend += '--jdepend-chart=' + chart + ' ';
                    pdepend += '--overview-pyramid=' + pyramid + ' ';
                    pdepend += '<%= directories.php %>';

                    return mkdir + ' && ' + pdepend;
                }
            }
        }
    };
    grunt.util._.extend(config, loadConfig('./tasks/options/'));
    grunt.initConfig(config);

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
