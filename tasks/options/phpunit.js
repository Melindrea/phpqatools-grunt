module.exports = {
    classes: {
        dir: '<%= directories.php %>/tests'
    },
    options: {
        bin: '<%= directories.composerBin %>/phpunit',
        bootstrap: 'bootstrap/autoload.php',
        staticBackup: false,
        colors: true,
        noGlobalsBackup: false
    }
};
