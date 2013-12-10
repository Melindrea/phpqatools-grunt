module.exports = function(grunt) {
    'use strict';

    grunt.config('phpcs', {
        application: {
            dir: '<%= directories.php %>'
        },
        options: {
            bin: '<%= directories.composerBin %>/phpcs',
            standard: 'PSR2',
            ignore: 'database',
            extensions: 'php'
        }
    });

    grunt.loadNpmTasks('grunt-phpcs');

};
