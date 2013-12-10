module.exports = function(grunt) {
    'use strict';

    grunt.config('mkdir', {
        phpmd: {
            options: {
                create: ['<%= directories.reports %>/phpmd']
            },
        }
    });

    grunt.loadNpmTasks('grunt-mkdir');

};
