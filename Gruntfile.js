module.exports = function(grunt) {
    grunt.initConfig({
      jshint: {
        files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
        options: {
          esversion: 6
        }
      },
      rollup: {
        options: {
          format: 'umd',
          name: 'animS'
        },
        files: {
          dest: 'build/p5.anims.js',
          src: 'src/main.js'
        },
      },
      uglify: {
        mytarget: {
          files: {
            'build/p5.anims.min.js': ['build/p5.anims.js']
          }
        }
      }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-rollup');

    grunt.registerTask('default', ['jshint', 'rollup', 'uglify']);
    grunt.registerTask('lint', ['jshint']);
    grunt.registerTask('build', ['jshint', 'rollup', 'uglify']);
};