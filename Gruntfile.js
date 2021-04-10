module.exports = function(grunt) {
    grunt.initConfig({
      jshint: {
        files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
        options: {
        }
      }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.registerTask('default', ['jshint']);
    grunt.registerTask('lint', ['jshint']);
};