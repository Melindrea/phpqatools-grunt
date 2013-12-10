module.exports = function(grunt) {
    'use strict';

    grunt.config('phplint', {
        options: {
            swapPath: '/tmp'
        },
        all: [
            '<%= files.php %>'
        ]
    });

    grunt.loadNpmTasks('grunt-phplint');

};
