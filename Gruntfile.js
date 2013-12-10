'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {
    var composer = require('./composer');
    var directoriesConfig = {
        composer: composer.config['vendor-dir'] || 'vendor',
        composerBin: composer.config['bin-dir'] || 'vendor/bin',
        reports: 'logs',
        php: 'app'
    };

    grunt.initConfig({
        pkg: require('./package.json'),
        composer: composer,
        directories: directoriesConfig,
        files: {
            js: [
                'Gruntfile.js',
                'tasks/{,*/}*.js',
                'grunt/{,*/}*.js'
            ],
            json: [
                '{,*/}*.json',
            ],
            php: '<%= directories.php %>/**/*.php'
        }
    });

    // show elapsed time at the end
    require('time-grunt')(grunt);

    // Load per-task config from separate files.
    grunt.loadTasks('grunt');

    // Register alias tasks.
    grunt.registerTask('default', ['test']);

    grunt.registerTask('test', [
        'jsvalidate',
        'jshint',
        'jsonlint',
        'phplint',
        'phpcs',
        'phpunit'
    ]);
};
