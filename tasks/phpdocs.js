module.exports = function(grunt) {
    'use strict';
    grunt.registerTask('phpdocs', [
        'clean:phpdocumentor',
        'phpdocumentor'
    ]);
};
