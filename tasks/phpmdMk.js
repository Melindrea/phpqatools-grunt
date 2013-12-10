module.exports = function(grunt) {
    grunt.registerTask('phpmdMk', [
        'mkdir:phpmd',
        'phpmd'
    ]);
};
