module.exports = function(grunt) {
    grunt.registerTask('phpdocs', [
        'clean:phpdocumentor',
        'phpdocumentor'
    ]);
};
