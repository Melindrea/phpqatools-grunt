module.exports = {
    dist: {
        bin: '<%= directories.composerBin %>/phpdoc.php',
        directory: '<%= directories.php %>',
        target: '<%= directories.reports %>/phpdocs',
        ignore: [
            '<%= directories.php %>/database/*'
        ]
    }
};
