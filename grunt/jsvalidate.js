module.exports = function(grunt) {
    'use strict';

    grunt.config('jsvalidate', {
        files: '<%= files.js %>'
    });

    grunt.loadNpmTasks('grunt-jsvalidate');

};
