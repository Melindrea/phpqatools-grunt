module.exports = {
    application: {
        dir: '<%= directories.php %>'
    },
    options: {
        bin: '<%= directories.composerBin %>/phpcs',
        standard: 'PSR2',
        ignore: 'database',
        extensions: 'php'
    }
};
