module.exports = function(grunt) {
    'use strict';

    grunt.config('jsonlint', {
        files: '<%= files.json %>'
    });

    grunt.loadNpmTasks('grunt-jsonlint');

};
