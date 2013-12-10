module.exports = function(grunt) {
    'use strict';

    grunt.config('jshint', {
        options: {
            jshintrc: '.jshintrc',
            reporter: require('jshint-stylish')
        },
        all: '<%= files.js %>'
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');

};
