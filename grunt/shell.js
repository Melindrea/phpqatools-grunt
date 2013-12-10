module.exports = function(grunt) {
    'use strict';

    grunt.config('shell', {
        phploc: {
            command: [
                'mkdir -p <%= directories.reports %>/phploc',
                'php <%= directories.composerBin %>/phploc --log-xml <%= directories.reports %>/phploc/<%= grunt.template.today("isoDateTime") %>.xml <%= directories.php %>'
            ].join('&&')
        },
        securityChecker: {
            command: 'php <%= directories.composerBin %>/security-checker security:check composer.lock',
            options: {
                stdout: true
            }
        },
        pdepend: {
            command: function () {
                var now = grunt.template.today('isoDateTime'),
                directory = '<%= directories.reports %>/pdepend/' + now,
                mkdir = 'mkdir -p ' + directory,
                summary = directory + '/summary.xml',
                chart = directory + '/chart.svg',
                pyramid = directory + '/pyramid.svg',
                pdepend = 'php <%= directories.composerBin %>/pdepend ';
                pdepend += '--summary-xml=' + summary + ' ';
                pdepend += '--jdepend-chart=' + chart + ' ';
                pdepend += '--overview-pyramid=' + pyramid + ' ';
                pdepend += '<%= directories.php %>';

                return mkdir + ' && ' + pdepend;
            }
        }
    });

    grunt.loadNpmTasks('grunt-shell');

};
