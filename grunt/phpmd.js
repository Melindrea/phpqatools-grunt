module.exports = function(grunt) {
    'use strict';

    grunt.config('phpmd', {
        application: {
            dir: '<%= directories.php %>'
        },
        options: {
            rulesets: 'codesize,unusedcode,naming',
            bin: '<%= directories.composerBin %>/phpmd',
            reportFile: '<%= directories.reports %>/phpmd/<%= grunt.template.today("isoDateTime") %>.xml'
        }
    });

    grunt.loadNpmTasks('grunt-phpmd');

    grunt.registerTask('phpmdMk', [
        'mkdir:phpmd',
        'phpmd'
    ]);

};
