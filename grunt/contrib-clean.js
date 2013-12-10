module.exports = function(grunt) {
    'use strict';

    grunt.config('clean', {
        phpdocumentor: '<%= phpdocumentor.dist.target %>'
    });

    grunt.loadNpmTasks('grunt-contrib-clean');

};
