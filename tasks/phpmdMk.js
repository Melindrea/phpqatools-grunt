module.exports = function(grunt) {
    'use strict';
    grunt.registerTask('phpmdMk', [
        'mkdir:phpmd',
        'phpmd'
    ]);
};
