module.exports = {
    application: {
        dir: '<%= directories.php %>'
    },
    options: {
        rulesets: 'codesize,unusedcode,naming',
        bin: '<%= directories.composerBin %>/phpmd',
        reportFile: '<%= directories.reports %>/phpmd/<%= grunt.template.today("isoDateTime") %>.xml'
    }
};
